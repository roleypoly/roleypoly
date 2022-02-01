import {
  getGuild,
  getGuildData,
  getGuildMember,
  updateGuildMember,
} from '@roleypoly/api/src/guilds/getters';
import { Context, RoleypolyHandler } from '@roleypoly/api/src/utils/context';
import { APIMember, AuthType, discordFetch } from '@roleypoly/api/src/utils/discord';
import {
  engineeringProblem,
  invalid,
  json,
  notFound,
  serverError,
} from '@roleypoly/api/src/utils/response';
import {
  difference,
  isIdenticalArray,
  keyBy,
  union,
} from '@roleypoly/misc-utils/collection-tools';
import {
  GuildData,
  Member,
  Role,
  RoleSafety,
  RoleTransaction,
  RoleUpdate,
  TransactionType,
} from '@roleypoly/types';

export const guildsRolesPut: RoleypolyHandler = async (
  request: Request,
  context: Context
) => {
  if (!request.body) {
    return invalid();
  }

  const updateRequest: RoleUpdate = await request.json();

  if (updateRequest.transactions.length === 0) {
    return invalid();
  }

  const guildID = context.params.guildId;
  if (!guildID) {
    return engineeringProblem('params not set up correctly');
  }

  const userID = context.session!.user.id;

  const [member, guildData, guild] = await Promise.all([
    getGuildMember(context.config, guildID, userID),
    getGuildData(context.config, guildID),
    getGuild(context.config, guildID),
  ]);

  if (!guild || !member) {
    return notFound();
  }

  const newRoles = calculateNewRoles({
    currentRoles: member.roles,
    guildRoles: guild.roles,
    guildData,
    updateRequest,
  });

  if (
    isIdenticalArray(member.roles, newRoles) ||
    isIdenticalArray(updateRequest.knownState, newRoles)
  ) {
    return invalid();
  }

  const patchMemberRoles = await discordFetch<APIMember>(
    `/guilds/${guildID}/members/${userID}`,
    context.config.botToken,
    AuthType.Bot,
    {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'x-audit-log-reason': `Picked their roles via ${context.config.uiPublicURI}`,
      },
      body: JSON.stringify({
        roles: newRoles,
      }),
    }
  );

  if (!patchMemberRoles) {
    return serverError(new Error('discord rejected the request'));
  }

  context.fetchContext.waitUntil(
    updateGuildMember(context.config, guildID, patchMemberRoles)
  );

  const updatedMember: Member = {
    roles: patchMemberRoles.roles,
  };

  return json(updatedMember);
};

export const calculateNewRoles = ({
  currentRoles,
  guildData,
  guildRoles,
  updateRequest,
}: {
  currentRoles: string[];
  guildRoles: Role[];
  guildData: GuildData;
  updateRequest: RoleUpdate;
}): string[] => {
  const roleMap = keyBy(guildRoles, 'id');

  // These roles were ones changed between knownState (role picker page load/cache) and current (fresh from discord).
  // We could cause issues, so we'll re-add them later.
  // const diffRoles = difference(updateRequest.knownState, currentRoles);

  // Only these are safe
  const allSafeRoles = guildData.categories.reduce<string[]>(
    (categorizedRoles, category) =>
      !category.hidden
        ? [
            ...categorizedRoles,
            ...category.roles.filter(
              (roleID) => roleMap[roleID]?.safety === RoleSafety.Safe
            ),
          ]
        : categorizedRoles,
    []
  );

  const safeTransactions = updateRequest.transactions.filter((tx: RoleTransaction) =>
    allSafeRoles.includes(tx.id)
  );

  const changesByAction = safeTransactions.reduce<
    Record<TransactionType, RoleTransaction[]>
  >((group, value, _1, _2, key = value.action) => (group[key].push(value), group), {
    [TransactionType.Add]: [],
    [TransactionType.Remove]: [],
  });

  const rolesToAdd = (changesByAction[TransactionType.Add] ?? []).map(
    (tx: RoleTransaction) => tx.id
  );
  const rolesToRemove = (changesByAction[TransactionType.Remove] ?? []).map(
    (tx: RoleTransaction) => tx.id
  );

  const final = union(difference(currentRoles, rolesToRemove), rolesToAdd);

  return final;
};

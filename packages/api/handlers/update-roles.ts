import {
  GuildData,
  Member,
  Role,
  RoleSafety,
  RoleTransaction,
  RoleUpdate,
  SessionData,
  TransactionType,
} from '@roleypoly/types';
import { AuthType, discordFetch, respond } from '@roleypoly/worker-utils';
import { difference, groupBy, keyBy, union } from 'lodash';
import { withSession } from '../utils/api-tools';
import { botToken, uiPublicURI } from '../utils/config';
import {
  getGuild,
  getGuildData,
  getGuildMember,
  updateGuildMember,
} from '../utils/guild';

const notFound = () => respond({ error: 'guild not found' }, { status: 404 });

export const UpdateRoles = withSession(
  ({ guilds, user: { id: userID, username, discriminator } }: SessionData) =>
    async (request: Request) => {
      const updateRequest = (await request.json()) as RoleUpdate;
      const url = new URL(request.url);
      const [, , guildID] = url.pathname.split('/');

      if (!guildID) {
        return respond({ error: 'guild ID missing from URL' }, { status: 400 });
      }

      if (updateRequest.transactions.length === 0) {
        return respond({ error: 'must have as least one transaction' }, { status: 400 });
      }

      const guildCheck = guilds.find((guild) => guild.id === guildID);
      if (!guildCheck) {
        return notFound();
      }

      const guild = await getGuild(guildID);
      if (!guild) {
        return notFound();
      }

      const guildMember = await getGuildMember(
        { serverID: guildID, userID },
        { skipCachePull: true }
      );
      if (!guildMember) {
        return notFound();
      }

      const guildData = await getGuildData(guildID);

      const newRoles = calculateNewRoles({
        currentRoles: guildMember.roles,
        guildRoles: guild.roles,
        guildData,
        updateRequest,
      });

      const patchMemberRoles = await discordFetch<Member>(
        `/guilds/${guildID}/members/${userID}`,
        botToken,
        AuthType.Bot,
        {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
            'x-audit-log-reason': `Picked their roles via ${uiPublicURI}`,
          },
          body: JSON.stringify({
            roles: newRoles,
          }),
        }
      );

      if (!patchMemberRoles) {
        return respond({ error: 'discord rejected the request' }, { status: 500 });
      }

      const updatedMember: Member = {
        roles: patchMemberRoles.roles,
      };

      // Delete the cache by re-pulling... might be dangerous :)
      await updateGuildMember({ serverID: guildID, userID });

      return respond(updatedMember);
    }
);

const calculateNewRoles = ({
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

  const changesByAction = groupBy(safeTransactions, 'action');

  const rolesToAdd = (changesByAction[TransactionType.Add] ?? []).map((tx) => tx.id);
  const rolesToRemove = (changesByAction[TransactionType.Remove] ?? []).map(
    (tx) => tx.id
  );

  const final = union(difference(currentRoles, rolesToRemove), rolesToAdd);

  return final;
};

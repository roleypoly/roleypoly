import { Config } from '@roleypoly/api/src/utils/config';
import {
  APIGuild,
  APIMember,
  APIRole,
  AuthType,
  discordFetch,
  getHighestRole,
} from '@roleypoly/api/src/utils/discord';
import { evaluatePermission, permissions } from '@roleypoly/misc-utils/hasPermission';
import {
  Features,
  Guild,
  GuildData,
  Member,
  OwnRoleInfo,
  Role,
  RoleSafety,
} from '@roleypoly/types';

export const getGuild = async (
  config: Config,
  id: string,
  forceMiss?: boolean
): Promise<(Guild & OwnRoleInfo) | null> =>
  config.kv.guilds.cacheThrough(
    `guilds/${id}`,
    async () => {
      const guildRaw = await discordFetch<APIGuild>(
        `/guilds/${id}`,
        config.botToken,
        AuthType.Bot
      );

      if (!guildRaw) {
        return null;
      }

      const botMemberRoles =
        (await getGuildMember(config, id, config.botClientID))?.roles || [];

      const highestRolePosition =
        getHighestRole(
          botMemberRoles
            .map((r) => guildRaw.roles.find((r2) => r2.id === r))
            .filter((x) => x !== undefined) as APIRole[]
        )?.position || -1;

      const roles = guildRaw.roles.map<Role>((role) => ({
        id: role.id,
        name: role.name,
        color: role.color,
        managed: role.managed,
        position: role.position,
        permissions: role.permissions,
        safety: RoleSafety.Safe, // TODO: calculate this
      }));

      const guild: Guild & OwnRoleInfo = {
        id,
        name: guildRaw.name,
        icon: guildRaw.icon,
        roles,
        highestRolePosition,
      };

      return guild;
    },
    config.retention.guild,
    forceMiss
  );

export const getGuildData = async (config: Config, id: string): Promise<GuildData> => {
  const guildData = await config.kv.guildData.get<GuildData>(id);
  const empty = {
    id,
    message: '',
    categories: [],
    features: Features.None,
    auditLogWebhook: null,
    accessControl: {
      allowList: [],
      blockList: [],
      blockPending: true,
    },
  };

  if (!guildData) {
    return empty;
  }

  return {
    ...empty,
    ...guildData,
  };
};

export const getGuildMember = async (
  config: Config,
  serverID: string,
  userID: string,
  forceMiss?: boolean,
  overrideRetention?: number // allows for own-member to be cached as long as it's used.
): Promise<Member | null> =>
  config.kv.guilds.cacheThrough(
    `guilds/${serverID}/members/${userID}`,
    async () => {
      const discordMember = await discordFetch<APIMember>(
        `/guilds/${serverID}/members/${userID}`,
        config.botToken,
        AuthType.Bot
      );

      if (!discordMember) {
        return null;
      }

      return {
        guildid: serverID,
        roles: discordMember.roles,
        pending: discordMember.pending,
        nick: discordMember.nick,
      };
    },
    overrideRetention || config.retention.member,
    forceMiss
  );

const calculateRoleSafety = (role: Role | APIRole, highestBotRolePosition: number) => {
  let safety = RoleSafety.Safe;

  if (role.managed) {
    safety |= RoleSafety.ManagedRole;
  }

  if (role.position > highestBotRolePosition) {
    safety |= RoleSafety.HigherThanBot;
  }

  const permBigInt = BigInt(role.permissions);
  if (
    evaluatePermission(permBigInt, permissions.ADMINISTRATOR) ||
    evaluatePermission(permBigInt, permissions.MANAGE_ROLES)
  ) {
    safety |= RoleSafety.DangerousPermissions;
  }

  return safety;
};

import { Handler } from '@roleypoly/api/router';
import {
  lowPermissions,
  missingParameters,
  notFound,
  rateLimited,
} from '@roleypoly/api/utils/responses';
import { evaluatePermission, permissions } from '@roleypoly/misc-utils/hasPermission';
import {
  Features,
  Guild,
  GuildData as GuildDataT,
  GuildSlug,
  Member,
  OwnRoleInfo,
  Role,
  RoleSafety,
  SessionData,
  UserGuildPermissions,
} from '@roleypoly/types';
import {
  AuthType,
  cacheLayer,
  CacheLayerOptions,
  discordFetch,
  isRoot,
  withSession,
} from './api-tools';
import { botClientID, botToken } from './config';
import { GuildData, Guilds } from './kv';
import { useRateLimiter } from './rate-limiting';

type APIGuild = {
  // Only relevant stuff
  id: string;
  name: string;
  icon: string;
  roles: APIRole[];
};

type APIRole = {
  id: string;
  name: string;
  color: number;
  position: number;
  permissions: string;
  managed: boolean;
};

export const getGuild = cacheLayer(
  Guilds,
  (id: string) => `guilds/${id}`,
  async (id: string) => {
    const guildRaw = await discordFetch<APIGuild>(
      `/guilds/${id}`,
      botToken,
      AuthType.Bot
    );

    if (!guildRaw) {
      return null;
    }

    const botMemberRoles =
      (await getGuildMemberRoles({
        serverID: id,
        userID: botClientID,
      })) || [];

    const highestRolePosition = botMemberRoles.reduce<number>((highest, roleID) => {
      const role = guildRaw.roles.find((guildRole) => guildRole.id === roleID);
      if (!role) {
        return highest;
      }

      // If highest is a bigger number, it stays the highest.
      if (highest > role.position) {
        return highest;
      }

      return role.position;
    }, 0);

    const guildData = await getGuildData(id);

    const roles = guildRaw.roles.map<Role>((role) => ({
      id: role.id,
      name: role.name,
      color: role.color,
      managed: role.managed,
      position: role.position,
      permissions: role.permissions,
      safety: calculateRoleSafety(role, highestRolePosition, guildData),
    }));

    // Filters the raw guild data into data we actually want
    const guild: Guild & OwnRoleInfo = {
      id: guildRaw.id,
      name: guildRaw.name,
      icon: guildRaw.icon,
      roles,
      highestRolePosition,
    };

    return guild;
  },
  60 * 60 * 2 // 2 hour TTL
);

type GuildMemberIdentity = {
  serverID: string;
  userID: string;
};

type APIMember = {
  // Only relevant stuff, again.
  roles: string[];
  pending: boolean;
};

export const getGuildMemberRoles = async (
  { serverID, userID }: GuildMemberIdentity,
  opts?: CacheLayerOptions
) => (await getGuildMember({ serverID, userID }, opts))?.roles;

const guildMemberIdentity = ({ serverID, userID }: GuildMemberIdentity) =>
  `guilds/${serverID}/members/${userID}`;

export const getGuildMember = cacheLayer<GuildMemberIdentity, Member>(
  Guilds,
  guildMemberIdentity,
  async ({ serverID, userID }) => {
    const discordMember = await discordFetch<APIMember>(
      `/guilds/${serverID}/members/${userID}`,
      botToken,
      AuthType.Bot
    );

    if (!discordMember) {
      return null;
    }

    return {
      roles: discordMember.roles,
      pending: discordMember.pending,
    };
  },
  60 * 5 // 5 minute TTL
);

export const updateGuildMember = async (identity: GuildMemberIdentity) => {
  await getGuildMember(identity, { skipCachePull: true });
};

export const getGuildData = async (id: string): Promise<GuildDataT> => {
  const guildData = await GuildData.get<GuildDataT>(id);
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
    return {
      ...empty,
    };
  }

  return {
    ...empty,
    ...guildData,
  };
};

const calculateRoleSafety = (
  role: Role | APIRole,
  highestBotRolePosition: number,
  guildData: GuildDataT
) => {
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

  if (
    guildData.accessControl.allowList.includes(role.id) ||
    guildData.accessControl.blockList.includes(role.id)
  ) {
    safety |= RoleSafety.AccessControl;
  }

  return safety;
};

export enum GuildRateLimiterKey {
  legacyImport = 'legacyImport',
  cacheClear = 'cacheClear',
}

export const useGuildRateLimiter = (
  guildID: string,
  key: GuildRateLimiterKey,
  timeoutSeconds: number
) => useRateLimiter(Guilds, `guilds/${guildID}/rate-limit/${key}`, timeoutSeconds);

type AsEditorOptions = {
  rateLimitKey?: GuildRateLimiterKey;
  rateLimitTimeoutSeconds?: number;
};

type UserGuildContext = {
  guildID: string;
  guild: GuildSlug;
  url: URL;
};

export const asEditor = (
  options: AsEditorOptions = {},
  wrappedHandler: (session: SessionData, userGuildContext: UserGuildContext) => Handler
): Handler =>
  withSession((session: SessionData) => async (request: Request): Promise<Response> => {
    const { rateLimitKey, rateLimitTimeoutSeconds } = options;
    const url = new URL(request.url);
    const [, , guildID] = url.pathname.split('/');
    if (!guildID) {
      return missingParameters();
    }

    let rateLimit: null | ReturnType<typeof useGuildRateLimiter> = null;
    if (rateLimitKey) {
      rateLimit = await useGuildRateLimiter(
        guildID,
        rateLimitKey,
        rateLimitTimeoutSeconds || 60
      );
    }

    const userIsRoot = isRoot(session.user.id);

    let guild = session.guilds.find((guild) => guild.id === guildID);
    if (!guild) {
      if (!userIsRoot) {
        return notFound();
      }

      const fullGuild = await getGuild(guildID);
      if (!fullGuild) {
        return notFound();
      }

      guild = {
        id: fullGuild.id,
        name: fullGuild.name,
        icon: fullGuild.icon,
        permissionLevel: UserGuildPermissions.Admin, // root will always be considered admin
      };
    }

    const userIsManager = guild.permissionLevel === UserGuildPermissions.Manager;
    const userIsAdmin = guild.permissionLevel === UserGuildPermissions.Admin;

    if (!userIsAdmin && !userIsManager) {
      return lowPermissions();
    }

    if (!userIsRoot && rateLimit && (await rateLimit())) {
      return rateLimited();
    }

    return await wrappedHandler(session, {
      guildID,
      guild,
      url,
    })(request);
  });

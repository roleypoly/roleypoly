import {
  evaluatePermission,
  permissions as Permissions,
} from '@roleypoly/misc-utils/hasPermission';
import {
  AuthTokenResponse,
  DiscordUser,
  GuildSlug,
  Role,
  UserGuildPermissions,
} from '@roleypoly/types';

export const userAgent =
  'DiscordBot (https://github.com/roleypoly/roleypoly, git-main) (+https://roleypoly.com)';

export const discordAPIBase = 'https://discord.com/api/v9';

export enum AuthType {
  Bearer = 'Bearer',
  Bot = 'Bot',
  None = 'None',
}

export const discordFetch = async <T>(
  url: string,
  auth: string,
  authType: AuthType = AuthType.Bearer,
  init?: RequestInit
): Promise<T | null> => {
  const response = await fetch(discordAPIBase + url, {
    ...(init || {}),
    headers: {
      ...(init?.headers || {}),
      ...(authType !== AuthType.None
        ? {
            authorization: `${AuthType[authType]} ${auth}`,
          }
        : {}),
      'user-agent': userAgent,
    },
  });

  if (response.status >= 400) {
    console.error('discordFetch failed', {
      url,
      authType,
      payload: await response.text(),
    });
  }

  if (response.ok) {
    return (await response.json()) as T;
  } else {
    return null;
  }
};

export const getTokenUser = async (
  accessToken: AuthTokenResponse['access_token']
): Promise<DiscordUser | null> => {
  const user = await discordFetch<DiscordUser>(
    '/users/@me',
    accessToken,
    AuthType.Bearer
  );

  if (!user) {
    return null;
  }

  const { id, username, discriminator, bot, avatar } = user;

  return { id, username, discriminator, bot, avatar };
};

type UserGuildsPayload = {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
  features: string[];
}[];

export const getTokenGuilds = async (accessToken: string) => {
  const guilds = await discordFetch<UserGuildsPayload>(
    '/users/@me/guilds',
    accessToken,
    AuthType.Bearer
  );

  if (!guilds) {
    return [];
  }

  const guildSlugs = guilds.map<GuildSlug>((guild) => ({
    id: guild.id,
    name: guild.name,
    icon: guild.icon,
    permissionLevel: parsePermissions(BigInt(guild.permissions), guild.owner),
  }));

  return guildSlugs;
};

export type APIGuild = {
  // Only relevant stuff
  id: string;
  name: string;
  icon: string;
  roles: APIRole[];
};

export type APIRole = {
  id: string;
  name: string;
  color: number;
  position: number;
  permissions: string;
  managed: boolean;
};

export type APIMember = {
  // Only relevant stuff, again.
  roles: string[];
  pending: boolean;
  nick: string;
};

export const parsePermissions = (
  permissions: bigint,
  owner: boolean = false
): UserGuildPermissions => {
  if (owner || evaluatePermission(permissions, Permissions.ADMINISTRATOR)) {
    return UserGuildPermissions.Admin;
  }

  if (evaluatePermission(permissions, Permissions.MANAGE_ROLES)) {
    return UserGuildPermissions.Manager;
  }

  return UserGuildPermissions.User;
};

export const getHighestRole = (roles: (Role | APIRole)[]): Role | APIRole => {
  return roles.reduce(
    (highestRole, role) => (highestRole.position > role.position ? highestRole : role),
    roles[0]
  );
};

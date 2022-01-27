import { Config } from '@roleypoly/api/src/config';
import {
  evaluatePermission,
  permissions as Permissions,
} from '@roleypoly/misc-utils/hasPermission';
import {
  AuthTokenResponse,
  DiscordUser,
  GuildSlug,
  UserGuildPermissions,
} from '@roleypoly/types';

export const userAgent =
  'DiscordBot (https://github.com/roleypoly/roleypoly, git-main) (+https://roleypoly.com)';

export const discordAPIBase = 'https://discordapp.com/api/v9';

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

export const getTokenGuilds = async (accessToken: string, config: Config) => {
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
    permissionLevel: parsePermissions(
      BigInt(guild.permissions),
      guild.owner,
      config.roleypolyServerID
    ),
  }));

  return guildSlugs;
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

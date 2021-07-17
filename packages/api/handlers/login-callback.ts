import {
  AuthTokenResponse,
  DiscordUser,
  GuildSlug,
  SessionData,
  StateSession,
} from '@roleypoly/types';
import KSUID from 'ksuid';
import {
  AuthType,
  discordFetch,
  formData,
  getStateSession,
  isAllowedCallbackHost,
  parsePermissions,
  resolveFailures,
  userAgent,
} from '../utils/api-tools';
import { Bounce } from '../utils/bounce';
import {
  apiPublicURI,
  botClientID,
  botClientSecret,
  discordAPIBase,
  uiPublicURI,
} from '../utils/config';
import { Sessions } from '../utils/kv';

const AuthErrorResponse = (extra?: string) =>
  Bounce(
    uiPublicURI +
      `/machinery/error?error_code=authFailure${extra ? `&extra=${extra}` : ''}`
  );

export const LoginCallback = resolveFailures(
  AuthErrorResponse,
  async (request: Request): Promise<Response> => {
    let bounceBaseUrl = uiPublicURI;

    const query = new URL(request.url).searchParams;
    const stateValue = query.get('state');

    if (stateValue === null) {
      return AuthErrorResponse('state missing');
    }

    try {
      const state = KSUID.parse(stateValue);
      const stateExpiry = state.date.getTime() + 1000 * 60 * 5;
      const currentTime = Date.now();

      if (currentTime > stateExpiry) {
        return AuthErrorResponse('state expired');
      }

      const stateSession = await getStateSession<StateSession>(state.string);
      if (
        stateSession?.callbackHost &&
        isAllowedCallbackHost(stateSession.callbackHost)
      ) {
        bounceBaseUrl = stateSession.callbackHost;
      }
    } catch (e) {
      return AuthErrorResponse('state invalid');
    }

    const code = query.get('code');
    if (!code) {
      return AuthErrorResponse('code missing');
    }

    const tokenRequest = {
      client_id: botClientID,
      client_secret: botClientSecret,
      grant_type: 'authorization_code',
      redirect_uri: apiPublicURI + '/login-callback',
      scope: 'identify guilds',
      code,
    };

    const tokenFetch = await fetch(discordAPIBase + '/oauth2/token', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'user-agent': userAgent,
      },
      body: formData(tokenRequest),
    });

    const tokens = (await tokenFetch.json()) as AuthTokenResponse;

    if (!tokens.access_token) {
      return AuthErrorResponse('token response invalid');
    }

    const [sessionID, user, guilds] = await Promise.all([
      KSUID.random(),
      getUser(tokens.access_token),
      getGuilds(tokens.access_token),
    ]);

    if (!user) {
      return AuthErrorResponse('failed to fetch user');
    }

    const sessionData: SessionData = {
      tokens,
      sessionID: sessionID.string,
      user,
      guilds,
    };

    await Sessions.put(sessionID.string, sessionData, 60 * 60 * 6);

    return Bounce(bounceBaseUrl + 'machinery/new-session/' + sessionID.string);
  }
);

const getUser = async (accessToken: string): Promise<DiscordUser | null> => {
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

const getGuilds = async (accessToken: string) => {
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

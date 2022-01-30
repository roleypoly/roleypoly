import { Config, Environment, parseEnvironment } from '@roleypoly/api/src/utils/config';
import { Context } from '@roleypoly/api/src/utils/context';
import { getID } from '@roleypoly/api/src/utils/id';
import { SessionData, UserGuildPermissions } from '@roleypoly/types';
import index from '../index';

export const makeRequest = (
  method: string,
  path: string,
  init?: RequestInit,
  env?: Partial<Environment>
): Promise<Response> => {
  const request = new Request(`https://localhost:22000${path}`, {
    method,
    ...init,
  });

  return index.fetch(
    request,
    {
      ...getMiniflareBindings(),
      ...env,
    },
    {
      waitUntil: async (promise: Promise<{}>) => await promise,
    }
  );
};

export const getBindings = (): Environment => getMiniflareBindings();

export const makeSession = async (
  config: Config,
  data?: Partial<SessionData>
): Promise<SessionData> => {
  const sessionID = getID();

  const session: SessionData = {
    sessionID,
    tokens: {
      access_token: 'test-access-token',
      refresh_token: 'test-refresh-token',
      expires_in: 3600,
      scope: 'identify guilds',
      token_type: 'Bearer',
    },
    user: {
      id: 'test-user-id',
      username: 'test-username',
      discriminator: 'test-discriminator',
      avatar: 'test-avatar',
      bot: false,
    },
    guilds: [
      {
        id: 'test-guild-id',
        name: 'test-guild-name',
        icon: 'test-guild-icon',
        permissionLevel: UserGuildPermissions.User,
      },
      {
        id: 'test-guild-id-editor',
        name: 'test-guild-name',
        icon: 'test-guild-icon',
        permissionLevel: UserGuildPermissions.Manager,
      },
      {
        id: 'test-guild-id-admin',
        name: 'test-guild-name',
        icon: 'test-guild-icon',
        permissionLevel: UserGuildPermissions.Manager | UserGuildPermissions.Admin,
      },
    ],
    ...data,
  };

  await config.kv.sessions.put(sessionID, session, config.retention.session);

  return session;
};

export const configContext = (): [Config, Context] => {
  const config = parseEnvironment({
    ...getBindings(),
    BOT_CLIENT_SECRET: 'test-client-secret',
    BOT_CLIENT_ID: 'test-client-id',
    BOT_TOKEN: 'test-bot-token',
    INTERACTIONS_SHARED_KEY: '', // IMPORTANT: setting this properly can have unexpected results.
  });
  const context: Context = {
    config,
    fetchContext: {
      waitUntil: () => {},
    },
    authMode: {
      type: 'anonymous',
    },
    params: {},
  };

  return [config, context];
};

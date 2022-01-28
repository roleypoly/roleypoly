import { Config, Environment } from '@roleypoly/api/src/utils/config';
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
    ],
    ...data,
  };

  await config.kv.sessions.put(sessionID, session, config.retention.session);

  return session;
};

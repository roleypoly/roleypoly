jest.mock('../utils/discord');

import { AuthTokenResponse } from '@roleypoly/types';
import { parseEnvironment } from '../utils/config';
import { getTokenGuilds, getTokenUser } from '../utils/discord';
import { getBindings } from '../utils/testHelpers';
import { createSession } from './create';

const mockGetTokenGuilds = getTokenGuilds as jest.Mock;
const mockGetTokenUser = getTokenUser as jest.Mock;

it('creates a session from tokens', async () => {
  const config = parseEnvironment(getBindings());

  const tokens: AuthTokenResponse = {
    access_token: 'test-access-token',
    refresh_token: 'test-refresh-token',
    expires_in: 3600,
    scope: 'identify guilds',
    token_type: 'Bearer',
  };

  mockGetTokenUser.mockReturnValueOnce({
    id: 'test-user-id',
    username: 'test-username',
    discriminator: 'test-discriminator',
    avatar: 'test-avatar',
    bot: false,
  });

  mockGetTokenGuilds.mockReturnValueOnce([]);

  const session = await createSession(config, tokens);

  expect(session).toEqual({
    sessionID: expect.any(String),
    user: {
      id: 'test-user-id',
      discriminator: 'test-discriminator',
      avatar: 'test-avatar',
      bot: false,
      username: 'test-username',
    },
    guilds: [],
    tokens,
  });

  expect(mockGetTokenUser).toBeCalledWith(tokens.access_token);
  expect(mockGetTokenGuilds).toBeCalledWith(tokens.access_token);

  const savedSession = await config.kv.sessions.get(session?.sessionID || '');
  expect(savedSession).toEqual(session);
});

jest.mock('../../utils/discord');
jest.mock('../../sessions/create');

import { createSession } from '../../sessions/create';
import { setupStateSession } from '../../sessions/state';
import { parseEnvironment } from '../../utils/config';
import { discordFetch } from '../../utils/discord';
import { getBindings, makeRequest } from '../../utils/testHelpers';

const mockDiscordFetch = discordFetch as jest.Mock;
const mockCreateSession = createSession as jest.Mock;

describe('GET /auth/callback', () => {
  it('should ask Discord to trade code for tokens', async () => {
    const env = getBindings();
    const config = parseEnvironment(env);
    const stateID = await setupStateSession(config, {});

    const tokens = {
      access_token: 'test-access-token',
      refresh_token: 'test-refresh-token',
      expires_in: 3600,
      scope: 'identify guilds',
      token_type: 'Bearer',
    };
    mockDiscordFetch.mockReturnValueOnce(tokens);

    mockCreateSession.mockReturnValueOnce({
      sessionID: 'test-session-id',
      tokens,
      user: {
        id: 'test-user-id',
        username: 'test-username',
        discriminator: 'test-discriminator',
        avatar: 'test-avatar',
        bot: false,
      },
      guilds: [],
    });

    const response = await makeRequest(
      'GET',
      `/auth/callback?state=${stateID}&code=1234`,
      undefined,
      {
        BOT_CLIENT_ID: 'test123',
        BOT_CLIENT_SECRET: 'test456',
        API_PUBLIC_URI: 'http://test.local/',
        UI_PUBLIC_URI: 'http://web.test.local/',
      }
    );

    expect(response.status).toBe(303);
    expect(mockDiscordFetch).toBeCalledTimes(1);
    expect(mockCreateSession).toBeCalledWith(expect.any(Object), tokens);
    expect(response.headers.get('Location')).toContain(
      'http://web.test.local/machinery/new-session#/test-session-id'
    );
  });

  it('will fail if state is invalid', async () => {
    const response = await makeRequest(
      'GET',
      `/auth/callback?state=invalid-state&code=1234`,
      undefined,
      {
        BOT_CLIENT_ID: 'test123',
        BOT_CLIENT_SECRET: 'test456',
        API_PUBLIC_URI: 'http://test.local/',
        UI_PUBLIC_URI: 'http://web.test.local/',
      }
    );

    expect(response.status).toBe(303);
    expect(response.headers.get('Location')).toContain(
      'http://web.test.local/error/authFailure?extra=state invalid'
    );
  });

  it('will fail if state is missing', async () => {
    const response = await makeRequest('GET', `/auth/callback?code=1234`, undefined, {
      BOT_CLIENT_ID: 'test123',
      BOT_CLIENT_SECRET: 'test456',
      API_PUBLIC_URI: 'http://test.local/',
      UI_PUBLIC_URI: 'http://web.test.local/',
    });

    expect(response.status).toBe(303);
    expect(response.headers.get('Location')).toContain(
      'http://web.test.local/error/authFailure?extra=state invalid'
    );
  });
});

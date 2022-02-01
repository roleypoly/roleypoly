import { SessionData } from '@roleypoly/types';
import { parseEnvironment } from '../../utils/config';
import { getBindings, makeRequest } from '../../utils/testHelpers';

describe('GET /auth/session', () => {
  it('fetches the current user session when it is valid', async () => {
    const config = parseEnvironment(getBindings());

    const session: SessionData = {
      sessionID: 'test-session-id',
      user: {
        id: 'test-user-id',
        username: 'test-username',
        discriminator: 'test-discriminator',
        avatar: 'test-avatar',
        bot: false,
      },
      guilds: [],
      tokens: {
        access_token: 'test-access-token',
        refresh_token: 'test-refresh-token',
        expires_in: 3600,
        scope: 'identify guilds',
        token_type: 'Bearer',
      },
    };

    await config.kv.sessions.put(session.sessionID, session);

    const response = await makeRequest('GET', '/auth/session', {
      headers: {
        Authorization: `Bearer ${session.sessionID}`,
      },
    });

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      sessionID: session.sessionID,
      user: session.user,
      guilds: session.guilds,
    });
  });

  it('returns 401 when session is not valid', async () => {
    const response = await makeRequest('GET', '/auth/session', {
      headers: {
        Authorization: `Bearer invalid-session-id`,
      },
    });

    expect(response.status).toBe(401);
  });
});

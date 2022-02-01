jest.mock('../../utils/discord');

import { SessionData } from '@roleypoly/types';
import { parseEnvironment } from '../../utils/config';
import { AuthType, discordFetch } from '../../utils/discord';
import { formDataRequest } from '../../utils/request';
import { getBindings, makeRequest } from '../../utils/testHelpers';

const mockDiscordFetch = discordFetch as jest.Mock;

describe('DELETE /auth/session', () => {
  it('deletes the current user session when it is valid', async () => {
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

    mockDiscordFetch.mockReturnValue(
      new Response(null, {
        status: 200,
      })
    );

    const response = await makeRequest('DELETE', '/auth/session', {
      headers: {
        Authorization: `Bearer ${session.sessionID}`,
      },
    });

    expect(response.status).toBe(204);
    expect(await config.kv.sessions.get(session.sessionID)).toBeNull();
    expect(mockDiscordFetch).toHaveBeenCalledWith(
      '/oauth2/token/revoke',
      '',
      AuthType.None,
      expect.objectContaining(
        formDataRequest({
          client_id: config.botClientID,
          client_secret: config.botClientSecret,
          token: session.tokens.access_token,
        })
      )
    );
  });
});

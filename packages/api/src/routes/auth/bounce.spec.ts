import { StateSession } from '@roleypoly/types';
import { getBindings, makeRequest } from '../../utils/testHelpers';

describe('GET /auth/bounce', () => {
  it('should return a redirect to Discord OAuth', async () => {
    const response = await makeRequest('GET', '/auth/bounce', undefined, {
      BOT_CLIENT_ID: 'test123',
      API_PUBLIC_URI: 'http://test.local/',
    });
    expect(response.status).toBe(303);
    expect(response.headers.get('Location')).toContain(
      'https://discord.com/api/oauth2/authorize?client_id=test123&response_type=code&scope=identify%20guilds&redirect_uri=http%3A%2F%2Ftest.local%2Fauth%2Fcallback&state='
    );
  });

  it('should store a state-session', async () => {
    const response = await makeRequest('GET', '/auth/bounce', undefined, {
      BOT_CLIENT_ID: 'test123',
      API_PUBLIC_URI: 'http://test.local/',
    });
    expect(response.status).toBe(303);
    const url = new URL(response.headers.get('Location') || '');
    const state = url.searchParams.get('state');

    const environment = getBindings();
    const session = await environment.KV_SESSIONS.get(`state_${state}`, 'json');
    expect(session).not.toBeUndefined();
  });

  test.each([
    ['http://web.test.local', 'http://web.test.local', 'http://web.test.local'],
    ['http://*.test.local', 'http://web.test.local', 'http://web.test.local'],
    ['http://other.test.local', 'http://web.test.local', undefined],
  ])(
    'should process callback hosts when set to %s',
    async (allowlist, input, expected) => {
      const response = await makeRequest('GET', `/auth/bounce?cbh=${input}`, undefined, {
        BOT_CLIENT_ID: 'test123',
        API_PUBLIC_URI: 'http://api.test.local',
        ALLOWED_CALLBACK_HOSTS: allowlist,
      });
      expect(response.status).toBe(303);
      const url = new URL(response.headers.get('Location') || '');
      const state = url.searchParams.get('state');

      const environment = getBindings();
      const session = (await environment.KV_SESSIONS.get(`state_${state}`, 'json')) as {
        data: StateSession;
      };
      expect(session).not.toBeUndefined();
      expect(session?.data.callbackHost).toBe(expected);
    }
  );
});

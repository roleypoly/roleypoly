import { makeRequest } from '../../utils/testHelpers';

describe('GET /auth/bot', () => {
  it('redirects to a Discord OAuth bot flow url', async () => {
    const response = await makeRequest('GET', '/auth/bot', undefined, {
      BOT_CLIENT_ID: 'test123',
    });

    expect(response.status).toBe(303);
    expect(response.headers.get('Location')).toContain(
      'https://discord.com/api/oauth2/authorize?client_id=test123&scope=bot%20applications.commands&permissions=268435456'
    );
  });

  it('redirects to a Discord OAuth bot flow url, forcing a guild when set', async () => {
    const response = await makeRequest('GET', '/auth/bot?guild=123456', undefined, {
      BOT_CLIENT_ID: 'test123',
    });

    expect(response.status).toBe(303);
    expect(response.headers.get('Location')).toContain(
      'https://discord.com/api/oauth2/authorize?client_id=test123&scope=bot%20applications.commands&permissions=268435456&guild_id=123456&disable_guild_select=true'
    );
  });
});

jest.mock('../../guilds/getters');

import { UserGuildPermissions } from '@roleypoly/types';
import { getGuild } from '../../guilds/getters';
import { configContext, makeRequest, makeSession } from '../../utils/testHelpers';

const mockGetGuild = getGuild as jest.Mock;

describe('DELETE /guilds/:id/cache', () => {
  it('calls getGuilds and returns No Content', async () => {
    const [config] = configContext();
    const session = await makeSession(config, {
      guilds: [
        {
          id: '123',
          name: 'test',
          icon: 'test',
          permissionLevel: UserGuildPermissions.Admin,
        },
      ],
    });

    const response = await makeRequest('DELETE', `/guilds/123/cache`, {
      headers: {
        Authorization: `Bearer ${session.sessionID}`,
      },
    });

    expect(response.status).toBe(204);
    expect(mockGetGuild).toHaveBeenCalledWith(expect.any(Object), '123', true);
  });
});

jest.mock('../../guilds/getters');

import { GuildSlug, UserGuildPermissions } from '@roleypoly/types';
import { getGuild } from '../../guilds/getters';
import { APIGuild } from '../../utils/discord';
import { makeRequest } from '../../utils/testHelpers';

const mockGetGuild = getGuild as jest.Mock;

beforeEach(() => {
  mockGetGuild.mockReset();
});

describe('GET /guilds/:id/slug', () => {
  it('returns a valid slug for a given discord server', async () => {
    const guild: APIGuild = {
      id: '123',
      name: 'test',
      icon: 'test',
      roles: [
        {
          id: 'role-1',
          name: 'Role 1',
          color: 0,
          position: 17,
          permissions: '',
          managed: false,
        },
      ],
    };

    mockGetGuild.mockReturnValue(guild);

    const response = await makeRequest('GET', `/guilds/${guild.id}/slug`);

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      id: guild.id,
      icon: guild.icon,
      name: guild.name,
      permissionLevel: UserGuildPermissions.User,
    } as GuildSlug);
  });

  it('returns a 404 if the guild cannot be fetched', async () => {
    mockGetGuild.mockReturnValue(null);

    const response = await makeRequest('GET', `/guilds/slug/123`);

    expect(response.status).toBe(404);
  });
});

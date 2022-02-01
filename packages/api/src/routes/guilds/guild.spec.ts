jest.mock('../../guilds/getters');

import { Features, GuildData, PresentableGuild } from '@roleypoly/types';
import { getGuild, getGuildData, getGuildMember } from '../../guilds/getters';
import { APIGuild, APIMember } from '../../utils/discord';
import { configContext, makeRequest, makeSession } from '../../utils/testHelpers';

const mockGetGuild = getGuild as jest.Mock;
const mockGetGuildMember = getGuildMember as jest.Mock;
const mockGetGuildData = getGuildData as jest.Mock;

beforeEach(() => {
  mockGetGuildData.mockReset();
  mockGetGuild.mockReset();
  mockGetGuildMember.mockReset();
});

describe('GET /guilds/:id', () => {
  it('returns a presentable guild', async () => {
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

    const member: APIMember = {
      roles: ['role-1'],
      pending: false,
      nick: '',
      user: {
        id: 'user-1',
      },
    };

    const guildData: GuildData = {
      id: '123',
      message: 'test',
      categories: [],
      features: Features.None,
      auditLogWebhook: null,
      accessControl: {
        allowList: [],
        blockList: [],
        blockPending: false,
      },
    };

    mockGetGuild.mockReturnValue(guild);
    mockGetGuildMember.mockReturnValue(member);
    mockGetGuildData.mockReturnValue(guildData);

    const [config] = configContext();

    const session = await makeSession(config, {
      guilds: [
        {
          id: '123',
          name: 'test',
          icon: 'test',
          permissionLevel: 0,
        },
      ],
    });
    const response = await makeRequest('GET', `/guilds/${guild.id}`, {
      headers: {
        Authorization: `Bearer ${session.sessionID}`,
      },
    });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      id: guild.id,
      guild: session.guilds[0],
      member: {
        roles: member.roles,
      },
      roles: guild.roles,
      data: guildData,
    } as PresentableGuild);
  });

  it('returns a 404 when the guild is not in session', async () => {
    const [config, context] = configContext();
    const session = await makeSession(config);
    const response = await makeRequest('GET', `/guilds/123`, {
      headers: {
        Authorization: `Bearer ${session.sessionID}`,
      },
    });

    expect(response.status).toBe(404);
  });

  it('returns 404 when the guild is not fetchable', async () => {
    const [config, context] = configContext();
    const session = await makeSession(config, {
      guilds: [
        {
          id: '123',
          name: 'test',
          icon: 'test',
          permissionLevel: 0,
        },
      ],
    });
    const response = await makeRequest('GET', `/guilds/123`, {
      headers: {
        Authorization: `Bearer ${session.sessionID}`,
      },
    });

    expect(response.status).toBe(404);
  });

  it('returns 404 when the member is no longer in the guild', async () => {
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
    mockGetGuildMember.mockReturnValue(null);

    const [config, context] = configContext();
    const session = await makeSession(config, {
      guilds: [
        {
          id: '123',
          name: 'test',
          icon: 'test',
          permissionLevel: 0,
        },
      ],
    });
    const response = await makeRequest('GET', `/guilds/${guild.id}`, {
      headers: {
        Authorization: `Bearer ${session.sessionID}`,
      },
    });

    expect(response.status).toBe(404);
  });
});

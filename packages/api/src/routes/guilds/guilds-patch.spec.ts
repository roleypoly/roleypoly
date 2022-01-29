jest.mock('../../guilds/getters');

import {
  Features,
  GuildData,
  GuildDataUpdate,
  UserGuildPermissions,
} from '@roleypoly/types';
import { getGuildData } from '../../guilds/getters';
import { configContext, makeRequest, makeSession } from '../../utils/testHelpers';

const mockGetGuildData = getGuildData as jest.Mock;

beforeAll(() => {
  jest.resetAllMocks();
});

describe('PATCH /guilds/:id', () => {
  it('updates guild data when user is an editor', async () => {
    const [config, context] = configContext();
    const session = await makeSession(config, {
      guilds: [
        {
          id: '123',
          name: 'test',
          icon: 'test',
          permissionLevel: UserGuildPermissions.Manager,
        },
      ],
    });

    mockGetGuildData.mockReturnValue({
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
    } as GuildData);

    const response = await makeRequest('PATCH', `/guilds/123`, {
      headers: {
        Authorization: `Bearer ${session.sessionID}`,
      },
      body: JSON.stringify({
        message: 'hello test world!',
      } as GuildDataUpdate),
    });

    expect(response.status).toBe(200);

    const newGuildData = await config.kv.guildData.get('123');
    expect(newGuildData).toMatchObject({
      message: 'hello test world!',
    });
  });

  it('ignores extraneous fields sent as updates', async () => {
    const [config, context] = configContext();
    const session = await makeSession(config, {
      guilds: [
        {
          id: '123',
          name: 'test',
          icon: 'test',
          permissionLevel: UserGuildPermissions.Manager,
        },
      ],
    });

    mockGetGuildData.mockReturnValue({
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
    } as GuildData);

    const response = await makeRequest('PATCH', `/guilds/123`, {
      headers: {
        Authorization: `Bearer ${session.sessionID}`,
      },
      body: JSON.stringify({
        fifteen: 'foxes',
      }),
    });

    expect(response.status).toBe(200);

    const newGuildData = await config.kv.guildData.get('123');
    expect(newGuildData).not.toMatchObject({
      fifteen: 'foxes',
    });
  });

  it('403s when user is not an editor', async () => {
    const [config, context] = configContext();
    const session = await makeSession(config, {
      guilds: [
        {
          id: '123',
          name: 'test',
          icon: 'test',
          permissionLevel: UserGuildPermissions.User,
        },
      ],
    });

    mockGetGuildData.mockReturnValue({
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
    } as GuildData);

    const response = await makeRequest('PATCH', `/guilds/123`, {
      headers: {
        Authorization: `Bearer ${session.sessionID}`,
      },
      body: JSON.stringify({
        message: 'hello test world!',
      } as GuildDataUpdate),
    });

    expect(response.status).toBe(403);
  });

  it('400s when no body is present', async () => {
    const [config, context] = configContext();
    const session = await makeSession(config, {
      guilds: [
        {
          id: '123',
          name: 'test',
          icon: 'test',
          permissionLevel: UserGuildPermissions.Manager,
        },
      ],
    });

    const response = await makeRequest('PATCH', `/guilds/123`, {
      headers: {
        Authorization: `Bearer ${session.sessionID}`,
      },
    });

    expect(response.status).toBe(400);
  });
});

jest.mock('../../guilds/getters');
jest.mock('../../utils/discord');

import {
  CategoryType,
  Features,
  Guild,
  GuildData,
  Member,
  OwnRoleInfo,
  RoleSafety,
  RoleUpdate,
  TransactionType,
} from '@roleypoly/types';
import { getGuild, getGuildData, getGuildMember } from '../../guilds/getters';
import { AuthType, discordFetch } from '../../utils/discord';
import { json } from '../../utils/response';
import { configContext, makeRequest, makeSession } from '../../utils/testHelpers';

const mockDiscordFetch = discordFetch as jest.Mock;
const mockGetGuild = getGuild as jest.Mock;
const mockGetGuildMember = getGuildMember as jest.Mock;
const mockGetGuildData = getGuildData as jest.Mock;

beforeEach(() => {
  jest.resetAllMocks();
  doMock();
});

describe('PUT /guilds/:id/roles', () => {
  it('adds member roles when called with valid roles', async () => {
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

    const update: RoleUpdate = {
      knownState: ['role-1'],
      transactions: [{ id: 'role-2', action: TransactionType.Add }],
    };

    mockDiscordFetch.mockReturnValueOnce(
      json({
        roles: ['role-1', 'role-2'],
      })
    );

    const response = await makeRequest(
      'PUT',
      `/guilds/123/roles`,
      {
        headers: {
          Authorization: `Bearer ${session.sessionID}`,
        },
        body: JSON.stringify(update),
      },
      {
        BOT_TOKEN: 'test',
      }
    );

    expect(response.status).toBe(200);
    expect(mockDiscordFetch).toHaveBeenCalledWith(
      `/guilds/123/members/${session.user.id}`,
      'test',
      AuthType.Bot,
      {
        body: JSON.stringify({
          roles: ['role-1', 'role-2'],
        }),
        headers: {
          'content-type': 'application/json',
          'x-audit-log-reason': `Picked their roles via ${config.uiPublicURI}`,
        },
        method: 'PATCH',
      }
    );
  });

  it('removes member roles when called with valid roles', async () => {
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

    const update: RoleUpdate = {
      knownState: ['role-1'],
      transactions: [{ id: 'role-1', action: TransactionType.Remove }],
    };

    mockDiscordFetch.mockReturnValueOnce(
      json({
        roles: [],
      })
    );

    const response = await makeRequest(
      'PUT',
      `/guilds/123/roles`,
      {
        headers: {
          Authorization: `Bearer ${session.sessionID}`,
        },
        body: JSON.stringify(update),
      },
      {
        BOT_TOKEN: 'test',
      }
    );

    expect(response.status).toBe(200);
    expect(mockDiscordFetch).toHaveBeenCalledWith(
      `/guilds/123/members/${session.user.id}`,
      'test',
      AuthType.Bot,
      {
        body: JSON.stringify({
          roles: [],
        }),
        headers: {
          'content-type': 'application/json',
          'x-audit-log-reason': `Picked their roles via ${config.uiPublicURI}`,
        },
        method: 'PATCH',
      }
    );
  });

  it('does not update roles when called only with invalid roles', async () => {
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

    const update: RoleUpdate = {
      knownState: ['role-1'],
      transactions: [
        { id: 'role-3', action: TransactionType.Add }, // role is in a hidden category
        { id: 'role-5-unsafe', action: TransactionType.Add }, // role is marked unsafe
      ],
    };

    const response = await makeRequest(
      'PUT',
      `/guilds/123/roles`,
      {
        headers: {
          Authorization: `Bearer ${session.sessionID}`,
        },
        body: JSON.stringify(update),
      },
      {
        BOT_TOKEN: 'test',
      }
    );

    expect(response.status).toBe(400);
    expect(mockDiscordFetch).not.toHaveBeenCalled();
  });

  it('filters roles that are invalid while accepting ones that are valid', async () => {
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

    const update: RoleUpdate = {
      knownState: ['role-1'],
      transactions: [
        { id: 'role-3', action: TransactionType.Add }, // role is in a hidden category
        { id: 'role-2', action: TransactionType.Add }, // role is in a hidden category
      ],
    };

    const response = await makeRequest(
      'PUT',
      `/guilds/123/roles`,
      {
        headers: {
          Authorization: `Bearer ${session.sessionID}`,
        },
        body: JSON.stringify(update),
      },
      {
        BOT_TOKEN: 'test',
      }
    );

    expect(response.status).toBe(200);
    expect(mockDiscordFetch).toHaveBeenCalledWith(
      `/guilds/123/members/${session.user.id}`,
      'test',
      AuthType.Bot,
      {
        body: JSON.stringify({
          roles: ['role-1', 'role-2'],
        }),
        headers: {
          'content-type': 'application/json',
          'x-audit-log-reason': `Picked their roles via ${config.uiPublicURI}`,
        },
        method: 'PATCH',
      }
    );
  });

  it('400s when no transactions are present', async () => {
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

    const update: RoleUpdate = {
      knownState: ['role-1'],
      transactions: [],
    };

    const response = await makeRequest(
      'PUT',
      `/guilds/123/roles`,
      {
        headers: {
          Authorization: `Bearer ${session.sessionID}`,
        },
        body: JSON.stringify(update),
      },
      {
        BOT_TOKEN: 'test',
      }
    );

    expect(response.status).toBe(400);
    expect(mockDiscordFetch).not.toHaveBeenCalled();
    expect(mockGetGuild).not.toHaveBeenCalled();
    expect(mockGetGuildData).not.toHaveBeenCalled();
    expect(mockGetGuildMember).not.toHaveBeenCalled();
  });
});

const doMock = () => {
  const guild: Guild & OwnRoleInfo = {
    id: '123',
    name: 'test',
    icon: 'test',
    highestRolePosition: 0,
    roles: [
      {
        id: 'role-1',
        name: 'Role 1',
        color: 0,
        position: 17,
        permissions: '',
        managed: false,
        safety: RoleSafety.Safe,
      },
      {
        id: 'role-2',
        name: 'Role 2',
        color: 0,
        position: 16,
        permissions: '',
        managed: false,
        safety: RoleSafety.Safe,
      },
      {
        id: 'role-3',
        name: 'Role 3',
        color: 0,
        position: 15,
        permissions: '',
        managed: false,
        safety: RoleSafety.Safe,
      },
      {
        id: 'role-4',
        name: 'Role 4',
        color: 0,
        position: 14,
        permissions: '',
        managed: false,
        safety: RoleSafety.Safe,
      },
      {
        id: 'role-5-unsafe',
        name: 'Role 5 (Unsafe)',
        color: 0,
        position: 14,
        permissions: '',
        managed: false,
        safety: RoleSafety.DangerousPermissions,
      },
    ],
  };

  const member: Member = {
    roles: ['role-1'],
    pending: false,
    nick: '',
  };

  const guildData: GuildData = {
    id: '123',
    message: 'test',
    categories: [
      {
        id: 'category-1',
        name: 'Category 1',
        position: 0,
        hidden: false,
        type: CategoryType.Multi,
        roles: ['role-1', 'role-2'],
      },
      {
        id: 'category-2',
        name: 'Category 2',
        position: 1,
        hidden: true,
        type: CategoryType.Multi,
        roles: ['role-3'],
      },
    ],
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
  mockDiscordFetch.mockReturnValue(json({}));
};

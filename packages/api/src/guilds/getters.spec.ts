jest.mock('../utils/discord');

import { CategoryType, Features, Guild, GuildData, RoleSafety } from '@roleypoly/types';
import { APIGuild, discordFetch } from '../utils/discord';
import { configContext } from '../utils/testHelpers';
import { getGuild, getGuildData, getGuildMember, getPickableRoles } from './getters';

const mockDiscordFetch = discordFetch as jest.Mock;

beforeEach(() => {
  mockDiscordFetch.mockReset();
});

describe('getGuild', () => {
  it('gets a guild from discord', async () => {
    const [config] = configContext();
    const guild: APIGuild = {
      id: '123',
      name: 'test',
      icon: 'test',
      roles: [],
    };

    mockDiscordFetch.mockReturnValue(guild);

    const result = await getGuild(config, '123');

    expect(result).toMatchObject(guild);
  });

  it('gets a guild from cache automatically', async () => {
    const [config] = configContext();

    const guild: APIGuild = {
      id: '123',
      name: 'test',
      icon: 'test',
      roles: [],
    };

    await config.kv.guilds.put('guild/123', guild, config.retention.guild);
    mockDiscordFetch.mockReturnValue({ ...guild, name: 'test2' });

    const result = await getGuild(config, '123');

    expect(result).toMatchObject(guild);
    expect(result!.name).toBe('test');
  });
});

describe('getGuildData', () => {
  it('gets guild data from store', async () => {
    const [config] = configContext();

    const guildData: GuildData = {
      id: '123',
      message: 'Hello world!',
      categories: [],
      features: Features.None,
      auditLogWebhook: null,
      accessControl: {
        allowList: [],
        blockList: [],
        blockPending: true,
      },
    };

    await config.kv.guildData.put('123', guildData);

    const result = await getGuildData(config, '123');

    expect(result).toMatchObject(guildData);
  });

  it('adds fields that are missing from the stored data', async () => {
    const [config] = configContext();

    const guildData: Partial<GuildData> = {
      id: '123',
      message: 'Hello world!',
      categories: [],
      features: Features.None,
    };

    await config.kv.guildData.put('123', guildData);
    const result = await getGuildData(config, '123');

    expect(result).toMatchObject({
      ...guildData,
      auditLogWebhook: null,
      accessControl: expect.any(Object),
    });
  });
});

describe('getGuildMember', () => {
  it('gets a member from discord', async () => {
    const [config] = configContext();

    const member = {
      roles: [],
      pending: false,
      nick: 'test',
    };

    mockDiscordFetch.mockReturnValue(member);

    const result = await getGuildMember(config, '123', '123');

    expect(result).toMatchObject(member);
  });

  it('gets a member from cache automatically', async () => {
    const [config] = configContext();

    const member = {
      roles: [],
      pending: false,
      nick: 'test2',
    };

    await config.kv.guilds.put('member/123/123', member, config.retention.guild);
    mockDiscordFetch.mockReturnValue({ ...member, nick: 'test' });

    const result = await getGuildMember(config, '123', '123');

    expect(result).toMatchObject(member);
    expect(result!.nick).toBe('test2');
  });
});

describe('getPickableRoles', () => {
  it('returns all pickable roles for a given guild', async () => {
    const guildData: GuildData = {
      id: '123',
      message: 'Hello world!',
      categories: [
        {
          id: '123',
          name: 'test',
          position: 0,
          roles: ['role-1', 'role-2', 'role-unsafe'],
          hidden: false,
          type: CategoryType.Multi,
        },
        {
          id: '123',
          name: 'test',
          position: 0,
          roles: ['role-3', 'role-4'],
          hidden: true,
          type: CategoryType.Multi,
        },
      ],
      features: Features.None,
      auditLogWebhook: null,
      accessControl: {
        allowList: [],
        blockList: [],
        blockPending: true,
      },
    };

    const guild: Guild = {
      id: '123',
      name: 'test',
      icon: '',
      roles: [
        {
          id: 'role-1',
          name: 'test',
          position: 0,
          managed: false,
          color: 0,
          safety: RoleSafety.Safe,
          permissions: '0',
        },
        {
          id: 'role-3',
          name: 'test',
          position: 0,
          managed: false,
          color: 0,
          safety: RoleSafety.Safe,
          permissions: '0',
        },
        {
          id: 'role-unsafe',
          name: 'test',
          position: 0,
          managed: false,
          color: 0,
          safety: RoleSafety.DangerousPermissions,
          permissions: '0',
        },
      ],
    };

    const result = getPickableRoles(guildData, guild);

    expect(result).toMatchObject([
      {
        category: guildData.categories[0],
        roles: [guild.roles[0]],
      },
    ]);
  });
});

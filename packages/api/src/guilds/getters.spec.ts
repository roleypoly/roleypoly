jest.mock('../utils/discord');
jest.mock('../utils/legacy');

import { CategoryType, Features, GuildData } from '@roleypoly/types';
import { APIGuild, discordFetch } from '../utils/discord';
import {
  fetchLegacyServer,
  LegacyGuildData,
  transformLegacyGuild,
} from '../utils/legacy';
import { configContext } from '../utils/testHelpers';
import { getGuild, getGuildData, getGuildMember } from './getters';

const mockDiscordFetch = discordFetch as jest.Mock;
const mockFetchLegacyServer = fetchLegacyServer as jest.Mock;
const mockTransformLegacyGuild = transformLegacyGuild as jest.Mock;

beforeEach(() => {
  mockDiscordFetch.mockReset();
});

describe('getGuild', () => {
  it('gets a guild from discord', async () => {
    const [config] = configContext();
    const guild = {
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

    await config.kv.guilds.put('guilds/123', guild, config.retention.guild);
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

  describe('automatic legacy import', () => {
    beforeEach(() => {
      mockFetchLegacyServer.mockReset();
      mockTransformLegacyGuild.mockImplementation(
        jest.requireActual('../utils/legacy').transformLegacyGuild
      );
    });

    it('attempts to import guild data from the legacy server', async () => {
      const [config] = configContext();

      const legacyGuildData: LegacyGuildData = {
        id: '123',
        message: 'Hello world!',
        categories: [
          {
            id: '123',
            name: 'test',
            position: 0,
            roles: ['role-1', 'role-2'],
            hidden: false,
            type: 'multi',
          },
        ],
      };

      mockFetchLegacyServer.mockReturnValue(legacyGuildData);

      const expectedGuildData: GuildData = {
        id: '123',
        message: legacyGuildData.message,
        auditLogWebhook: null,
        accessControl: {
          allowList: [],
          blockList: [],
          blockPending: true,
        },
        features: Features.LegacyGuild,
        categories: [
          {
            id: expect.any(String),
            name: 'test',
            position: 0,
            roles: ['role-1', 'role-2'],
            hidden: false,
            type: CategoryType.Multi,
          },
        ],
      };

      const currentGuildData = await getGuildData(config, '123');
      expect(currentGuildData).toMatchObject(expectedGuildData);

      const storedGuildData = await config.kv.guildData.get('123');
      expect(storedGuildData).toMatchObject(expectedGuildData);
    });

    it('fails an import and saves new guild data instead', async () => {
      const [config] = configContext();

      mockFetchLegacyServer.mockReturnValue(null);

      const expectedGuildData: GuildData = {
        id: '123',
        message: '',
        auditLogWebhook: null,
        accessControl: {
          allowList: [],
          blockList: [],
          blockPending: true,
        },
        features: Features.None,
        categories: [],
      };

      const currentGuildData = await getGuildData(config, '123');
      expect(currentGuildData).toMatchObject(expectedGuildData);

      const storedGuildData = await config.kv.guildData.get('123');
      expect(storedGuildData).toMatchObject(expectedGuildData);
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

    await config.kv.guilds.put('guilds/123/members/123', member, config.retention.guild);
    mockDiscordFetch.mockReturnValue({ ...member, nick: 'test' });

    const result = await getGuildMember(config, '123', '123');

    expect(result).toMatchObject(member);
    expect(result!.nick).toBe('test2');
  });
});

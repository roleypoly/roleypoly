jest.mock('../utils/discord');

import { Features, GuildData } from '@roleypoly/types';
import { APIGuild, discordFetch } from '../utils/discord';
import { configContext } from '../utils/testHelpers';
import { getGuild, getGuildData, getGuildMember } from './getters';

const mockDiscordFetch = discordFetch as jest.Mock;

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

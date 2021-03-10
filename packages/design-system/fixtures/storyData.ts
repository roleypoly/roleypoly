import {
    Category,
    CategoryType,
    DiscordUser,
    Features,
    Guild,
    GuildData,
    GuildEnumeration,
    GuildSlug,
    Member,
    Role,
    RoleSafety,
    RoleypolyUser,
} from '../../../src/common/types';

export const roleCategory: Role[] = [
    {
        id: 'aaa',
        permissions: '0',
        name: 'She/Her',
        color: 0xffc0cb,
        position: 1,
        managed: false,
        safety: RoleSafety.Safe,
    },
    {
        id: 'bbb',
        permissions: '0',
        name: 'He/Him',
        color: 0xc0ebff,
        position: 2,
        managed: false,
        safety: RoleSafety.Safe,
    },
    {
        id: 'ccc',
        permissions: '0',
        name: 'They/Them',
        color: 0xc0ffd5,
        position: 3,
        managed: false,
        safety: RoleSafety.Safe,
    },
    {
        id: 'ddd',
        permissions: '0',
        name: 'Reee',
        color: 0xff0000,
        position: 4,
        managed: false,
        safety: RoleSafety.Safe,
    },
    {
        id: 'eee',
        permissions: '0',
        name: 'black but actually bravely default',
        color: 0x000000,
        position: 5,
        managed: false,
        safety: RoleSafety.Safe,
    },
    {
        id: 'fff',
        permissions: '0',
        name: 'b̻͌̆̽ͣ̃ͭ̊l͚̥͙̔ͨ̊aͥć͕k͎̟͍͕ͥ̋ͯ̓̈̉̋i͛̄̔͂̚̚҉̳͈͔̖̼̮ṣ̤̗̝͊̌͆h͈̭̰͔̥̯ͅ',
        color: 0x1,
        position: 6,
        managed: false,
        safety: RoleSafety.Safe,
    },
    {
        id: 'unsafe1',
        permissions: '0',
        name: 'too high',
        color: 0xff0088,
        position: 7,
        managed: false,
        safety: RoleSafety.HigherThanBot,
    },
    {
        id: 'unsafe2',
        permissions: String(0x00000008 | 0x10000000),
        name: 'too strong',
        color: 0x00ff88,
        position: 8,
        managed: false,
        safety: RoleSafety.DangerousPermissions,
    },
];

export const mockCategory: Category = {
    id: 'aaa',
    name: 'Mock',
    roles: roleCategory.map((x) => x.id),
    hidden: false,
    type: CategoryType.Multi,
    position: 0,
};

export const roleCategory2: Role[] = [
    {
        id: 'ddd2',
        permissions: '0',
        name: 'red',
        color: 0xff0000,
        position: 9,
        managed: false,
        safety: RoleSafety.Safe,
    },
    {
        id: 'eee2',
        permissions: '0',
        name: 'green',
        color: 0x00ff00,
        position: 10,
        managed: false,
        safety: RoleSafety.Safe,
    },
];

export const mockCategorySingle: Category = {
    id: 'bbb',
    name: 'Mock Single 岡野',
    roles: roleCategory2.map((x) => x.id),
    hidden: false,
    type: CategoryType.Single,
    position: 0,
};

export const roleWikiData = {
    aaa: 'Typically used by feminine-identifying people',
    bbb: 'Typically used by masculine-identifying people',
    ccc: 'Typically used to refer to all people as a singular neutral.',
};

export const guild: Guild = {
    name: 'emoji megaporium',
    id: '421896162539470888',
    icon: '3372fd895ed913b55616c5e49cd50e60',
    roles: [],
};

export const roleypolyGuild: GuildSlug = {
    name: 'Roleypoly',
    id: '386659935687147521',
    permissionLevel: 0,
    icon: 'ffee638c73ff9c972554f64ca34d67ee',
};

export const guildMap: { [x: string]: GuildSlug } = {
    'emoji megaporium': {
        name: guild.name,
        id: guild.id,
        permissionLevel: 0,
        icon: guild.icon,
    },
    Roleypoly: roleypolyGuild,
    'chamber of secrets': {
        name: 'chamber of secrets',
        id: 'aaa',
        permissionLevel: 0,
        icon: '',
    },
    Eclipse: {
        name: 'Eclipse',
        id: '408821059161423873',
        permissionLevel: 0,
        icon: '49dfdd8b2456e2977e80a8b577b19c0d',
    },
};

export const guildData: GuildData = {
    id: 'aaa',
    message: 'henlo worl!!',
    categories: [mockCategory, mockCategorySingle],
    features: Features.None,
};

export const user: DiscordUser = {
    id: '62601275618889728',
    username: 'okano',
    discriminator: '0001',
    avatar: 'ca2028bab0fe30e1af4392f3fa3576e2',
    bot: false,
};

export const member: Member = {
    guildid: 'aaa',
    roles: ['aaa', 'eee', 'unsafe2', 'ddd2'],
    nick: 'okano cat',
    user: user,
};

export const rpUser: RoleypolyUser = {
    discorduser: user,
};

export const guildEnum: GuildEnumeration = {
    guilds: [
        {
            id: 'aaa',
            guild: guildMap['emoji megaporium'],
            member,
            data: guildData,
            roles: [...roleCategory, ...roleCategory2],
        },
        {
            id: 'bbb',
            guild: guildMap['Roleypoly'],
            member: {
                ...member,
                roles: ['unsafe2'],
            },
            data: guildData,
            roles: [...roleCategory, ...roleCategory2],
        },
        {
            id: 'ccc',
            guild: guildMap['chamber of secrets'],
            member,
            data: guildData,
            roles: [...roleCategory, ...roleCategory2],
        },
        {
            id: 'ddd',
            guild: guildMap['Eclipse'],
            member,
            data: guildData,
            roles: [...roleCategory, ...roleCategory2],
        },
    ],
};

export const mastheadSlugs: GuildSlug[] = guildEnum.guilds.map<GuildSlug>(
    (guild, idx) => ({
        id: guild.guild.id,
        name: guild.guild.name,
        icon: guild.guild.icon,
        permissionLevel: 1 << idx % 3,
    })
);

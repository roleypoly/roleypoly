import {
    Category,
    DiscordUser,
    Guild,
    GuildData,
    GuildEnumeration,
    GuildRoles,
    Member,
    Role,
    RoleSafety,
    RoleypolyUser,
    CategoryType,
    GuildSlug,
} from '.';

export const roleCategory: Role[] = [
    {
        id: 'aaa',
        permissions: 0,
        name: 'She/Her',
        color: 0xffc0cb,
        position: 1,
        managed: false,
        safety: RoleSafety.SAFE,
    },
    {
        id: 'bbb',
        permissions: 0,
        name: 'He/Him',
        color: 0xc0ebff,
        position: 2,
        managed: false,
        safety: RoleSafety.SAFE,
    },
    {
        id: 'ccc',
        permissions: 0,
        name: 'They/Them',
        color: 0xc0ffd5,
        position: 3,
        managed: false,
        safety: RoleSafety.SAFE,
    },
    {
        id: 'ddd',
        permissions: 0,
        name: 'Reee',
        color: 0xff0000,
        position: 4,
        managed: false,
        safety: RoleSafety.SAFE,
    },
    {
        id: 'eee',
        permissions: 0,
        name: 'black but actually bravely default',
        color: 0x000000,
        position: 5,
        managed: false,
        safety: RoleSafety.SAFE,
    },
    {
        id: 'fff',
        permissions: 0,
        name: 'b̻͌̆̽ͣ̃ͭ̊l͚̥͙̔ͨ̊aͥć͕k͎̟͍͕ͥ̋ͯ̓̈̉̋i͛̄̔͂̚̚҉̳͈͔̖̼̮ṣ̤̗̝͊̌͆h͈̭̰͔̥̯ͅ',
        color: 0x1,
        position: 6,
        managed: false,
        safety: RoleSafety.SAFE,
    },
    {
        id: 'unsafe1',
        permissions: 0,
        name: 'too high',
        color: 0xff0088,
        position: 7,
        managed: false,
        safety: RoleSafety.HIGHERTHANBOT,
    },
    {
        id: 'unsafe2',
        permissions: 0x00000008 | 0x10000000,
        name: 'too strong',
        color: 0x00ff88,
        position: 8,
        managed: false,
        safety: RoleSafety.DANGEROUSPERMISSIONS,
    },
];

export const mockCategory: Category = {
    id: 'aaa',
    name: 'Mock',
    rolesList: roleCategory.map((x) => x.id),
    hidden: false,
    type: CategoryType.MULTI,
    position: 0,
};

export const roleCategory2: Role[] = [
    {
        id: 'ddd2',
        permissions: 0,
        name: 'red',
        color: 0xff0000,
        position: 9,
        managed: false,
        safety: RoleSafety.SAFE,
    },
    {
        id: 'eee2',
        permissions: 0,
        name: 'green',
        color: 0x00ff00,
        position: 10,
        managed: false,
        safety: RoleSafety.SAFE,
    },
];

export const mockCategorySingle: Category = {
    id: 'bbb',
    name: 'Mock Single 岡野',
    rolesList: roleCategory2.map((x) => x.id),
    hidden: false,
    type: CategoryType.SINGLE,
    position: 0,
};

export const guildRoles: GuildRoles = {
    id: 'aaa',
    rolesList: [...roleCategory, ...roleCategory2],
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
    ownerid: 'bbb',
    membercount: 23453,
    splash: '',
};

export const guildMap: { [x: string]: Guild } = {
    'emoji megaporium': guild,
    Roleypoly: {
        name: 'Roleypoly',
        id: '203493697696956418',
        icon: 'ff08d36f5aee1ff48f8377b65d031ab0',
        ownerid: 'bbb',
        membercount: 23453,
        splash: '',
    },
    'chamber of secrets': {
        name: 'chamber of secrets',
        id: 'aaa',
        icon: '',
        ownerid: 'bbb',
        membercount: 23453,
        splash: '',
    },
    Eclipse: {
        name: 'Eclipse',
        id: '408821059161423873',
        icon: '49dfdd8b2456e2977e80a8b577b19c0d',
        ownerid: 'bbb',
        membercount: 23453,
        splash: '',
    },
};

export const guildData: GuildData = {
    id: 'aaa',
    message: 'henlo worl!!',
    categoriesList: [mockCategory, mockCategorySingle],
    entitlementsList: [],
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
    rolesList: ['aaa', 'eee', 'unsafe2', 'ddd2'],
    nick: 'okano cat',
    user: user,
};

export const rpUser: RoleypolyUser = {
    discorduser: user,
};

export const guildEnum: GuildEnumeration = {
    guildsList: [
        {
            id: 'aaa',
            guild: guildMap['emoji megaporium'],
            member,
            data: guildData,
            roles: guildRoles,
        },
        {
            id: 'bbb',
            guild: guildMap['Roleypoly'],
            member: {
                ...member,
                rolesList: ['unsafe2'],
            },
            data: guildData,
            roles: guildRoles,
        },
        {
            id: 'ccc',
            guild: guildMap['chamber of secrets'],
            member,
            data: guildData,
            roles: guildRoles,
        },
        {
            id: 'ddd',
            guild: guildMap['Eclipse'],
            member,
            data: guildData,
            roles: guildRoles,
        },
    ],
};

export const mastheadSlugs: GuildSlug[] = guildEnum.guildsList.map<GuildSlug>(
    (guild, idx) => ({
        id: guild.guild.id,
        name: guild.guild.name,
        icon: guild.guild.icon,
        permissionLevel: idx % 3,
    })
);

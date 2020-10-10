import { Member } from '@roleypoly/rpc/discord';
import { Category, GuildData, GuildEnumeration } from '@roleypoly/rpc/platform';
import {
    DiscordUser,
    Guild,
    GuildRoles,
    Role,
    RoleypolyUser,
} from '@roleypoly/rpc/shared';

export const roleCategory: Role.AsObject[] = [
    {
        id: 'aaa',
        permissions: 0,
        name: 'She/Her',
        color: 0xffc0cb,
        position: 1,
        managed: false,
        safety: Role.RoleSafety.SAFE,
    },
    {
        id: 'bbb',
        permissions: 0,
        name: 'He/Him',
        color: 0xc0ebff,
        position: 2,
        managed: false,
        safety: Role.RoleSafety.SAFE,
    },
    {
        id: 'ccc',
        permissions: 0,
        name: 'They/Them',
        color: 0xc0ffd5,
        position: 3,
        managed: false,
        safety: Role.RoleSafety.SAFE,
    },
    {
        id: 'ddd',
        permissions: 0,
        name: 'Reee',
        color: 0xff0000,
        position: 4,
        managed: false,
        safety: Role.RoleSafety.SAFE,
    },
    {
        id: 'eee',
        permissions: 0,
        name: 'black but actually bravely default',
        color: 0x000000,
        position: 5,
        managed: false,
        safety: Role.RoleSafety.SAFE,
    },
    {
        id: 'fff',
        permissions: 0,
        name: 'b̻͌̆̽ͣ̃ͭ̊l͚̥͙̔ͨ̊aͥć͕k͎̟͍͕ͥ̋ͯ̓̈̉̋i͛̄̔͂̚̚҉̳͈͔̖̼̮ṣ̤̗̝͊̌͆h͈̭̰͔̥̯ͅ',
        color: 0x1,
        position: 6,
        managed: false,
        safety: Role.RoleSafety.SAFE,
    },
    {
        id: 'unsafe1',
        permissions: 0,
        name: 'too high',
        color: 0xff0088,
        position: 7,
        managed: false,
        safety: Role.RoleSafety.HIGHERTHANBOT,
    },
    {
        id: 'unsafe2',
        permissions: 0x00000008 | 0x10000000,
        name: 'too strong',
        color: 0x00ff88,
        position: 8,
        managed: false,
        safety: Role.RoleSafety.DANGEROUSPERMISSIONS,
    },
];

export const mockCategory: Category.AsObject = {
    id: 'aaa',
    name: 'Mock',
    rolesList: roleCategory.map((x) => x.id),
    hidden: false,
    type: Category.CategoryType.MULTI,
    position: 0,
};

export const roleCategory2: Role.AsObject[] = [
    {
        id: 'ddd2',
        permissions: 0,
        name: 'red',
        color: 0xff0000,
        position: 9,
        managed: false,
        safety: Role.RoleSafety.SAFE,
    },
    {
        id: 'eee2',
        permissions: 0,
        name: 'green',
        color: 0x00ff00,
        position: 10,
        managed: false,
        safety: Role.RoleSafety.SAFE,
    },
];

export const mockCategorySingle: Category.AsObject = {
    id: 'bbb',
    name: 'Mock Single 岡野',
    rolesList: roleCategory2.map((x) => x.id),
    hidden: false,
    type: Category.CategoryType.SINGLE,
    position: 0,
};

export const guildRoles: GuildRoles.AsObject = {
    id: 'aaa',
    rolesList: [...roleCategory, ...roleCategory2],
};

export const roleWikiData = {
    aaa: 'Typically used by feminine-identifying people',
    bbb: 'Typically used by masculine-identifying people',
    ccc: 'Typically used to refer to all people as a singular neutral.',
};

export const guild: Guild.AsObject = {
    name: 'emoji megaporium',
    id: 'aaa',
    icon:
        'https://cdn.discordapp.com/icons/421896162539470888/3372fd895ed913b55616c5e49cd50e60.png?size=256',
    ownerid: 'bbb',
    membercount: 23453,
    splash: '',
};

export const guildMap: { [x: string]: Guild.AsObject } = {
    'emoji megaporium': guild,
    Roleypoly: {
        name: 'Roleypoly',
        id: 'aaa',
        icon:
            'https://cdn.discordapp.com/icons/203493697696956418/ff08d36f5aee1ff48f8377b65d031ab0.png?size=256',
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
        id: 'aaa',
        icon:
            'https://cdn.discordapp.com/icons/408821059161423873/49dfdd8b2456e2977e80a8b577b19c0d.png?size=256',
        ownerid: 'bbb',
        membercount: 23453,
        splash: '',
    },
};

export const guildData: GuildData.AsObject = {
    id: 'aaa',
    message: 'henlo worl!!',
    categoriesList: [mockCategory, mockCategorySingle],
    entitlementsList: [],
};

export const user: DiscordUser.AsObject = {
    id: '123',
    username: 'okano cat',
    discriminator: '3266',
    avatar:
        'https://cdn.discordapp.com/avatars/62601275618889728/b1292bb974557337702cb941fc038085.png',
    bot: false,
};

export const member: Member.AsObject = {
    guildid: 'aaa',
    rolesList: ['aaa', 'eee', 'unsafe2', 'ddd2'],
    nick: 'okano cat',
    user: user,
};

export const rpUser: RoleypolyUser.AsObject = {
    discorduser: user,
};

export const guildEnum: GuildEnumeration.AsObject = {
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

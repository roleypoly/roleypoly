import {
    Features,
    Guild,
    GuildData as GuildDataT,
    OwnRoleInfo,
    Role,
    RoleSafety,
} from '../../../src/common/types';
import { evaluatePermission, permissions } from '../../../src/common/utils/hasPermission';
import { AuthType, cacheLayer, discordFetch } from './api-tools';
import { botClientID, botToken } from './config';
import { GuildData, Guilds } from './kv';

type APIGuild = {
    // Only relevant stuff
    id: string;
    name: string;
    icon: string;
    roles: APIRole[];
};

type APIRole = {
    id: string;
    name: string;
    color: number;
    position: number;
    permissions: string;
    managed: boolean;
};

export const getGuild = cacheLayer(
    Guilds,
    (id: string) => `guilds/${id}`,
    async (id: string) => {
        const guildRaw = await discordFetch<APIGuild>(
            `/guilds/${id}`,
            botToken,
            AuthType.Bot
        );

        if (!guildRaw) {
            return null;
        }

        const botMemberRoles =
            (await getGuildMemberRoles({
                serverID: id,
                userID: botClientID,
            })) || [];

        const highestRolePosition = botMemberRoles.reduce<number>((highest, roleID) => {
            const role = guildRaw.roles.find((guildRole) => guildRole.id === roleID);
            if (!role) {
                return highest;
            }

            // If highest is a bigger number, it stays the highest.
            if (highest > role.position) {
                return highest;
            }

            return role.position;
        }, 0);

        const roles = guildRaw.roles.map<Role>((role) => ({
            id: role.id,
            name: role.name,
            color: role.color,
            managed: role.managed,
            position: role.position,
            permissions: role.permissions,
            safety: calculateRoleSafety(role, highestRolePosition),
        }));

        // Filters the raw guild data into data we actually want
        const guild: Guild & OwnRoleInfo = {
            id: guildRaw.id,
            name: guildRaw.name,
            icon: guildRaw.icon,
            roles,
            highestRolePosition,
        };

        return guild;
    },
    60 * 60 * 2 // 2 hour TTL
);

type GuildMemberIdentity = {
    serverID: string;
    userID: string;
};

type APIMember = {
    // Only relevant stuff, again.
    roles: string[];
};

const guildMemberRolesIdentity = ({ serverID, userID }: GuildMemberIdentity) =>
    `guilds/${serverID}/members/${userID}/roles`;

export const getGuildMemberRoles = cacheLayer<GuildMemberIdentity, Role['id'][]>(
    Guilds,
    guildMemberRolesIdentity,
    async ({ serverID, userID }) => {
        const discordMember = await discordFetch<APIMember>(
            `/guilds/${serverID}/members/${userID}`,
            botToken,
            AuthType.Bot
        );

        if (!discordMember) {
            return null;
        }

        return discordMember.roles;
    },
    60 * 5 // 5 minute TTL
);

export const updateGuildMemberRoles = async (
    identity: GuildMemberIdentity,
    roles: Role['id'][]
) => {
    await Guilds.put(guildMemberRolesIdentity(identity), roles, 60 * 5);
};

export const getGuildData = async (id: string): Promise<GuildDataT> => {
    const guildData = await GuildData.get<GuildDataT>(id);

    if (!guildData) {
        return {
            id,
            message: '',
            categories: [],
            features: Features.None,
        };
    }

    return guildData;
};

const calculateRoleSafety = (role: Role | APIRole, highestBotRolePosition: number) => {
    let safety = RoleSafety.Safe;

    if (role.managed) {
        safety |= RoleSafety.ManagedRole;
    }

    if (role.position > highestBotRolePosition) {
        safety |= RoleSafety.HigherThanBot;
    }

    const permBigInt = BigInt(role.permissions);
    if (
        evaluatePermission(permBigInt, permissions.ADMINISTRATOR) ||
        evaluatePermission(permBigInt, permissions.MANAGE_ROLES)
    ) {
        safety |= RoleSafety.DangerousPermissions;
    }

    return safety;
};

import { Role } from '@roleypoly/types';

export const evaluatePermission = <T extends number | bigint>(
    haystack: T,
    needle: T
): boolean => {
    return (haystack & needle) === needle;
};

export const hasPermission = (roles: Role[], permission: bigint): boolean => {
    const aggregateRoles = roles.reduce(
        (acc, role) => acc | BigInt(role.permissions),
        BigInt(0)
    );
    return evaluatePermission(aggregateRoles, permission);
};

export const hasPermissionOrAdmin = (roles: Role[], permission: bigint): boolean =>
    hasPermission(roles, permission | permissions.ADMINISTRATOR);

export const permissions = {
    // IMPORTANT: Only uncomment what's actually used. All are left for convenience.

    // CREATE_INSTANT_INVITE: BigInt(0x1),
    // KICK_MEMBERS: BigInt(0x2),
    // BAN_MEMBERS: BigInt(0x4),
    ADMINISTRATOR: BigInt(0x8),
    // MANAGE_CHANNELS: BigInt(0x10),
    // MANAGE_GUILD: BigInt(0x20),
    // ADD_REACTIONS: BigInt(0x40),
    // VIEW_AUDIT_LOG: BigInt(0x80),
    // VIEW_CHANNEL: BigInt(0x400),
    // SEND_MESSAGES: BigInt(0x800),
    // SEND_TTS_MESSAGES: BigInt(0x1000),
    // MANAGE_MESSAGES: BigInt(0x2000),
    // EMBED_LINKS: BigInt(0x4000),
    // ATTACH_FILES: BigInt(0x8000),
    // READ_MESSAGE_HISTORY: BigInt(0x10000),
    // MENTION_EVERYONE: BigInt(0x20000),
    // USE_EXTERNAL_EMOJIS: BigInt(0x40000),
    // VIEW_GUILD_INSIGHTS: BigInt(0x80000),
    // CONNECT: BigInt(0x100000),
    // SPEAK: BigInt(0x200000),
    // MUTE_MEMBERS: BigInt(0x400000),
    // DEAFEN_MEMBERS: BigInt(0x800000),
    // MOVE_MEMBERS: BigInt(0x1000000),
    // USE_VAD: BigInt(0x2000000),
    // PRIORITY_SPEAKER: BigInt(0x100),
    // STREAM: BigInt(0x200),
    // CHANGE_NICKNAME: BigInt(0x4000000),
    // MANAGE_NICKNAMES: BigInt(0x8000000),
    MANAGE_ROLES: BigInt(0x10000000),
    // MANAGE_WEBHOOKS: BigInt(0x20000000),
    // MANAGE_EMOJIS: BigInt(0x40000000),
};

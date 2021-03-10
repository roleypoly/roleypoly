import { roleCategory } from '@roleypoly/design-system/fixtures/storyData';
import { Role } from 'roleypoly/common/types';
import { hasPermission, hasPermissionOrAdmin } from './hasPermission';

export const permissions = {
    KICK_MEMBERS: BigInt(0x2),
    BAN_MEMBERS: BigInt(0x4),
    ADMINISTRATOR: BigInt(0x8),
    SPEAK: BigInt(0x200000),
    CHANGE_NICKNAME: BigInt(0x4000000),
    MANAGE_ROLES: BigInt(0x10000000),
};

const roles: Role[] = [
    {
        ...roleCategory[0],
        permissions: String(permissions.ADMINISTRATOR),
    },
    {
        ...roleCategory[0],
        permissions: String(
            permissions.SPEAK | permissions.BAN_MEMBERS | permissions.CHANGE_NICKNAME
        ),
    },
    {
        ...roleCategory[0],
        permissions: String(permissions.BAN_MEMBERS),
    },
];

it('finds a permission within a list of roles', () => {
    const result = hasPermission(roles, permissions.CHANGE_NICKNAME);

    expect(result).toBe(true);
});

it('finds admin within a list of roles', () => {
    const result = hasPermissionOrAdmin(roles, permissions.BAN_MEMBERS);

    expect(result).toBe(true);
});

it('does not find a permission within a list of roles without one', () => {
    const result = hasPermission(roles, permissions.KICK_MEMBERS);

    expect(result).toBe(false);
});

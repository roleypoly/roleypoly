import { Role } from 'roleypoly/common/types';
import { guildRoles } from 'roleypoly/common/types/storyData';
import { hasPermission, hasPermissionOrAdmin, permissions } from './hasPermission';

const roles: Role[] = [
    {
        ...guildRoles.rolesList[0],
        permissions: permissions.ADMINISTRATOR,
    },
    {
        ...guildRoles.rolesList[0],
        permissions:
            permissions.SPEAK | permissions.BAN_MEMBERS | permissions.CHANGE_NICKNAME,
    },
    {
        ...guildRoles.rolesList[0],
        permissions: permissions.BAN_MEMBERS,
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

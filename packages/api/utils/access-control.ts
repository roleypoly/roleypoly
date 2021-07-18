import { isRoot } from '@roleypoly/api/utils/api-tools';
import {
  GuildAccessControl,
  GuildSlug,
  Member,
  UserGuildPermissions,
} from '@roleypoly/types';
import { xor } from 'lodash';

export const memberPassesAccessControl = (
  guildSlug: GuildSlug,
  member: Member,
  accessControl: GuildAccessControl
): boolean => {
  // Root has a bypass
  if (isRoot(member.user?.id || '')) {
    return true;
  }

  // Admin and Manager has a bypass
  if (guildSlug.permissionLevel !== UserGuildPermissions.User) {
    return true;
  }

  // Block pending members, "Welcome Screen" feature
  if (accessControl.blockPending && member.pending) {
    return false;
  }

  // If member has roles in the blockList, block.
  // Blocklist takes precedence over allowlist
  // We use xor because xor([1, 3], [2, 3]) returns [3]), e.g. present in both lists
  if (
    accessControl.blockList &&
    xor(member.roles, accessControl.blockList).length !== 0
  ) {
    return false;
  }

  // If there is an allowList, and the member is not in it, block.
  // If thew allowList is empty, we bypass this.
  if (
    accessControl.allowList &&
    xor(member.roles, accessControl.allowList).length === 0
  ) {
    return false;
  }

  return true;
};

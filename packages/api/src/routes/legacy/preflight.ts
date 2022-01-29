import { RoleypolyHandler } from '@roleypoly/api/src/utils/context';
import { notImplemented } from '@roleypoly/api/src/utils/response';

/**
 * Fetch setup from beta.roleypoly.com to show the admin.
 */
export const legacyPreflight: RoleypolyHandler = () => {
  return notImplemented();
};

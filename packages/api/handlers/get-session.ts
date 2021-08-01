import { SessionData } from '@roleypoly/types';
import { respond } from '@roleypoly/worker-utils';
import { withSession } from '../utils/api-tools';

export const GetSession = withSession((session?: SessionData) => (): Response => {
  const { user, guilds, sessionID } = session || {};

  return respond({
    user,
    guilds,
    sessionID,
  });
});

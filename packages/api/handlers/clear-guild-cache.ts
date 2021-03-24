import { UserGuildPermissions } from '@roleypoly/types';
import { isRoot, withSession } from '../utils/api-tools';
import { getGuild, GuildRateLimiterKey, useGuildRateLimiter } from '../utils/guild';
import {
  lowPermissions,
  missingParameters,
  notFound,
  ok,
  rateLimited,
} from '../utils/responses';

export const ClearGuildCache = withSession(
  (session) => async (request: Request): Promise<Response> => {
    const url = new URL(request.url);
    const [, , guildID] = url.pathname.split('/');
    if (!guildID) {
      return missingParameters();
    }

    const rateLimit = useGuildRateLimiter(
      guildID,
      GuildRateLimiterKey.cacheClear,
      60 * 5
    ); // 5 minute RL TTL, 288 times per day.

    if (!isRoot(session.user.id)) {
      const guild = session.guilds.find((guild) => guild.id === guildID);
      if (!guild) {
        return notFound();
      }

      if (
        guild?.permissionLevel !== UserGuildPermissions.Manager &&
        guild?.permissionLevel !== UserGuildPermissions.Admin
      ) {
        return lowPermissions();
      }

      if (await rateLimit()) {
        return rateLimited();
      }
    }

    const result = await getGuild(guildID, { skipCachePull: true });
    if (!result) {
      return notFound();
    }
    return ok();
  }
);

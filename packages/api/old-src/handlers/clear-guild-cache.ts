import { asEditor, getGuild, GuildRateLimiterKey } from '../utils/guild';
import { notFound, ok } from '../utils/responses';

export const ClearGuildCache = asEditor(
  {
    rateLimitKey: GuildRateLimiterKey.cacheClear,
    rateLimitTimeoutSeconds: 60 * 5,
  },
  (session, { guildID }) =>
    async (request: Request): Promise<Response> => {
      const result = await getGuild(guildID, { skipCachePull: true });
      if (!result) {
        return notFound();
      }

      return ok();
    }
);

import { asEditor, GuildRateLimiterKey } from '../utils/guild';
import { fetchLegacyServer, transformLegacyGuild } from '../utils/import-from-legacy';
import { GuildData } from '../utils/kv';
import { notFound, ok } from '../utils/responses';

export const SyncFromLegacy = asEditor(
  {
    rateLimitKey: GuildRateLimiterKey.legacyImport,
    rateLimitTimeoutSeconds: 60 * 20,
  },
  (session, { guildID }) =>
    async (request: Request): Promise<Response> => {
      const legacyGuild = await fetchLegacyServer(guildID);
      if (!legacyGuild) {
        return notFound();
      }

      const newGuildData = transformLegacyGuild(legacyGuild);
      await GuildData.put(guildID, newGuildData);

      return ok();
    }
);

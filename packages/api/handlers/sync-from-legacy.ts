import {
  Features,
  GuildData as GuildDataT,
  UserGuildPermissions,
} from '@roleypoly/types';
import { isRoot, withSession } from '../utils/api-tools';
import { GuildRateLimiterKey, useGuildRateLimiter } from '../utils/guild';
import { fetchLegacyServer, transformLegacyGuild } from '../utils/import-from-legacy';
import { GuildData } from '../utils/kv';
import {
  conflict,
  lowPermissions,
  missingParameters,
  notFound,
  ok,
  rateLimited,
} from '../utils/responses';

export const SyncFromLegacy = withSession(
  (session) =>
    async (request: Request): Promise<Response> => {
      const url = new URL(request.url);
      const [, , guildID] = url.pathname.split('/');
      if (!guildID) {
        return missingParameters();
      }

      const rateLimit = useGuildRateLimiter(
        guildID,
        GuildRateLimiterKey.legacyImport,
        60 * 20
      ); // 20 minute RL TTL, 72 times per day.

      // Allow root users to trigger this too, just in case.
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

      const shouldForce = url.searchParams.get('force') === 'yes';

      // Not using getGuildData as we want null feedback, not a zeroed out object.
      const checkGuild = await GuildData.get<GuildDataT>(guildID);
      // Don't force, and guild exists in our side, but LegacyGuild flag is set,
      // fail this request.
      if (
        !shouldForce &&
        checkGuild &&
        (checkGuild.features & Features.LegacyGuild) === Features.LegacyGuild
      ) {
        return conflict();
      }

      const legacyGuild = await fetchLegacyServer(guildID);
      if (!legacyGuild) {
        return notFound();
      }

      const newGuildData = transformLegacyGuild(legacyGuild);
      await GuildData.put(guildID, newGuildData);

      return ok();
    }
);

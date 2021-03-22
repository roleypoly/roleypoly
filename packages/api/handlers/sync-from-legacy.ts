import {
  Features,
  GuildData as GuildDataT,
  UserGuildPermissions,
} from '@roleypoly/types';
import { isRoot, respond, withSession } from '../utils/api-tools';
import { fetchLegacyServer, transformLegacyGuild } from '../utils/import-from-legacy';
import { GuildData } from '../utils/kv';

const noPermissions = () =>
  respond({ error: 'no permissions to this guild' }, { status: 403 });
const notFound = () => respond({ error: 'guild not found' }, { status: 404 });
const alreadyImported = () =>
  respond({ error: 'guild already imported' }, { status: 400 });

export const SyncFromLegacy = withSession(
  (session) => async (request: Request): Promise<Response> => {
    const url = new URL(request.url);
    const [, , guildID] = url.pathname.split('/');

    // Allow root users to trigger this too, just in case.
    if (!isRoot(session.user.id)) {
      const guild = session.guilds.find((guild) => guild.id === guildID);
      if (!guild) {
        return notFound();
      }

      if (
        guild?.permissionLevel !== UserGuildPermissions.Manager ||
        guild?.permissionLevel !== UserGuildPermissions.Admin
      ) {
        return noPermissions();
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
      return alreadyImported();
    }

    const legacyGuild = await fetchLegacyServer(guildID);
    if (!legacyGuild) {
      return notFound();
    }

    const newGuildData = transformLegacyGuild(legacyGuild);
    await GuildData.put(guildID, newGuildData);

    return respond({ ok: true });
  }
);

import { GuildDataUpdate, SessionData, UserGuildPermissions } from '@roleypoly/types';
import { withSession } from '../utils/api-tools';
import { getGuildData } from '../utils/guild';
import { GuildData } from '../utils/kv';
import { lowPermissions, missingParameters, notFound, ok } from '../utils/responses';

export const UpdateGuild = withSession(
  (session: SessionData) => async (request: Request): Promise<Response> => {
    const url = new URL(request.url);
    const [, , guildID] = url.pathname.split('/');
    if (!guildID) {
      return missingParameters();
    }

    const guildUpdate = (await request.json()) as GuildDataUpdate;

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

    const newGuildData = {
      ...(await getGuildData(guildID)),
      ...guildUpdate,
    };

    await GuildData.put(guildID, newGuildData);

    return ok();
  }
);

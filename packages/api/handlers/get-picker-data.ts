import { DiscordUser, GuildSlug, PresentableGuild, SessionData } from '@roleypoly/types';
import { respond, withSession } from '../utils/api-tools';
import { getGuild, getGuildData, getGuildMemberRoles } from '../utils/guild';

const fail = () => respond({ error: 'guild not found' }, { status: 404 });

export const GetPickerData = withSession(
  (session: SessionData) =>
    async (request: Request): Promise<Response> => {
      const url = new URL(request.url);
      const [, , guildID] = url.pathname.split('/');

      if (!guildID) {
        return respond({ error: 'missing guild id' }, { status: 400 });
      }

      const { id: userID } = session.user as DiscordUser;
      const guilds = session.guilds as GuildSlug[];

      // Save a Discord API request by checking if this user is a member by session first
      const checkGuild = guilds.find((guild) => guild.id === guildID);
      if (!checkGuild) {
        return fail();
      }

      const guild = await getGuild(guildID, {
        skipCachePull: url.searchParams.has('__no_cache'),
      });
      if (!guild) {
        return fail();
      }

      const memberRolesP = getGuildMemberRoles({
        serverID: guildID,
        userID,
      });

      const guildDataP = getGuildData(guildID);

      const [guildData, memberRoles] = await Promise.all([guildDataP, memberRolesP]);
      if (!memberRoles) {
        return fail();
      }

      const presentableGuild: PresentableGuild = {
        id: guildID,
        guild: checkGuild,
        roles: guild.roles,
        member: {
          roles: memberRoles,
        },
        data: guildData,
      };

      return respond(presentableGuild);
    }
);

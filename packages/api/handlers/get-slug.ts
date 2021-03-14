import { GuildSlug } from '@roleypoly/types';
import { respond } from '../utils/api-tools';
import { getGuild } from '../utils/guild';

export const GetSlug = async (request: Request): Promise<Response> => {
  const reqURL = new URL(request.url);
  const [, , serverID] = reqURL.pathname.split('/');

  if (!serverID) {
    return respond(
      {
        error: 'missing server ID',
      },
      {
        status: 400,
      }
    );
  }

  const guild = await getGuild(serverID);
  if (!guild) {
    return respond(
      {
        error: 'guild not found',
      },
      {
        status: 404,
      }
    );
  }

  const { id, name, icon } = guild;
  const guildSlug: GuildSlug = {
    id,
    name,
    icon,
    permissionLevel: 0,
  };
  return respond(guildSlug);
};

import { getGuild } from '@roleypoly/api/src/guilds/getters';
import { Context, RoleypolyHandler } from '@roleypoly/api/src/utils/context';
import { noContent } from '@roleypoly/api/src/utils/response';

export const guildsCacheDelete: RoleypolyHandler = async (
  request: Request,
  context: Context
) => {
  await getGuild(context.config, context.params.guildId!, true);

  return noContent();
};

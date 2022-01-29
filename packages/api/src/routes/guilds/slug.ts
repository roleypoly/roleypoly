import { getGuild } from '@roleypoly/api/src/guilds/getters';
import { Context, RoleypolyHandler } from '@roleypoly/api/src/utils/context';
import { json, notFound } from '@roleypoly/api/src/utils/response';
import { GuildSlug, UserGuildPermissions } from '@roleypoly/types';

export const guildsSlug: RoleypolyHandler = async (
  request: Request,
  context: Context
) => {
  const id = context.params.guildId!;
  const guild = await getGuild(context.config, id);
  if (!guild) {
    return notFound();
  }

  const slug: GuildSlug = {
    id,
    name: guild.name,
    icon: guild.icon,
    permissionLevel: UserGuildPermissions.User,
  };
  return json(slug);
};

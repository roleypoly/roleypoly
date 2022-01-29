import {
  getGuild,
  getGuildData,
  getGuildMember,
} from '@roleypoly/api/src/guilds/getters';
import { Context, RoleypolyHandler } from '@roleypoly/api/src/utils/context';
import { json, notFound } from '@roleypoly/api/src/utils/response';
import { PresentableGuild } from '@roleypoly/types';

export const guildsGuild: RoleypolyHandler = async (
  request: Request,
  context: Context
) => {
  const guild = await getGuild(context.config, context.params!.guildId!);

  if (!guild) {
    return notFound();
  }

  const member = await getGuildMember(
    context.config,
    context.params!.guildId!,
    context.session!.user.id
  );

  if (!member) {
    return notFound();
  }

  const data = await getGuildData(context.config, guild.id);
  const presentableGuild: PresentableGuild = {
    id: guild.id,
    guild: context.session?.guilds.find((g) => g.id === guild.id)!,
    roles: guild.roles,
    member: {
      roles: member.roles,
    },
    data,
  };

  return json(presentableGuild);
};

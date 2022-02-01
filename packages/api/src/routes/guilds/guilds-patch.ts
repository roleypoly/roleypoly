import { getGuildData } from '@roleypoly/api/src/guilds/getters';
import { Context, RoleypolyHandler } from '@roleypoly/api/src/utils/context';
import { invalid, json, notFound } from '@roleypoly/api/src/utils/response';
import { GuildData, GuildDataUpdate } from '@roleypoly/types';

export const guildsGuildPatch: RoleypolyHandler = async (
  request: Request,
  context: Context
) => {
  const id = context.params.guildId!;
  if (!request.body) {
    return invalid();
  }

  const update: GuildDataUpdate = await request.json();

  const oldGuildData = await getGuildData(context.config, id);
  if (!oldGuildData) {
    return notFound();
  }

  const newGuildData: GuildData = {
    ...oldGuildData,

    // TODO: validation
    message: update.message || oldGuildData.message,
    categories: update.categories || oldGuildData.categories,
    accessControl: update.accessControl || oldGuildData.accessControl,

    // TODO: audit log webhooks
    auditLogWebhook: oldGuildData.auditLogWebhook,
  };

  await context.config.kv.guildData.put(id, newGuildData);

  return json(newGuildData);
};

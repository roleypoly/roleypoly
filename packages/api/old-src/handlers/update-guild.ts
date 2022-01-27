import { sendAuditLog, validateAuditLogWebhook } from '@roleypoly/api/utils/audit-log';
import { GuildDataUpdate, WebhookValidationStatus } from '@roleypoly/types';
import { asEditor, getGuildData } from '../utils/guild';
import { GuildData } from '../utils/kv';
import { invalid, ok } from '../utils/responses';

export const UpdateGuild = asEditor(
  {},
  (session, { guildID, guild }) =>
    async (request: Request): Promise<Response> => {
      const guildUpdate = (await request.json()) as GuildDataUpdate;

      const oldGuildData = await getGuildData(guildID);
      const newGuildData = {
        ...oldGuildData,
        ...guildUpdate,
      };

      if (oldGuildData.auditLogWebhook !== newGuildData.auditLogWebhook) {
        try {
          const validationStatus = await validateAuditLogWebhook(
            guild,
            newGuildData.auditLogWebhook
          );

          if (validationStatus !== WebhookValidationStatus.Ok) {
            if (validationStatus === WebhookValidationStatus.NoneSet) {
              newGuildData.auditLogWebhook = null;
            } else {
              return invalid({
                what: 'webhookValidationStatus',
                webhookValidationStatus: validationStatus,
              });
            }
          }
        } catch (e) {
          invalid();
        }
      }

      await GuildData.put(guildID, newGuildData);

      try {
        await sendAuditLog(oldGuildData, guildUpdate, session.user);
      } catch (e) {
        // Catching errors here because this isn't a critical task, and could simply fail due to operator error.
      }

      return ok();
    }
);

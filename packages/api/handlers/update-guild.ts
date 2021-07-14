import { sendAuditLog, validateAuditLogWebhook } from '@roleypoly/api/utils/audit-log';
import {
  GuildDataUpdate,
  SessionData,
  UserGuildPermissions,
  WebhookValidationStatus,
} from '@roleypoly/types';
import { withSession } from '../utils/api-tools';
import { getGuildData } from '../utils/guild';
import { GuildData } from '../utils/kv';
import {
  invalid,
  lowPermissions,
  missingParameters,
  notFound,
  ok,
} from '../utils/responses';

export const UpdateGuild = withSession(
  (session: SessionData) =>
    async (request: Request): Promise<Response> => {
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

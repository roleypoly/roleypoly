import { Context, RoleypolyHandler } from '@roleypoly/api/src/utils/context';
import { AuthType, discordFetch } from '@roleypoly/api/src/utils/discord';
import { formDataRequest } from '@roleypoly/api/src/utils/request';
import { noContent } from '@roleypoly/api/src/utils/response';

export const authSessionDelete: RoleypolyHandler = async (
  request: Request,
  context: Context
) => {
  if (!context.session) {
    return noContent();
  }

  await discordFetch(
    '/oauth2/token/revoke',
    '',
    AuthType.None,
    formDataRequest({
      client_id: context.config.botClientID,
      client_secret: context.config.botClientSecret,
      token: context.session.tokens.access_token,
    })
  );

  await context.config.kv.sessions.delete(context.session.sessionID);
  return noContent();
};

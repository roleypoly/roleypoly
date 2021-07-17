import { SessionData } from '@roleypoly/types';
import { formData, respond, userAgent, withSession } from '../utils/api-tools';
import { botClientID, botClientSecret, discordAPIBase } from '../utils/config';
import { Sessions } from '../utils/kv';

export const RevokeSession = withSession(
  (session: SessionData) => async (request: Request) => {
    const tokenRequest = {
      token: session.tokens.access_token,
      client_id: botClientID,
      client_secret: botClientSecret,
    };

    await fetch(discordAPIBase + '/oauth2/token/revoke', {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'user-agent': userAgent,
      },
      body: formData(tokenRequest),
    });

    await Sessions.delete(session.sessionID);

    return respond({ ok: true });
  }
);

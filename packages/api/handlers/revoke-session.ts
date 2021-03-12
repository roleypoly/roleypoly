import { SessionData } from '../../../src/common/types';
import { formData, respond, userAgent, withSession } from '../utils/api-tools';
import { botClientID, botClientSecret } from '../utils/config';
import { Sessions } from '../utils/kv';

export const RevokeSession = withSession(
    (session: SessionData) => async (request: Request) => {
        const tokenRequest = {
            token: session.tokens.access_token,
            client_id: botClientID,
            client_secret: botClientSecret,
        };

        await fetch('https://discord.com/api/v8/oauth2/token/revoke', {
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

import { SessionData } from 'roleypoly/common/types';
import { getSessionID, respond } from '../utils/api-tools';
import { Sessions } from '../utils/kv';

const NotAuthenticated = (extra?: string) =>
    respond(
        {
            err: extra || 'not authenticated',
        },
        { status: 403 }
    );

export const GetSession = async (request: Request): Promise<Response> => {
    const sessionID = getSessionID(request);
    if (!sessionID) {
        return NotAuthenticated('missing auth header');
    }

    console.log(sessionID);

    const sessionData = await Sessions.get<SessionData>(sessionID.id);
    if (!sessionData) {
        return NotAuthenticated('session not found');
    }

    const { tokens, ...withoutTokens } = sessionData;

    return respond({
        ...withoutTokens,
    });
};

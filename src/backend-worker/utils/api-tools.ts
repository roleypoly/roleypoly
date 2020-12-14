import { SessionData, UserGuildPermissions } from '../../common/types';
import {
    evaluatePermission,
    permissions as Permissions,
} from '../../common/utils/hasPermission';
import { Handler } from '../router';
import { Sessions, WrappedKVNamespace } from './kv';

export const formData = (obj: Record<string, any>): string => {
    return Object.keys(obj)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&');
};

export const respond = (obj: Record<string, any>, init?: ResponseInit) =>
    new Response(JSON.stringify(obj), init);

export const resolveFailures = (
    handleWith: Response,
    handler: (request: Request) => Promise<Response> | Response
) => async (request: Request): Promise<Response> => {
    try {
        return handler(request);
    } catch (e) {
        console.error(e);
        return handleWith;
    }
};

export const parsePermissions = (
    permissions: number,
    owner: boolean = false
): UserGuildPermissions => {
    if (owner || evaluatePermission(permissions, Permissions.ADMINISTRATOR)) {
        return UserGuildPermissions.Admin;
    }

    if (evaluatePermission(permissions, Permissions.MANAGE_ROLES)) {
        return UserGuildPermissions.Manager;
    }

    return UserGuildPermissions.User;
};

export const getSessionID = (request: Request): { type: string; id: string } | null => {
    const sessionID = request.headers.get('authorization');
    if (!sessionID) {
        return null;
    }

    const [type, id] = sessionID.split(' ');
    if (type !== 'Bearer') {
        return null;
    }

    return { type, id };
};

export const discordFetch = async <T>(
    url: string,
    auth: string,
    authType: 'Bearer' | 'Bot' = 'Bearer'
): Promise<T> => {
    const response = await fetch('https://discord.com/api/v8' + url, {
        headers: {
            authorization: `${authType} ${auth}`,
            'user-agent':
                'DiscordBot (https://github.com/roleypoly/roleypoly, git-main) (+https://roleypoly.com)',
        },
    });

    return (await response.json()) as T;
};

export const cacheLayer = <Identity, Data>(
    kv: WrappedKVNamespace,
    keyFactory: (identity: Identity) => string,
    missHandler: (identity: Identity) => Promise<Data | null>,
    ttlSeconds?: number
) => async (identity: Identity): Promise<Data | null> => {
    const key = keyFactory(identity);

    const value = await kv.get<Data>(key);
    if (value) {
        return value;
    }

    const fallbackValue = await missHandler(identity);

    if (!fallbackValue) {
        return null;
    }

    await kv.put(key, fallbackValue, ttlSeconds);

    return fallbackValue;
};

const NotAuthenticated = (extra?: string) =>
    respond(
        {
            err: extra || 'not authenticated',
        },
        { status: 403 }
    );

type WithSessionOpts = {
    mustAuthenticate?: boolean;
};

export const withSession = (
    wrappedHandler: (session?: SessionData) => Handler,
    { mustAuthenticate }: WithSessionOpts = {}
): Handler => async (request: Request): Promise<Response> => {
    const sessionID = getSessionID(request);
    if (!sessionID) {
        if (mustAuthenticate) {
            return NotAuthenticated('missing authentication');
        } else {
            return await wrappedHandler(undefined)(request);
        }
    }

    const session = await Sessions.get<SessionData>(sessionID.id);
    if (!session) {
        if (mustAuthenticate) {
            return NotAuthenticated('authentication expired or not found');
        } else {
            return await wrappedHandler(undefined)(request);
        }
    }

    return await wrappedHandler(session)(request);
};

export const mustBeAuthenticated = (handler: Handler) =>
    withSession(() => handler, { mustAuthenticate: true });

import { UserGuildPermissions } from '../../common/types';
import {
    evaluatePermission,
    permissions as Permissions,
} from '../../common/utils/hasPermission';

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

import KSUID from 'ksuid';
import {
    AuthTokenResponse,
    DiscordUser,
    GuildSlug,
    SessionData,
} from '../../common/types';
import { formData, parsePermissions, resolveFailures } from '../utils/api-tools';
import { Bounce } from '../utils/bounce';
import { apiPublicURI, botClientID, botClientSecret, uiPublicURI } from '../utils/config';
import { Sessions } from '../utils/kv';

const AuthErrorResponse = (extra?: string) =>
    Bounce(
        uiPublicURI +
            `/machinery/error?error_code=authFailure${extra ? `&extra=${extra}` : ''}`
    );

export const LoginCallback = resolveFailures(
    AuthErrorResponse(),
    async (request: Request): Promise<Response> => {
        const query = new URL(request.url).searchParams;

        const stateValue = query.get('state');

        if (stateValue === null) {
            return AuthErrorResponse('state missing');
        }

        try {
            const state = KSUID.parse(stateValue);
            const stateExpiry = state.date.getTime() + 1000 * 60 * 5;
            const currentTime = Date.now();

            if (currentTime > stateExpiry) {
                return AuthErrorResponse('state expired');
            }
        } catch (e) {
            return AuthErrorResponse('state invalid');
        }

        const code = query.get('code');
        if (!code) {
            return AuthErrorResponse('code missing');
        }

        const tokenRequest = {
            client_id: botClientID,
            client_secret: botClientSecret,
            grant_type: 'authorization_code',
            redirect_uri: apiPublicURI + '/login-callback',
            scope: 'identify guilds',
            code,
        };

        const tokenFetch = await fetch('https://discord.com/api/v8/oauth2/token', {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
            },
            body: formData(tokenRequest),
        });

        const tokens = (await tokenFetch.json()) as AuthTokenResponse;

        if (!tokens.access_token) {
            console.info({ tokens });
            return AuthErrorResponse('token response invalid');
        }

        const [sessionID, user, guilds] = await Promise.all([
            KSUID.random(),
            getUser(tokens.access_token),
            getGuilds(tokens.access_token),
        ]);

        const sessionData: SessionData = {
            tokens,
            sessionID: sessionID.string,
            user,
            guilds,
        };

        await Sessions.put(sessionID.string, sessionData, 60 * 60 * 6);

        return Bounce(
            uiPublicURI + '/machinery/new-session?session_id=' + sessionID.string
        );
    }
);

const discordFetch = async <T>(url: string, auth: string): Promise<T> => {
    const response = await fetch('https://discord.com/api/v8' + url, {
        headers: {
            authorization: 'Bearer ' + auth,
        },
    });

    return (await response.json()) as T;
};

const getUser = async (accessToken: string): Promise<DiscordUser> => {
    const { id, username, discriminator, bot, avatar } = await discordFetch<DiscordUser>(
        '/users/@me',
        accessToken
    );

    return { id, username, discriminator, bot, avatar };
};

type UserGuildsPayload = {
    id: string;
    name: string;
    icon: string;
    owner: boolean;
    permissions: number;
    features: string[];
}[];

const getGuilds = async (accessToken: string) => {
    const guilds = await discordFetch<UserGuildsPayload>(
        '/users/@me/guilds',
        accessToken
    );

    const guildSlugs = guilds.map<GuildSlug>((guild) => ({
        id: guild.id,
        name: guild.name,
        icon: guild.icon,
        permissionLevel: parsePermissions(guild.permissions, guild.owner),
    }));

    return guildSlugs;
};
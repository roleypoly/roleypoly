import { GuildSlug } from './Guild';
import { DiscordUser } from './User';

export type AuthTokenResponse = {
    access_token: string;
    token_type: 'Bearer';
    expires_in: number;
    refresh_token: string;
    scope: string;
};

export type SessionData = {
    /** sessionID is a KSUID */
    sessionID: string;
    tokens: AuthTokenResponse;
    user: DiscordUser;
    guilds: GuildSlug[];
};

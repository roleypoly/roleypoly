import { v4 as uuidv4 } from 'uuid';
import { Bounce } from '../utils/bounce';

type URLParams = {
    clientID: string;
    redirectURI: string;
    state: string;
};

const buildURL = (params: URLParams) =>
    `https://discord.com/api/oauth2/authorize?client_id=${
        params.clientID
    }&response_type=code&scope=identify%20guilds&redirect_uri=${encodeURIComponent(
        params.redirectURI
    )}&state=${params.state}`;

export const LoginBounce = (request: Request): Response => {
    const state = uuidv4();
    const redirectURI = `${API_PUBLIC_URI}/login-callback`;
    const clientID = BOT_CLIENT_ID;

    return Bounce(buildURL({ state, redirectURI, clientID }));
};

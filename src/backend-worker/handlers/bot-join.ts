import { Bounce } from '../utils/bounce';

const validGuildID = /^[0-9]+$/;

type URLParams = {
    clientID: string;
    permissions: number;
    guildID?: string;
};

const buildURL = (params: URLParams) => {
    let url = `https://discord.com/api/oauth2/authorize?client_id=${params.clientID}&scope=bot&permissions=${params.permissions}`;

    if (params.guildID) {
        url += `&guild_id=${params.guildID}&disable_guild_select=true`;
    }

    return url;
};

export const BotJoin = (request: Request): Response => {
    let guildID = new URL(request.url).searchParams.get('guild') || '';

    if (guildID && !validGuildID.test(guildID)) {
        guildID = '';
    }

    return Bounce(
        buildURL({
            clientID: BOT_CLIENT_ID,
            permissions: 268435456,
            guildID,
        })
    );
};

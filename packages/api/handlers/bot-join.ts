import { Bounce } from '../utils/bounce';
import { botClientID } from '../utils/config';

const validGuildID = /^[0-9]+$/;

type URLParams = {
  clientID: string;
  permissions: number;
  guildID?: string;
  scopes: string[];
};

const buildURL = (params: URLParams) => {
  let url = `https://discord.com/api/oauth2/authorize?client_id=${
    params.clientID
  }&scope=${params.scopes.join('%20')}&permissions=${params.permissions}`;

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
      clientID: botClientID,
      permissions: 268435456,
      guildID,
      scopes: ['bot', 'applications.commands'],
    })
  );
};

import { StateSession } from '@roleypoly/types';
import { getQuery } from '@roleypoly/worker-utils';
import { isAllowedCallbackHost, setupStateSession } from '../utils/api-tools';
import { Bounce } from '../utils/bounce';
import { apiPublicURI, botClientID } from '../utils/config';

type URLParams = {
  clientID: string;
  redirectURI: string;
  state: string;
};

const buildURL = (params: URLParams) =>
  `https://discord.com/api/oauth2/authorize?client_id=${
    params.clientID
  }&response_type=code&scope=identify%20guilds&prompt=none&redirect_uri=${encodeURIComponent(
    params.redirectURI
  )}&state=${params.state}`;

export const LoginBounce = async (request: Request): Promise<Response> => {
  const stateSessionData: StateSession = {};

  const { cbh: callbackHost } = getQuery(request);
  if (callbackHost && isAllowedCallbackHost(callbackHost)) {
    stateSessionData.callbackHost = callbackHost;
  }

  const state = await setupStateSession(stateSessionData);

  const redirectURI = `${apiPublicURI}/login-callback`;
  const clientID = botClientID;

  return Bounce(buildURL({ state, redirectURI, clientID }));
};

import { Config } from '@roleypoly/api/src/config';
import { setupStateSession } from '@roleypoly/api/src/sessions/state';
import { getQuery } from '@roleypoly/api/src/utils/request';
import { seeOther } from '@roleypoly/api/src/utils/response';
import { StateSession } from '@roleypoly/types';

type URLParams = {
  clientID: string;
  redirectURI: string;
  state: string;
};

export const buildURL = (params: URLParams) =>
  `https://discord.com/api/oauth2/authorize?client_id=${
    params.clientID
  }&response_type=code&scope=identify%20guilds&prompt=none&redirect_uri=${encodeURIComponent(
    params.redirectURI
  )}&state=${params.state}`;

export const isAllowedCallbackHost = (config: Config, host: string): boolean => {
  return (
    host === config.apiPublicURI ||
    config.allowedCallbackHosts.includes(host) ||
    config.allowedCallbackHosts
      .filter((callbackHost) => callbackHost.includes('*'))
      .find((wildcard) => new RegExp(wildcard.replace('*', '[a-z0-9-]+')).test(host)) !==
      null
  );
};

export const authBounce = async (request: Request, config: Config) => {
  const stateSessionData: StateSession = {};

  const { cbh: callbackHost } = getQuery(request);
  if (callbackHost && isAllowedCallbackHost(config, callbackHost)) {
    stateSessionData.callbackHost = callbackHost;
  }

  const state = await setupStateSession(config.kv.sessions, stateSessionData);

  const redirectURI = `${config.apiPublicURI}/login-callback`;
  const clientID = config.botClientID;

  return seeOther(buildURL({ state, redirectURI, clientID }));
};

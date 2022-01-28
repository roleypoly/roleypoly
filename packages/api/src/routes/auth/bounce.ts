import { setupStateSession } from '@roleypoly/api/src/sessions/state';
import { Config } from '@roleypoly/api/src/utils/config';
import { Context } from '@roleypoly/api/src/utils/context';
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

const hostMatch = (a: string, b: string): boolean => {
  const aURL = new URL(a);
  const bURL = new URL(b);

  return aURL.host === bURL.host && aURL.protocol === bURL.protocol;
};

const wildcardMatch = (wildcard: string, host: string): boolean => {
  const aURL = new URL(wildcard);
  const bURL = new URL(host);

  const regex = new RegExp(aURL.hostname.replace('*', '[a-z0-9-]+'));
  return regex.test(bURL.hostname);
};

export const isAllowedCallbackHost = (config: Config, host: string): boolean => {
  return (
    hostMatch(host, config.apiPublicURI) ||
    config.allowedCallbackHosts.some((allowedHost) =>
      allowedHost.includes('*')
        ? wildcardMatch(allowedHost, host)
        : hostMatch(allowedHost, host)
    )
  );
};

export const authBounce = async (request: Request, { config }: Context) => {
  const stateSessionData: StateSession = {};

  const { cbh: callbackHost } = getQuery(request);
  if (callbackHost && isAllowedCallbackHost(config, callbackHost)) {
    stateSessionData.callbackHost = callbackHost;
  }

  const state = await setupStateSession(config, stateSessionData);

  const redirectURI = `${config.apiPublicURI}/auth/callback`;
  const clientID = config.botClientID;

  return seeOther(buildURL({ state, redirectURI, clientID }));
};

import { Config } from '@roleypoly/api/src/config';
import { isAllowedCallbackHost } from '@roleypoly/api/src/routes/auth/bounce';
import { getStateSession } from '@roleypoly/api/src/sessions/state';
import { getQuery, seeOther } from '@roleypoly/api/src/utils';
import { AuthType, discordAPIBase, discordFetch } from '@roleypoly/api/src/utils/discord';
import { formData } from '@roleypoly/api/src/utils/request';
import { AuthTokenResponse, StateSession } from '@roleypoly/types';
import { decodeTime, monotonicFactory } from 'ulid-workers';
const ulid = monotonicFactory();

const authFailure = (uiPublicURI: string, extra?: string) =>
  seeOther(
    uiPublicURI +
      `/machinery/error?error_code=authFailure${extra ? `&extra=${extra}` : ''}`
  );

export const authCallback = async (request: Request, config: Config) => {
  let bounceBaseUrl = config.uiPublicURI;

  const { state: stateValue, code } = getQuery(request);

  if (stateValue === null) {
    return authFailure('state missing');
  }

  try {
    const stateTime = decodeTime(stateValue);
    const stateExpiry = stateTime + 1000 * 60 * 5;
    const currentTime = Date.now();

    if (currentTime > stateExpiry) {
      return authFailure('state expired');
    }

    const stateSession = await getStateSession<StateSession>(
      config.kv.sessions,
      stateValue
    );
    if (
      stateSession?.callbackHost &&
      isAllowedCallbackHost(config, stateSession.callbackHost)
    ) {
      bounceBaseUrl = stateSession.callbackHost;
    }
  } catch (e) {
    return authFailure('state invalid');
  }

  if (!code) {
    return authFailure('code missing');
  }

  const response = await discordFetch<AuthTokenResponse>(
    `${discordAPIBase}/oauth2/token`,
    '',
    AuthType.None,
    {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: formData({
        client_id: config.botClientID,
        client_secret: config.botClientSecret,
        grant_type: 'authorization_code',
        code,
        redirect_uri: config.apiPublicURI + '/auth/callback',
      }),
    }
  );

  if (!response) {
    return authFailure('code auth failure');
  }
};

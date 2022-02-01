import { isAllowedCallbackHost } from '@roleypoly/api/src/routes/auth/bounce';
import { createSession } from '@roleypoly/api/src/sessions/create';
import { getStateSession } from '@roleypoly/api/src/sessions/state';
import { Context, RoleypolyHandler } from '@roleypoly/api/src/utils/context';
import { AuthType, discordFetch } from '@roleypoly/api/src/utils/discord';
import { dateFromID } from '@roleypoly/api/src/utils/id';
import { formDataRequest, getQuery } from '@roleypoly/api/src/utils/request';
import { seeOther } from '@roleypoly/api/src/utils/response';
import { AuthTokenResponse, StateSession } from '@roleypoly/types';

const authFailure = (uiPublicURI: string, extra?: string) =>
  seeOther(uiPublicURI + `/error/authFailure${extra ? `?extra=${extra}` : ''}`);

export const authCallback: RoleypolyHandler = async (
  request: Request,
  { config }: Context
) => {
  let bounceBaseUrl = config.uiPublicURI;

  const { state: stateValue, code } = getQuery(request);

  if (stateValue === null) {
    return authFailure('state missing');
  }

  try {
    const stateTime = dateFromID(stateValue);
    const stateExpiry = stateTime + 1000 * config.retention.session;
    const currentTime = Date.now();

    if (currentTime > stateExpiry) {
      return authFailure('state expired');
    }

    const stateSession = await getStateSession<StateSession>(config, stateValue);
    if (
      stateSession?.callbackHost &&
      isAllowedCallbackHost(config, stateSession.callbackHost)
    ) {
      bounceBaseUrl = stateSession.callbackHost;
    }
  } catch (e) {
    return authFailure(config.uiPublicURI, 'state invalid');
  }

  if (!code) {
    return authFailure(config.uiPublicURI, 'code missing');
  }

  const response = await discordFetch<AuthTokenResponse>(
    `/oauth2/token`,
    '',
    AuthType.None,
    formDataRequest({
      client_id: config.botClientID,
      client_secret: config.botClientSecret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: config.apiPublicURI + '/auth/callback',
    })
  );

  if (!response) {
    return authFailure(config.uiPublicURI, 'code auth failure');
  }

  const session = await createSession(config, response);
  if (!session) {
    return authFailure(config.uiPublicURI, 'session setup failure');
  }

  return seeOther(bounceBaseUrl + 'machinery/new-session/#/' + session.sessionID);
};

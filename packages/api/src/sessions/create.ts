import { Config } from '@roleypoly/api/src/utils/config';
import { getTokenGuilds, getTokenUser } from '@roleypoly/api/src/utils/discord';
import { getID } from '@roleypoly/api/src/utils/id';
import { AuthTokenResponse, SessionData } from '@roleypoly/types';

export const createSession = async (
  config: Config,
  tokens: AuthTokenResponse
): Promise<SessionData | null> => {
  const [user, guilds] = await Promise.all([
    getTokenUser(tokens.access_token),
    getTokenGuilds(tokens.access_token),
  ]);

  if (!user) {
    return null;
  }

  const sessionID = getID();

  const session: SessionData = {
    sessionID,
    user,
    guilds,
    tokens,
  };

  await config.kv.sessions.put(sessionID, session, config.retention.session);

  return session;
};

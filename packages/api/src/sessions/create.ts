import { Config } from '@roleypoly/api/src/config';
import { getTokenGuilds, getTokenUser } from '@roleypoly/api/src/utils/discord';
import { AuthTokenResponse, SessionData } from '@roleypoly/types';
import { monotonicFactory } from 'ulid-workers';
const ulid = monotonicFactory();

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

  const sessionID = ulid();

  const session: SessionData = {
    sessionID,
    user,
    guilds,
    tokens,
  };

  await config.kv.sessions.put(sessionID, session, config.retention.session);

  return session;
};

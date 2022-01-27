import { SessionData, SessionFlags } from '@roleypoly/types';

export const getSessionFlags = async (session: SessionData): Promise<SessionFlags> => {
  return SessionFlags.None;
};

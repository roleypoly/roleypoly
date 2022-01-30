import { SessionData } from '@roleypoly/types';
import * as React from 'react';
import { useApiContext } from '../api/ApiContext';

enum SessionState {
  NoAuth,
  HalfAuth,
  FullAuth,
}

type SavedSession = {
  sessionID: SessionData['sessionID'];

  session: {
    user: SessionData['user'];
    guilds: SessionData['guilds'];
  };
};

type SessionContextT = {
  setupSession: (sessionID: string) => void;
  authedFetch: (url: string, opts?: RequestInit) => Promise<Response>;
  isAuthenticated: boolean;
  sessionState: SessionState;
  sessionID?: SessionData['sessionID'];
  session: {
    user?: SessionData['user'];
    guilds?: SessionData['guilds'];
  };
};

const SessionContext = React.createContext<SessionContextT>({
  sessionState: SessionState.NoAuth,
  sessionID: undefined,
  isAuthenticated: false,
  session: {
    user: undefined,
    guilds: undefined,
  },
  setupSession: () => {},
  authedFetch: async () => {
    return new Response();
  },
});

export const useSessionContext = () => React.useContext(SessionContext);

export const SessionContextProvider = (props: { children: React.ReactNode }) => {
  const { fetch } = useApiContext();
  const [sessionID, setSessionID] =
    React.useState<SessionContextT['sessionID']>(undefined);
  const [sessionState, setSessionState] = React.useState<SessionState>(
    SessionState.NoAuth
  );
  const [session, setSession] = React.useState<SessionContextT['session']>({
    user: undefined,
    guilds: undefined,
  });
  const [lock, setLock] = React.useState(false);

  // Possible flows:
  /* 
    if no key, check if key available in LS

    No session:
      no key
      isAuth = false
    
    Half session:
      have key
      lock = true
      isAuth = false
      fetch cached in SS _OR_ syncSession()
      lock = false

    Full session
      have session
      isAuth = true
  */

  const sessionContextValue: SessionContextT = {
    sessionID,
    session,
    sessionState,
    isAuthenticated: sessionState === SessionState.FullAuth,
    setupSession: async (newID: string) => {
      setSessionID(newID);
      setSessionState(SessionState.HalfAuth);
      saveSessionKey(newID);
    },
    authedFetch: async (url: string, init?: RequestInit): Promise<Response> => {
      if (sessionID) {
        init = {
          ...init,
          headers: {
            ...init?.headers,
            authorization: `Bearer ${sessionID}`,
          },
        };
      }

      return fetch(url, init);
    },
  };

  const { setupSession, authedFetch } = sessionContextValue;

  // Local storage sync on NoAuth
  React.useEffect(() => {
    if (!sessionID) {
      const storedKey = getSessionKey();
      if (!storedKey) {
        return;
      }

      setupSession(storedKey);
    }
  }, [sessionID, setupSession]);

  // Sync session data on HalfAuth
  React.useEffect(() => {
    if (lock) {
      console.warn('hit syncSession lock');
      return;
    }

    if (sessionState === SessionState.HalfAuth) {
      setLock(true);

      // Use cached session
      const storedData = getSessionData();
      if (storedData && storedData?.sessionID === sessionID) {
        setSession(storedData.session);
        setSessionState(SessionState.FullAuth);
        setLock(false);
        return;
      }

      // If no cached session, let's grab it from server
      const syncSession = async () => {
        try {
          const serverSession = await fetchSession(authedFetch);
          if (!serverSession) {
            // Not found, lets reset.
            deleteSessionKey();
            setSessionID(undefined);
            setSessionState(SessionState.NoAuth);
            setLock(false);
            return;
          }

          const newSession = {
            user: serverSession.user,
            guilds: serverSession.guilds,
          };

          saveSessionData({ sessionID: sessionID || '', session: newSession });
          setSession(newSession);
          setSessionState(SessionState.FullAuth);
          setLock(false);
        } catch (e) {
          console.error('syncSession failed', e);
          deleteSessionKey();
          setTimeout(() => setLock(false), 1000); // Unlock after 1s to prevent loop flood
        }
      };

      syncSession();
    }
  }, [sessionState, sessionID, authedFetch, lock]);

  return (
    <SessionContext.Provider value={sessionContextValue}>
      {props.children}
    </SessionContext.Provider>
  );
};

const saveSessionKey = (key: string) => localStorage.setItem('rp_session_key', key);
const deleteSessionKey = () => localStorage.removeItem('rp_session_key');
const getSessionKey = () => localStorage.getItem('rp_session_key');

type ServerSession = Omit<Omit<SessionData, 'tokens'>, 'flags'>;
const fetchSession = async (
  authedFetch: SessionContextT['authedFetch']
): Promise<ServerSession | null> => {
  const sessionResponse = await authedFetch('/auth/session');
  if (sessionResponse.status !== 200) {
    return null;
  }

  const { sessionID, guilds, user }: ServerSession = await sessionResponse.json();
  return {
    sessionID,
    guilds,
    user,
  };
};

const saveSessionData = (data: SavedSession) =>
  sessionStorage.setItem('rp_session_data', JSON.stringify(data));
const getSessionData = (): SavedSession | null =>
  JSON.parse(sessionStorage.getItem('rp_session_data') || 'null');

import { SessionData } from '@roleypoly/types';
import * as React from 'react';
import { useApiContext } from '../api/ApiContext';

type SavedSession = {
  sessionID: SessionData['sessionID'];

  session: {
    user: SessionData['user'];
    guilds: SessionData['guilds'];
  };
};

type SessionContextT = {
  setupSession: (sessionID: string | null) => void;
  isAuthenticated: boolean;
  sessionID?: SessionData['sessionID'];
  session: {
    user?: SessionData['user'];
    guilds?: SessionData['guilds'];
  };
};

const SessionContext = React.createContext<SessionContextT>({
  sessionID: undefined,
  session: {
    user: undefined,
    guilds: undefined,
  },
  isAuthenticated: false,
  setupSession: () => {},
});

const debounce = (func: Function, timeout = 300) => {
  let timer: any | undefined = undefined;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

export const useSessionContext = () => React.useContext(SessionContext);

export const SessionContextProvider = (props: { children: React.ReactNode }) => {
  const { fetch } = useApiContext();
  const [locked, setLock] = React.useState(false);
  const [session, setSession] = React.useState<SessionContextT>({
    sessionID: undefined,
    session: {
      user: undefined,
      guilds: undefined,
    },
    isAuthenticated: false,
    setupSession: (key: string | null) => {
      if (key) {
        saveSessionKey(key);
        setSession({
          ...session,
          sessionID: key,
        });
      } else {
        deleteSessionKey();
        deleteSessionData();
        setSession({
          ...session,
          sessionID: undefined,
          isAuthenticated: false,
        });
      }
    },
  });

  React.useEffect(() => {
    const fetchSession = async (sessionID: string): Promise<ServerSession | null> => {
      const sessionResponse = await fetch('/auth/session', {
        headers: {
          Authorization: `Bearer ${sessionID}`,
        },
      });
      if (sessionResponse.status !== 200) {
        return null;
      }

      const { guilds, user }: ServerSession = await sessionResponse.json();
      return {
        sessionID,
        guilds,
        user,
      };
    };

    if (locked) {
      console.warn('Session locked, skipping update');
      return;
    }
    if (!session.sessionID) {
      const sessionKey = getSessionKey();
      if (sessionKey) {
        session.setupSession(sessionKey);
      }
    }

    if (session.sessionID && !session.session.user) {
      // Lets see if session is in session storage...
      const sessionData = getSessionData();
      if (sessionData) {
        setSession({
          ...session,
          isAuthenticated: true,
          session: {
            user: sessionData.session.user,
            guilds: sessionData.session.guilds,
          },
        });
      }

      // If not, lets fetch it from the server
      setLock(true);
      debounce(async (sessionID: string) => {
        fetchSession(sessionID)
          .then((sessionData) => {
            if (sessionData) {
              setSession({
                ...session,
                isAuthenticated: true,
                session: {
                  user: sessionData.user,
                  guilds: sessionData.guilds,
                },
              });
              saveSessionData({
                sessionID: session.sessionID!,
                session: {
                  user: sessionData.user,
                  guilds: sessionData.guilds,
                },
              });
            } else {
              session.setupSession(null);
              setLock(false);
            }
          })
          .catch((e) => {
            console.error(e);
            session.setupSession(null);
            setLock(false);
          });
      }, 2000)(session.sessionID!);
    }
  }, [session, locked, setLock, fetch]);

  return (
    <SessionContext.Provider value={session}>{props.children}</SessionContext.Provider>
  );
};

const saveSessionKey = (key: string) => localStorage.setItem('rp_session_key', key);
const deleteSessionKey = () => localStorage.removeItem('rp_session_key');
const getSessionKey = () => localStorage.getItem('rp_session_key');

type ServerSession = Omit<Omit<SessionData, 'tokens'>, 'flags'>;

const saveSessionData = (data: SavedSession) =>
  sessionStorage.setItem('rp_session_data', JSON.stringify(data));
const getSessionData = (): SavedSession | null =>
  JSON.parse(sessionStorage.getItem('rp_session_data') || 'null');
const deleteSessionData = () => localStorage.removeItem('rp_session_data');

import { SessionData } from '@roleypoly/types';
import * as React from 'react';
import { useApiContext } from '../api-context/ApiContext';

type SessionContextT = {
    session?: Omit<Partial<SessionData>, 'tokens'>;
    setSession: (session?: SessionContextT['session']) => void;
    authedFetch: (url: string, opts?: RequestInit) => Promise<Response>;
};

const SessionContext = React.createContext<SessionContextT>({
    setSession: () => {},
    authedFetch: async () => {
        return new Response();
    },
});

export const useSessionContext = () => React.useContext(SessionContext);

export const SessionContextProvider = (props: { children: React.ReactNode }) => {
    const api = useApiContext();
    const [session, setSession] = React.useState<SessionContextT['session']>(undefined);

    const sessionContextValue: SessionContextT = React.useMemo(
        () => ({
            session,
            setSession,
            authedFetch: (url: string, opts?: RequestInit) => {
                return api.fetch(url, {
                    ...opts,
                    headers: {
                        ...opts?.headers,
                        authorization: session?.sessionID
                            ? `Bearer ${session?.sessionID}`
                            : undefined,
                    },
                });
            },
        }),
        [session, api]
    );

    React.useEffect(() => {
        // No session is set, do we have one available?
        if (!sessionContextValue.session || !sessionContextValue.session.sessionID) {
            // We may have the full state in session storage...
            const storedSessionData = sessionStorage.getItem('rp_session_data');
            if (storedSessionData) {
                try {
                    setSession(JSON.parse(storedSessionData));
                    return;
                } catch (e) {
                    // Oops, this data is wrong.
                }
            }

            // But if not, we have the key, maybe?
            const storedSessionID = localStorage.getItem('rp_session_key');
            if (storedSessionID && storedSessionID !== '') {
                setSession({ sessionID: storedSessionID });
                return;
            }

            // If we hit here, we're definitely not authenticated.
            return;
        }

        // If a session is set and it's not stored, set it now.
        if (
            localStorage.getItem('rp_session_key') !==
            sessionContextValue.session.sessionID
        ) {
            localStorage.setItem(
                'rp_session_key',
                sessionContextValue.session.sessionID || ''
            );
        }

        // Session is set, but we don't have data. Server sup?
        if (sessionContextValue.session.sessionID && !sessionContextValue.session.user) {
            const syncSession = async () => {
                const response = await sessionContextValue.authedFetch('/get-session');
                if (response.status !== 200) {
                    console.error('get-session failed', { response });
                    clearSessionData();
                    return;
                }

                const serverSession: SessionContextT['session'] = await response.json();

                setSession(serverSession);
                sessionStorage.setItem('rp_session_data', JSON.stringify(serverSession));
            };

            syncSession();
        }
    }, [
        sessionContextValue.session?.user,
        sessionContextValue.session?.sessionID,
        sessionContextValue,
    ]);

    return (
        <SessionContext.Provider value={sessionContextValue}>
            {props.children}
        </SessionContext.Provider>
    );
};

const clearSessionData = () => {
    sessionStorage.removeItem('rp_session_data');
    localStorage.removeItem('rp_session_key');
};

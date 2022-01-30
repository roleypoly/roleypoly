import React from 'react';
import { useApiContext } from '../api/ApiContext';
import { useSessionContext } from './SessionContext';

type AuthedFetchContextT = {
  authedFetch: (url: string, options?: RequestInit) => Promise<Response>;
};

export const AuthedFetchContext = React.createContext<AuthedFetchContextT>({
  authedFetch: () => Promise.reject(new Error('AuthedFetchContext not initialized')),
});

export const useAuthedFetch = () => React.useContext(AuthedFetchContext);

export const AuthedFetchProvider = (props: { children: React.ReactNode }) => {
  const { fetch } = useApiContext();
  const { sessionID } = useSessionContext();

  const authedFetch = (url: string, options?: RequestInit) => {
    return fetch(url, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: sessionID ? `Bearer ${sessionID}` : undefined,
      },
    });
  };

  return (
    <AuthedFetchContext.Provider value={{ authedFetch }}>
      {props.children}
    </AuthedFetchContext.Provider>
  );
};

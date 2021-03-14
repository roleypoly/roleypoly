import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter } from './app-router/AppRouter';
import { ApiContextProvider } from './contexts/api/ApiContext';
import { AppShellPropsProvider } from './contexts/app-shell/AppShellContext';
import { RecentGuildsProvider } from './contexts/recent-guilds/RecentGuildsContext';
import { SessionContextProvider } from './contexts/session/SessionContext';

const ProviderProvider = (props: {
  providerChain: typeof ApiContextProvider[];
  children: React.ReactNode;
}) => {
  return props.providerChain.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    <>{props.children}</>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ProviderProvider
      providerChain={[
        ApiContextProvider,
        SessionContextProvider,
        RecentGuildsProvider,
        AppShellPropsProvider,
      ]}
    >
      <AppRouter />
    </ProviderProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

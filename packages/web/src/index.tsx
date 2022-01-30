import { BreakpointsProvider } from '@roleypoly/design-system/atoms/breakpoints';
import React from 'react';
import ReactDOM from 'react-dom';
import { AppRouter } from './app-router/AppRouter';
import { ApiContextProvider } from './contexts/api/ApiContext';
import { AppShellPropsProvider } from './contexts/app-shell/AppShellContext';
import { GuildProvider } from './contexts/guild/GuildContext';
import { RecentGuildsProvider } from './contexts/recent-guilds/RecentGuildsContext';
import { AuthedFetchProvider } from './contexts/session/AuthedFetchContext';
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
        AuthedFetchProvider,
        RecentGuildsProvider,
        AppShellPropsProvider,
        BreakpointsProvider,
        GuildProvider,
      ]}
    >
      <AppRouter />
    </ProviderProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

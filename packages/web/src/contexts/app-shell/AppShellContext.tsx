import { AppShellProps } from '@roleypoly/design-system/organisms/app-shell';
import * as React from 'react';
import { useRecentGuilds } from '../recent-guilds/RecentGuildsContext';
import { useSessionContext } from '../session/SessionContext';

type AppShellPropsT =
  | {
      user: Required<AppShellProps['user']>;
      guilds: Required<AppShellProps['guilds']>;
      recentGuilds: Required<AppShellProps['recentGuilds']>;
    }
  | {
      user: undefined;
      guilds: undefined;
      recentGuilds: [];
    };

export const AppShellPropsContext = React.createContext<AppShellPropsT>({
  user: undefined,
  guilds: undefined,
  recentGuilds: [],
});

export const useAppShellProps = () => React.useContext(AppShellPropsContext);

export const AppShellPropsProvider = (props: { children: React.ReactNode }) => {
  const { session } = useSessionContext();
  const { recentGuilds } = useRecentGuilds();

  const appShellProps: AppShellPropsT = {
    user: session?.user,
    guilds: session?.guilds,
    recentGuilds,
  };

  return (
    <AppShellPropsContext.Provider value={appShellProps}>
      {props.children}
    </AppShellPropsContext.Provider>
  );
};

import { AppShellProps } from '@roleypoly/design-system/organisms/app-shell';
import { NextPageContext } from 'next';
import { SessionData } from 'roleypoly/common/types';
import { swrFetch } from 'roleypoly/common/utils/isomorphicFetch';

export type ProvidableAppShellProps = {
    user: AppShellProps['user'];
    guilds: AppShellProps['guilds'];
};

export const useAppShellProps = (context?: NextPageContext) => {
    const { data, error } = swrFetch<Omit<SessionData, 'tokens'>>(
        '/get-session',
        context
    );

    const props: ProvidableAppShellProps = {
        user: data?.user,
        guilds: data?.guilds,
    };

    return {
        appShellProps: props,
        isLoading: !error && !data,
        isError: error,
    };
};

import { HelpPageBase } from '@roleypoly/design-system/molecules/help-page-base';
import { AppShell, AppShellProps } from '@roleypoly/design-system/organisms/app-shell';
import * as React from 'react';

export type HelpPageProps = AppShellProps & {
    children: React.ReactNode;
};

export const HelpPageTemplate = (props: HelpPageProps) => (
    <AppShell guilds={props.guilds} user={props.user || undefined}>
        <HelpPageBase>{props.children}</HelpPageBase>
    </AppShell>
);

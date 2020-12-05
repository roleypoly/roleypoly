import * as React from 'react';
import { AppShell } from 'roleypoly/design-system/organisms/app-shell';
import { HelpPageBase } from 'roleypoly/design-system/molecules/help-page-base';
import { DiscordUser } from 'roleypoly/common/types';

type HelpPageProps = {
    user: DiscordUser | null;
    children: React.ReactNode;
};

export const HelpPageTemplate = (props: HelpPageProps) => (
    <AppShell user={props.user || undefined}>
        <HelpPageBase>{props.children}</HelpPageBase>
    </AppShell>
);

import * as React from 'react';
import { AppShell } from 'roleypoly/src/design-system/organisms/app-shell';
import { HelpPageBase } from 'roleypoly/src/design-system/organisms/help-page-base';
import { RoleypolyUser } from '@roleypoly/rpc/shared';

type HelpPageProps = {
    user: RoleypolyUser.AsObject | null;
    children: React.ReactNode;
};

export const HelpPageTemplate = (props: HelpPageProps) => (
    <AppShell user={props.user || null}>
        <HelpPageBase>{props.children}</HelpPageBase>
    </AppShell>
);

import { AppShell } from '@roleypoly/design-system/organisms/app-shell';
import { Landing } from '@roleypoly/design-system/organisms/landing';
import * as React from 'react';
import { ProvidableAppShellProps } from 'roleypoly/providers/appShellData';

export const LandingTemplate = (props: ProvidableAppShellProps) => (
    <AppShell showFooter {...props}>
        <Landing />
    </AppShell>
);

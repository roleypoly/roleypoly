import * as React from 'react';
import { AppShell } from 'roleypoly/design-system/organisms/app-shell';
import { Landing } from 'roleypoly/design-system/organisms/landing';

export const LandingTemplate = () => (
    <AppShell showFooter>
        <Landing />
    </AppShell>
);

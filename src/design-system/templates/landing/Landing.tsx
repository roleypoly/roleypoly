import * as React from 'react';
import { AppShell } from 'roleypoly/src/design-system/organisms/app-shell';
import { Landing } from 'roleypoly/src/design-system/organisms/landing';

export const LandingTemplate = () => (
    <AppShell showFooter user={null}>
        <Landing />
    </AppShell>
);

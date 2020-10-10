import * as React from 'react';
import { AppShell } from 'organisms/app-shell';
import { Landing } from 'organisms/landing';

export const LandingTemplate = () => (
    <AppShell showFooter user={null}>
        <Landing />
    </AppShell>
);

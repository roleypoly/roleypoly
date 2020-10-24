import * as React from 'react';
import { AppShell } from './AppShell';
import { rpUser, guildEnum } from 'roleypoly/src/design-system/shared-types/storyData';

export default {
    title: 'Organisms/App Shell',
    component: AppShell,
};

export const Guest = () => (
    <AppShell showFooter user={null}>
        <h1>Hello World</h1>
    </AppShell>
);

export const LoggedIn = () => (
    <AppShell user={rpUser} guildEnumeration={guildEnum}>
        <h1>Hello World</h1>
    </AppShell>
);

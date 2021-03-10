import * as React from 'react';
import { mastheadSlugs, user } from '../../fixtures/storyData';
import { AppShell } from './AppShell';

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
    <AppShell user={user} guilds={mastheadSlugs}>
        <h1>Hello World</h1>
    </AppShell>
);

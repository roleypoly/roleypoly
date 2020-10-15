import * as React from 'react';
import { organismStories } from 'roleypoly/src/design-system/organisms/organisms.story';
import { AppShell } from './AppShell';
import { rpUser, guildEnum } from 'roleypoly/src/design-system/shared-types/storyData';

const story = organismStories('App Shell', module);

story.add('Guest', () => (
    <AppShell showFooter user={null}>
        <h1>Hello World</h1>
    </AppShell>
));

story.add('Logged In', () => (
    <AppShell user={rpUser} guildEnumeration={guildEnum}>
        <h1>Hello World</h1>
    </AppShell>
));

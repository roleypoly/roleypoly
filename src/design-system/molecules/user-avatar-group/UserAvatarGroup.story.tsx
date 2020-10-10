import * as React from 'react';
import { moleculeStories } from 'molecules/molecules.story';
import { UserAvatarGroup } from './UserAvatarGroup';
import { user } from 'hack/fixtures/storyData';
import { Hero } from 'atoms/hero';

const story = moleculeStories('User Avatar Group', module);

story.add('Default', () => (
    <Hero>
        <UserAvatarGroup user={user} />
    </Hero>
));

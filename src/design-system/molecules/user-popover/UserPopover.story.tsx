import { user } from 'hack/fixtures/storyData';
import { moleculeStories } from 'molecules/molecules.story';
import * as React from 'react';
import { UserPopover } from './UserPopover';
import { PopoverBase } from 'atoms/popover/Popover.styled';

const story = moleculeStories('User Popover', module);

story.add('User Popover', () => (
    <PopoverBase active>
        <UserPopover user={user} />
    </PopoverBase>
));

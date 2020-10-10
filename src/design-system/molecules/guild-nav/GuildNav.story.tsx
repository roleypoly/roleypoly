import { moleculeStories } from 'molecules/molecules.story';
import * as React from 'react';
import { GuildNav } from './GuildNav';
import { guildEnum } from 'hack/fixtures/storyData';
import { PopoverBase } from 'atoms/popover/Popover.styled';

const story = moleculeStories('Guild Nav', module);

story.add('Has Guilds', () => (
    <PopoverBase active>
        <GuildNav guildEnumeration={guildEnum} />
    </PopoverBase>
));
story.add('No Guilds', () => (
    <PopoverBase active>
        <GuildNav guildEnumeration={{ guildsList: [] }} />
    </PopoverBase>
));

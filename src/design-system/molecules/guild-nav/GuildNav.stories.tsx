import * as React from 'react';
import { GuildNav } from './GuildNav';
import { guildEnum } from 'roleypoly/src/design-system/shared-types/storyData';
import { PopoverBase } from 'roleypoly/src/design-system/atoms/popover/Popover.styled';

export default {
    title: 'Molecules/Guild Nav',
    component: GuildNav,
};

export const HasGuilds = () => (
    <PopoverBase active>
        <GuildNav guildEnumeration={guildEnum} />
    </PopoverBase>
);

export const NoGuilds = () => (
    <PopoverBase active>
        <GuildNav guildEnumeration={{ guildsList: [] }} />
    </PopoverBase>
);

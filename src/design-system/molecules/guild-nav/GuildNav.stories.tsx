import * as React from 'react';
import { mastheadSlugs } from 'roleypoly/common/types/storyData';
import { PopoverBase } from 'roleypoly/design-system/atoms/popover/Popover.styled';
import { GuildNav } from './GuildNav';

export default {
    title: 'Molecules/Guild Nav',
    component: GuildNav,
};

export const HasGuilds = () => (
    <PopoverBase active>
        <GuildNav guilds={mastheadSlugs} />
    </PopoverBase>
);

export const NoGuilds = () => (
    <PopoverBase active>
        <GuildNav guilds={[]} />
    </PopoverBase>
);

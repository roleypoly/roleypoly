import * as React from 'react';
import { UserAvatarGroup } from './UserAvatarGroup';
import { user } from 'roleypoly/common/types/storyData';
import { Hero } from 'roleypoly/design-system/atoms/hero';

export default {
    title: 'Molecules/User Avatar Group',
    component: UserAvatarGroup,
    args: {
        user,
        preventCollapse: true,
    },
};

export const Default = (args) => (
    <Hero>
        <UserAvatarGroup {...args} />
    </Hero>
);

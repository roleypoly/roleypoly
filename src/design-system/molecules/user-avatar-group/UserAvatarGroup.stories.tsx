import * as React from 'react';
import { UserAvatarGroup } from './UserAvatarGroup';
import { user } from 'roleypoly/src/design-system/shared-types/storyData';
import { Hero } from 'roleypoly/src/design-system/atoms/hero';

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

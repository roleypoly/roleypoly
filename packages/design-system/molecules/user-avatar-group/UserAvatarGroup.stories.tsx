import { Hero } from '@roleypoly/design-system/atoms/hero';
import * as React from 'react';
import { user } from '../../fixtures/storyData';
import { UserAvatarGroup } from './UserAvatarGroup';
import { UserAvatarGroupSkeleton } from './UserAvatarGroupSkeleton';

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

export const skeleton = () => (
  <Hero>
    <UserAvatarGroupSkeleton />
  </Hero>
);

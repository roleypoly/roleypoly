import { Avatar } from '@roleypoly/design-system/atoms/avatar';
import { palette } from '@roleypoly/design-system/atoms/colors';
import { PlaceholderBox } from '@roleypoly/design-system/atoms/placeholder';
import * as React from 'react';
import { Collapse, Group, GroupText } from './UserAvatarGroup.styled';

export const UserAvatarGroupSkeleton = () => (
  <Group>
    <Collapse preventCollapse={false}>
      <GroupText>
        <PlaceholderBox firstColor={palette.taupe200} secondColor={palette.taupe300} />
      </GroupText>
      &nbsp;
    </Collapse>
    <Avatar deliberatelyEmpty size={34}></Avatar>
  </Group>
);

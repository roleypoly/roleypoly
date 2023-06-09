import { Avatar, utils } from '@roleypoly/design-system/atoms/avatar';
import { DiscordUser } from '@roleypoly/types';
import * as React from 'react';
import { Collapse, Discriminator, Group, GroupText } from './UserAvatarGroup.styled';

type Props = {
  user: DiscordUser;
  preventCollapse?: boolean;
};

export const UserAvatarGroup = (props: Props) => (
  <Group>
    <Collapse preventCollapse={props.preventCollapse || false}>
      <GroupText>
        {props.user.username}
        {props.user.discriminator && props.user.discriminator !== '0' && (
          <Discriminator>#{props.user.discriminator}</Discriminator>
        )}
      </GroupText>
      &nbsp;
    </Collapse>
    <Avatar
      size={34}
      hash={props.user.avatar}
      src={utils.avatarHash(props.user.id, props.user.avatar, 'avatars')}
    >
      {utils.initialsFromName(props.user.username)}
    </Avatar>
  </Group>
);

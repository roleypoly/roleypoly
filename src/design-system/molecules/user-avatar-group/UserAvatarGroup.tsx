import * as React from 'react';
import { DiscordUser } from 'roleypoly/common/types';
import { Avatar, utils } from 'roleypoly/design-system/atoms/avatar';
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
                <Discriminator>#{props.user.discriminator}</Discriminator>
            </GroupText>
            &nbsp;
        </Collapse>
        <Avatar
            size={34}
            src={utils.avatarHash(props.user.id, props.user.avatar, 'avatars')}
        >
            {utils.initialsFromName(props.user.username)}
        </Avatar>
    </Group>
);

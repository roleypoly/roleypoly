import * as React from 'react';
import { DiscordUser } from 'roleypoly/src/design-system/shared-types';
import { utils, Avatar } from 'roleypoly/src/design-system/atoms/avatar';
import { Group, Collapse, Discriminator, GroupText } from './UserAvatarGroup.styled';

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
        <Avatar size={34} src={props.user.avatar}>
            {utils.initialsFromName(props.user.username)}
        </Avatar>
    </Group>
);

import { CompletelyStylelessLink } from '@roleypoly/design-system/atoms/typography';
import { UserAvatarGroup } from '@roleypoly/design-system/molecules/user-avatar-group';
import { DiscordUser } from '@roleypoly/types';
import * as React from 'react';
import { GoGear, GoSignOut } from 'react-icons/go';
import { Base, NavAction } from './UserPopover.styled';

type UserPopoverProps = {
    user: DiscordUser;
};

export const UserPopover = (props: UserPopoverProps) => (
    <Base>
        <UserAvatarGroup user={props.user} preventCollapse={true} />
        <NavAction>
            <CompletelyStylelessLink to="/user/settings">
                Settings <GoGear />
            </CompletelyStylelessLink>
        </NavAction>
        <NavAction>
            <CompletelyStylelessLink to="/machinery/logout">
                Log Out <GoSignOut />
            </CompletelyStylelessLink>
        </NavAction>
    </Base>
);

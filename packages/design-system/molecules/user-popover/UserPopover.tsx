import { CompletelyStylelessLink } from '@roleypoly/design-system/atoms/typography';
import { UserAvatarGroup } from '@roleypoly/design-system/molecules/user-avatar-group';
import * as React from 'react';
import { GoGear, GoSignOut } from 'react-icons/go';
import { DiscordUser } from '../../../../src/common/types';
import { Base, NavAction } from './UserPopover.styled';

type UserPopoverProps = {
    user: DiscordUser;
};

export const UserPopover = (props: UserPopoverProps) => (
    <Base>
        <UserAvatarGroup user={props.user} preventCollapse={true} />
        <NavAction>
            <a href="/user/settings">
                <CompletelyStylelessLink>
                    Settings <GoGear />
                </CompletelyStylelessLink>
            </a>
        </NavAction>
        <NavAction>
            <a href="/machinery/logout">
                <CompletelyStylelessLink>
                    Log Out <GoSignOut />
                </CompletelyStylelessLink>
            </a>
        </NavAction>
    </Base>
);

import Link from 'next/link';
import * as React from 'react';
import { GoGear, GoSignOut } from 'react-icons/go';
import { DiscordUser } from 'roleypoly/common/types';
import { CompletelyStylelessLink } from 'roleypoly/design-system/atoms/typography';
import { UserAvatarGroup } from 'roleypoly/design-system/molecules/user-avatar-group';
import { Base, NavAction } from './UserPopover.styled';

type UserPopoverProps = {
    user: DiscordUser;
};

export const UserPopover = (props: UserPopoverProps) => (
    <Base>
        <UserAvatarGroup user={props.user} preventCollapse={true} />
        <NavAction>
            <Link href="/user/settings">
                <CompletelyStylelessLink>
                    Settings <GoGear />
                </CompletelyStylelessLink>
            </Link>
        </NavAction>
        <NavAction>
            <Link href="/machinery/logout" passHref prefetch={false}>
                <CompletelyStylelessLink>
                    Log Out <GoSignOut />
                </CompletelyStylelessLink>
            </Link>
        </NavAction>
    </Base>
);

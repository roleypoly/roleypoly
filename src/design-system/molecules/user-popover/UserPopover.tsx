import * as React from 'react';
import { DiscordUser } from 'roleypoly/src/design-system/shared-types';
import { UserAvatarGroup } from 'roleypoly/src/design-system/molecules/user-avatar-group';
import { Base, NavAction } from './UserPopover.styled';
import { GoGear, GoSignOut } from 'react-icons/go';
import Link from 'next/link';

type UserPopoverProps = {
    user: DiscordUser;
};

export const UserPopover = (props: UserPopoverProps) => (
    <Base>
        <UserAvatarGroup user={props.user} preventCollapse={true} />
        <NavAction>
            <Link href="/user/settings">
                <>
                    Settings <GoGear />
                </>
            </Link>
        </NavAction>
        <NavAction>
            <Link href="/auth/machinery/logout">
                <>
                    Log Out <GoSignOut />
                </>
            </Link>
        </NavAction>
    </Base>
);

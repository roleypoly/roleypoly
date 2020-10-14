import { user } from 'roleypoly/src/design-system/shared-types/storyData';
import * as React from 'react';
import { UserPopover as UserPopoverComponent } from './UserPopover';
import { PopoverBase } from 'roleypoly/src/design-system/atoms/popover/Popover.styled';

export default {
    title: 'Molecules/User Popover',
    component: UserPopoverComponent,
    args: {
        user,
    },
};

export const UserPopover = (args) => (
    <PopoverBase active>
        <UserPopoverComponent {...args} />
    </PopoverBase>
);

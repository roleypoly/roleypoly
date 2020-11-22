import * as React from 'react';
import { GuildEnumeration, RoleypolyUser } from 'roleypoly/common/types';
import { AppShell } from 'roleypoly/design-system/organisms/app-shell';
import {
    RolePicker,
    RolePickerProps,
} from 'roleypoly/design-system/organisms/role-picker';

export type RolePickerTemplateProps = RolePickerProps & {
    user: RoleypolyUser;
    guildEnumeration?: GuildEnumeration;
    activeGuildId?: string;
};

export const RolePickerTemplate = (props: RolePickerTemplateProps) => {
    const { user, ...pickerProps } = props;
    return (
        <AppShell
            guildEnumeration={props.guildEnumeration}
            activeGuildId={props.activeGuildId}
            user={user}
            small
        >
            <RolePicker {...pickerProps} />
        </AppShell>
    );
};

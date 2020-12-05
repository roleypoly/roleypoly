import * as React from 'react';
import { GuildEnumeration, RoleypolyUser } from 'roleypoly/common/types';
import { AppShell, AppShellProps } from 'roleypoly/design-system/organisms/app-shell';
import {
    RolePicker,
    RolePickerProps,
} from 'roleypoly/design-system/organisms/role-picker';

export type RolePickerTemplateProps = RolePickerProps & AppShellProps;

export const RolePickerTemplate = (props: RolePickerTemplateProps) => {
    const { user, ...pickerProps } = props;
    return (
        <AppShell
            guildEnumeration={props.guildEnumeration}
            activeGuildId={props.activeGuildId}
            user={user.discorduser}
            guilds={user.guilds}
            small
        >
            <RolePicker {...pickerProps} />
        </AppShell>
    );
};

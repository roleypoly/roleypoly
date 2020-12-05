import * as React from 'react';
import { AppShell, AppShellProps } from 'roleypoly/design-system/organisms/app-shell';
import {
    RolePicker,
    RolePickerProps,
} from 'roleypoly/design-system/organisms/role-picker';

export type RolePickerTemplateProps = RolePickerProps & AppShellProps;

export const RolePickerTemplate = (props: RolePickerTemplateProps) => {
    const { user, guilds, activeGuildId, ...pickerProps } = props;
    return (
        <AppShell activeGuildId={activeGuildId} user={user} guilds={guilds} small>
            <RolePicker {...pickerProps} />
        </AppShell>
    );
};

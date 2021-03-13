import { AppShell, AppShellProps } from '@roleypoly/design-system/organisms/app-shell';
import {
    RolePicker,
    RolePickerProps,
} from '@roleypoly/design-system/organisms/role-picker';
import * as React from 'react';

export type RolePickerTemplateProps = RolePickerProps & Omit<AppShellProps, 'children'>;

export const RolePickerTemplate = (props: RolePickerTemplateProps) => {
    const { user, guilds, activeGuildId, recentGuilds, ...pickerProps } = props;
    return (
        <AppShell
            activeGuildId={activeGuildId}
            user={user}
            guilds={guilds}
            recentGuilds={recentGuilds}
            small
        >
            <RolePicker {...pickerProps} />
        </AppShell>
    );
};

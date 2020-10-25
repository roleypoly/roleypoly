import * as React from 'react';
import { AppShell } from 'roleypoly/src/design-system/organisms/app-shell';
import {
    RolePicker,
    RolePickerProps,
} from 'roleypoly/src/design-system/organisms/role-picker';
import {
    GuildEnumeration,
    RoleypolyUser,
} from 'roleypoly/src/design-system/shared-types';

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

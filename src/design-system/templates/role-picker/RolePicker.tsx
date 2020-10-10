import * as React from 'react';
import { AppShell } from 'organisms/app-shell';
import { RolePicker, RolePickerProps } from 'organisms/role-picker';
import { RoleypolyUser } from '@roleypoly/rpc/shared';
import { GuildEnumeration } from '@roleypoly/rpc/platform';

export type RolePickerTemplateProps = RolePickerProps & {
    user: RoleypolyUser.AsObject;
    guildEnumeration?: GuildEnumeration.AsObject;
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

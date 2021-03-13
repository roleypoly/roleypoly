import { AppShell, AppShellProps } from '@roleypoly/design-system/organisms/app-shell';
import { ServersListing } from '@roleypoly/design-system/organisms/servers-listing/ServersListing';
import * as React from 'react';

type ServerTemplateProps = Omit<AppShellProps, 'children'>;

export const ServersTemplate = (props: ServerTemplateProps) => (
    <AppShell {...props} disableGuildPicker>
        <ServersListing guilds={props.guilds}></ServersListing>
    </AppShell>
);

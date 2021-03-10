import { AppShell, AppShellProps } from '@roleypoly/design-system/organisms/app-shell';
import { ServersListing } from '@roleypoly/design-system/organisms/servers-listing/ServersListing';
import * as React from 'react';
import { GuildSlug } from '../../../../src/common/types';

type ServerTemplateProps = Omit<AppShellProps, 'children'> & {
    guilds: GuildSlug[];
};

export const ServersTemplate = (props: ServerTemplateProps) => (
    <AppShell {...props} disableGuildPicker>
        <ServersListing guilds={props.guilds}></ServersListing>
    </AppShell>
);

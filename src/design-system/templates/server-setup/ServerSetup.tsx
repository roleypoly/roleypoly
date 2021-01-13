import { AppShell, AppShellProps } from 'roleypoly/design-system/organisms/app-shell';
import {
    ServerSetup,
    ServerSetupProps,
} from 'roleypoly/design-system/organisms/server-setup/ServerSetup';

type ServerSetupTemplateProps = Omit<AppShellProps, 'children'> & ServerSetupProps;

export const ServerSetupTemplate = ({
    guildSlug,
    ...appShellProps
}: ServerSetupTemplateProps) => {
    return (
        <AppShell {...appShellProps} activeGuildId={guildSlug.id}>
            <ServerSetup guildSlug={guildSlug} />
        </AppShell>
    );
};

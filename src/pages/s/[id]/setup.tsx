import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import * as React from 'react';
import { ServerSetupTemplate } from 'roleypoly/design-system/templates/server-setup/ServerSetup';
import { useAppShellProps } from 'roleypoly/providers/appShellData';

const serverSetup = (props: { guildID: string }) => {
    const { appShellProps } = useAppShellProps();

    const guildSlug = appShellProps.guilds?.find((guild) => guild.id === props.guildID);

    if (!guildSlug) {
        const router = useRouter();
        void router.push('/machinery/error?error_code=404');
        return null;
    }

    return (
        <ServerSetupTemplate
            {...appShellProps}
            activeGuildId={props.guildID}
            guildSlug={guildSlug}
        />
    );
};

serverSetup.getInitialProps = async (context: NextPageContext) => {
    return {
        guildID: context.query.id,
    };
};

export default serverSetup;

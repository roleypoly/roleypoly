import { ServersTemplate } from '@roleypoly/design-system/templates/servers';
import Head from 'next/head';
import { useAppShellProps } from 'roleypoly/providers/appShellData';

const Servers = () => {
    const { appShellProps } = useAppShellProps();
    return (
        <>
            <Head>
                <title>Viewing your servers - Roleypoly</title>
            </Head>
            <ServersTemplate {...appShellProps} guilds={appShellProps.guilds || []} />
        </>
    );
};

export default Servers;

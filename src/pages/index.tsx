import { useRouter } from 'next/router';
import * as React from 'react';
import { LandingTemplate } from 'roleypoly/design-system/templates/landing';
import { useAppShellProps } from 'roleypoly/providers/appShellData';

const Index = () => {
    const {
        appShellProps: { guilds, user },
    } = useAppShellProps();
    const router = useRouter();

    React.useEffect(() => {
        if (user || guilds) {
            void router.replace('/servers');
        }
    }, [guilds, user]);

    return <LandingTemplate user={user} guilds={guilds} />;
};
export default Index;

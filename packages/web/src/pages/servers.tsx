import { Redirect } from '@reach/router';
import { ServersTemplate } from '@roleypoly/design-system/templates/servers';
import * as React from 'react';
import { useAppShellProps } from '../contexts/app-shell/AppShellContext';
import { useSessionContext } from '../contexts/session/SessionContext';

const ServersPage = () => {
    const { isAuthenticated, session } = useSessionContext();
    const appShellProps = useAppShellProps();
    if (!isAuthenticated || !session) {
        return <Redirect to="/" />;
    }

    return <ServersTemplate {...appShellProps} />;
};

export default ServersPage;

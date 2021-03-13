import { Redirect } from '@reach/router';
import { ServersTemplate } from '@roleypoly/design-system/templates/servers';
import * as React from 'react';
import { useSessionContext } from '../contexts/session/SessionContext';

const ServersPage = () => {
    const { isAuthenticated, session } = useSessionContext();
    if (!isAuthenticated || !session) {
        return <Redirect to="/" />;
    }

    return <ServersTemplate guilds={session.guilds || []} user={session.user} />;
};

export default ServersPage;

import { Redirect } from '@reach/router';
import { LandingTemplate } from '@roleypoly/design-system/templates/landing';
import * as React from 'react';
import { useAppShellProps } from '../contexts/app-shell/AppShellContext';
import { useSessionContext } from '../contexts/session/SessionContext';

const Landing = () => {
    const { isAuthenticated } = useSessionContext();
    const appShellProps = useAppShellProps();

    if (isAuthenticated) {
        return <Redirect to="/servers" />;
    }

    return <LandingTemplate {...appShellProps} />;
};

export default Landing;

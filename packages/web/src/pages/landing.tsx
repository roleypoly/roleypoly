import { Redirect } from '@reach/router';
import { LandingTemplate } from '@roleypoly/design-system/templates/landing';
import * as React from 'react';
import { useSessionContext } from '../session-context/SessionContext';

const Landing = () => {
    const { isAuthenticated } = useSessionContext();

    if (isAuthenticated) {
        return <Redirect to="/servers" />;
    }

    return <LandingTemplate />;
};

export default Landing;

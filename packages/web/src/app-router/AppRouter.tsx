import { Router } from '@reach/router';
import * as React from 'react';

const LandingPage = React.lazy(() => import('../pages/landing'));
const ServersPage = React.lazy(() => import('../pages/servers'));
const DevToolsSetApi = React.lazy(() => import('../pages/dev-tools/set-api'));
const DevToolsSessionDebug = React.lazy(() => import('../pages/dev-tools/session-debug'));
const MachineryNewSession = React.lazy(() => import('../pages/machinery/new-session'));

const RouteWrapper = (props: {
    component: React.LazyExoticComponent<React.ComponentType<any>>;
    path?: string;
    default?: boolean;
}) => (
    <React.Suspense fallback={<div>Loading...</div>}>
        <props.component {...props} />
    </React.Suspense>
);

export const AppRouter = () => {
    return (
        <Router>
            <RouteWrapper component={LandingPage} path="/" />
            <RouteWrapper component={ServersPage} path="/servers" />
            <RouteWrapper component={MachineryNewSession} path="/machinery/new-session" />
            <RouteWrapper component={DevToolsSetApi} path="/x/dev-tools/set-api" />
            <RouteWrapper
                component={DevToolsSessionDebug}
                path="/x/dev-tools/session-debug"
            />
        </Router>
    );
};

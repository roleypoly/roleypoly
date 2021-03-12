import { Router } from '@reach/router';
import * as React from 'react';

const LandingPage = React.lazy(() => import('../pages/landing'));

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
        </Router>
    );
};

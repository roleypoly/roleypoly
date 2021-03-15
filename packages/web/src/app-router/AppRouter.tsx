import { Router } from '@reach/router';
import { GenericLoadingTemplate } from '@roleypoly/design-system/templates/generic-loading';
import * as React from 'react';
import AuthLogin from '../pages/auth/login';
import LandingPage from '../pages/landing';

const ServersPage = React.lazy(() => import('../pages/servers'));
const PickerPage = React.lazy(() => import('../pages/picker'));

const MachineryNewSession = React.lazy(() => import('../pages/machinery/new-session'));
const MachineryLogout = React.lazy(() => import('../pages/machinery/logout'));
const MachineryBotJoin = React.lazy(() => import('../pages/machinery/bot-join'));

const DevToolsSetApi = React.lazy(() => import('../pages/dev-tools/set-api'));
const DevToolsSessionDebug = React.lazy(() => import('../pages/dev-tools/session-debug'));

const RouteWrapper = (props: {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  path?: string;
  default?: boolean;
}) => (
  <React.Suspense fallback={<GenericLoadingTemplate />}>
    <props.component {...props} />
  </React.Suspense>
);

export const AppRouter = () => {
  return (
    <Router>
      <LandingPage path="/" />
      <RouteWrapper component={ServersPage} path="/servers" />
      <RouteWrapper component={PickerPage} path="/s/:serverID" />

      <RouteWrapper
        component={MachineryNewSession}
        path="/machinery/new-session/:sessionID"
      />
      <RouteWrapper component={MachineryLogout} path="/machinery/logout" />
      <RouteWrapper component={MachineryBotJoin} path="/machinery/bot-join" />
      <RouteWrapper component={MachineryBotJoin} path="/machinery/bot-join/:serverID" />
      <AuthLogin path="/auth/login" />

      <RouteWrapper component={DevToolsSetApi} path="/x/dev-tools/set-api" />
      <RouteWrapper component={DevToolsSessionDebug} path="/x/dev-tools/session-debug" />
    </Router>
  );
};

import { Router } from '@reach/router';
import { GenericLoadingTemplate } from '@roleypoly/design-system/templates/generic-loading';
import * as React from 'react';
import AuthLogin from '../pages/auth/login';
import ErrorPage from '../pages/error';
import LandingPage from '../pages/landing';
import PickerPage from '../pages/picker';

const ServersPage = React.lazy(() => import('../pages/servers'));

const MachineryNewSession = React.lazy(() => import('../pages/machinery/new-session'));
const MachineryLogout = React.lazy(() => import('../pages/machinery/logout'));
const MachineryBotJoin = React.lazy(() => import('../pages/machinery/bot-join'));

const DevToolsSetApi = React.lazy(() => import('../pages/dev-tools/set-api'));
const DevToolsSessionDebug = React.lazy(() => import('../pages/dev-tools/session-debug'));

const RouteWrapper = (props: {
  component: React.ComponentType<any>;
  path?: string;
  default?: boolean;
  [x: string]: any;
}) => (
  <React.Suspense fallback={<GenericLoadingTemplate />}>
    <props.component {...props} />
  </React.Suspense>
);

export const AppRouter = () => {
  return (
    <Router>
      <RouteWrapper component={LandingPage} path="/" />
      <RouteWrapper component={ServersPage} path="/servers" />
      <RouteWrapper component={PickerPage} path="/s/:serverID" />

      <RouteWrapper component={ErrorPage} path="/error" />
      <RouteWrapper component={ErrorPage} path="/error/:identity" />

      <RouteWrapper
        component={MachineryNewSession}
        path="/machinery/new-session/:sessionID"
      />
      <RouteWrapper component={MachineryLogout} path="/machinery/logout" />
      <RouteWrapper component={MachineryBotJoin} path="/machinery/bot-join" />
      <RouteWrapper component={MachineryBotJoin} path="/machinery/bot-join/:serverID" />
      <RouteWrapper component={AuthLogin} path="/auth/login" />

      <RouteWrapper component={DevToolsSetApi} path="/x/dev-tools/set-api" />
      <RouteWrapper component={DevToolsSessionDebug} path="/x/dev-tools/session-debug" />

      <RouteWrapper component={ErrorPage} default identity={404} />
    </Router>
  );
};

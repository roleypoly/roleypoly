import { Redirect } from '@reach/router';
import { LandingTemplate } from '@roleypoly/design-system/templates/landing';
import * as React from 'react';
import { useAppShellProps } from '../contexts/app-shell/AppShellContext';
import { useSessionContext } from '../contexts/session/SessionContext';
import { Title } from '../utils/metaTitle';

const Landing = (props: { path: string }) => {
  const { isAuthenticated } = useSessionContext();
  const appShellProps = useAppShellProps();

  if (isAuthenticated) {
    return <Redirect to="/servers" noThrow />;
  }

  return (
    <>
      <Title title={`Roleypoly - Tame your Discord roles.`} />
      <LandingTemplate {...appShellProps} />
    </>
  );
};

export default Landing;

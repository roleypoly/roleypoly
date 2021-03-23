import { Redirect } from '@reach/router';
import { ServersTemplate } from '@roleypoly/design-system/templates/servers';
import * as React from 'react';
import { useAppShellProps } from '../contexts/app-shell/AppShellContext';
import { useSessionContext } from '../contexts/session/SessionContext';
import { Title } from '../utils/metaTitle';

const ServersPage = () => {
  const { isAuthenticated, session } = useSessionContext();
  const appShellProps = useAppShellProps();
  if (!isAuthenticated || !session) {
    return <Redirect to="/" noThrow />;
  }

  return (
    <>
      <Title title={'Your Guilds - Roleypoly'} />
      <ServersTemplate {...appShellProps} />
    </>
  );
};

export default ServersPage;

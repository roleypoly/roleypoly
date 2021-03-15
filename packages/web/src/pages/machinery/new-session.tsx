import { palette } from '@roleypoly/design-system/atoms/colors';
import { Link } from '@roleypoly/design-system/atoms/typography';
import { GenericLoadingTemplate } from '@roleypoly/design-system/templates/generic-loading';
import * as React from 'react';
import { useSessionContext } from '../../contexts/session/SessionContext';
import { Title } from '../../utils/metaTitle';

const NewSession = (props: { sessionID: string }) => {
  const { setupSession, isAuthenticated } = useSessionContext();
  const [postauthUrl, setPostauthUrl] = React.useState('/servers');

  React.useEffect(() => {
    const storedPostauthUrl = localStorage.getItem('rp_postauth_redirect');
    if (storedPostauthUrl) {
      setPostauthUrl(storedPostauthUrl);
      localStorage.removeItem('rp_postauth_redirect');
    }
  }, [setPostauthUrl]);

  React.useEffect(() => {
    if (isAuthenticated) {
      setTimeout(() => {
        window.history.replaceState(null, '', '/');
        window.location.href = postauthUrl;
      }, 0);
    }
  }, [postauthUrl, isAuthenticated]);

  React.useCallback(
    (sessionID) => {
      setupSession(sessionID);
    },
    [setupSession]
  )(props.sessionID);

  return (
    <GenericLoadingTemplate>
      <Title title="Logging you into Roleypoly..." />
      <div style={{ textAlign: 'center' }}>
        <div>Logging you into Roleypoly...</div>
        <Link style={{ color: palette.taupe400 }} href={postauthUrl}>
          If you aren't redirected soon, click here.
        </Link>
      </div>
    </GenericLoadingTemplate>
  );
};

export default NewSession;

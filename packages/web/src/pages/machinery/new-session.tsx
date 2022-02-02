import { useLocation, useNavigate } from '@reach/router';
import { palette } from '@roleypoly/design-system/atoms/colors';
import { Link } from '@roleypoly/design-system/atoms/typography';
import { GenericLoadingTemplate } from '@roleypoly/design-system/templates/generic-loading';
import * as React from 'react';
import { useSessionContext } from '../../contexts/session/SessionContext';
import { Title } from '../../utils/metaTitle';

const NewSession = () => {
  const { setupSession, sessionID, isAuthenticated } = useSessionContext();
  const [postauthUrl, setPostauthUrl] = React.useState('/servers');
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const storedPostauthUrl = localStorage.getItem('rp_postauth_redirect');
    if (storedPostauthUrl) {
      setPostauthUrl(storedPostauthUrl);
      localStorage.removeItem('rp_postauth_redirect');
    }
  }, [setPostauthUrl]);

  React.useEffect(() => {
    if (!sessionID) {
      const sessionToken = location.hash.substring(2);
      if (!sessionToken) {
        console.error({ sessionToken });
        navigate('/error/400?extra=missing-hash');
        return;
      }

      setupSession(sessionToken);
    }

    if (sessionID && isAuthenticated) {
      navigate(postauthUrl);
    }
  }, [sessionID, location, postauthUrl, setupSession, navigate, isAuthenticated]);

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

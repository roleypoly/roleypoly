import { Redirect } from '@reach/router';
import * as React from 'react';
import { useSessionContext } from '../../contexts/session/SessionContext';
import { Title } from '../../utils/metaTitle';

const NewSession = (props: { sessionID: string }) => {
  const session = useSessionContext();
  const [postauthUrl, setPostauthUrl] = React.useState('/servers');

  React.useEffect(() => {
    const url = new URL(window.location.href);
    const id = props.sessionID || url.searchParams.get('session_id');
    if (id) {
      localStorage.setItem('rp_session_key', id);
      // session.setSession({ sessionID: id });

      const storedPostauthUrl = localStorage.getItem('rp_postauth_redirect');
      if (storedPostauthUrl) {
        setPostauthUrl(storedPostauthUrl);
        localStorage.removeItem('rp_postauth_redirect');
      }
    }
  }, [setPostauthUrl, props.sessionID, session]);

  return (
    <>
      <Title title="Logging you into Roleypoly..." />
      <div>Logging you into Roleypoly...</div>
      {session.isAuthenticated && <Redirect to={postauthUrl} noThrow replace />}
    </>
  );
};

export default NewSession;

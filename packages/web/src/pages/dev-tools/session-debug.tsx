import { useApiContext } from '../../contexts/api/ApiContext';
import { useSessionContext } from '../../contexts/session/SessionContext';

const SessionDebug = () => {
  const session = useSessionContext();
  const api = useApiContext();

  return (
    <pre>
      {JSON.stringify(
        {
          apiUrl: api.apiUrl,
          isAuthenticated: session.isAuthenticated,
          user: session.session?.user || null,
          guilds: session.session?.guilds || null,
        },
        null,
        '  '
      )}
    </pre>
  );
};

export default SessionDebug;

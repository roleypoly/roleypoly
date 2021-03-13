import { useApiContext } from '../../api-context/ApiContext';
import { useSessionContext } from '../../session-context/SessionContext';

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

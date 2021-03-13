import { useSessionContext } from '../../session-context/SessionContext';

const SessionDebug = () => {
    const session = useSessionContext();

    return (
        <pre>
            {JSON.stringify(
                {
                    isAuthenticated: !!session.session?.user,
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

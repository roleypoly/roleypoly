import { AuthLogin } from '@roleypoly/design-system/templates/auth-login';
import { GuildSlug } from '@roleypoly/types';
import React from 'react';
import { useApiContext } from '../../api-context/ApiContext';

const Login = () => {
    const { apiUrl, fetch } = useApiContext();
    // If ?r is in query, then let's render the slug page
    // If not, redirect.
    const [guildSlug, setGuildSlug] = React.useState<GuildSlug | null>(null);

    React.useEffect(() => {
        const url = new URL(window.location.href);
        const callbackHost = new URL('/', url);
        const redirectServerID = url.searchParams.get('r');
        if (!redirectServerID) {
            window.location.href = `${apiUrl}/login-bounce?cbh=${callbackHost.href}`;
            return;
        }

        const fetchGuildSlug = async (id: string) => {
            const response = await fetch(`/get-slug/${id}`);
            if (response.status === 200) {
                const slug = await response.json();
                setGuildSlug(slug);
            }
        };

        fetchGuildSlug(redirectServerID);
    }, [apiUrl, fetch]);

    if (guildSlug === null) {
        return <div>Loading...</div>;
    }

    return <AuthLogin guildSlug={guildSlug} onSendSecretCode={() => {}} />;
};

export default Login;

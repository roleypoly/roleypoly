import { AuthLogin } from '@roleypoly/design-system/templates/auth-login';
import { GuildSlug } from '@roleypoly/types';
import React from 'react';
import { useApiContext } from '../../contexts/api/ApiContext';
import { Title } from '../../utils/metaTitle';

const Login = () => {
    const { apiUrl, fetch } = useApiContext();
    // If ?r is in query, then let's render the slug page
    // If not, redirect.
    const [guildSlug, setGuildSlug] = React.useState<GuildSlug | null>(null);
    const [oauthLink, setOauthLink] = React.useState(`${apiUrl}/login-bounce`);

    React.useEffect(() => {
        const url = new URL(window.location.href);
        const callbackHost = new URL('/', url);
        const redirectServerID = url.searchParams.get('r');
        const redirectUrl = `${apiUrl}/login-bounce?cbh=${callbackHost.href}`;
        if (!redirectServerID) {
            window.location.href = redirectUrl;
            return;
        }

        setOauthLink(redirectUrl);
        localStorage.setItem('rp_postauth_redirect', `/s/${redirectServerID}`);

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

    return (
        <>
            <Title title={'Login to Roleypoly'} />
            <AuthLogin
                guildSlug={guildSlug}
                onSendSecretCode={() => {}}
                discordOAuthLink={oauthLink}
            />
        </>
    );
};

export default Login;

import { redirectTo } from '@reach/router';
import { AuthLogin } from '@roleypoly/design-system/templates/auth-login';
import { GenericLoadingTemplate } from '@roleypoly/design-system/templates/generic-loading';
import { GuildSlug } from '@roleypoly/types';
import React from 'react';
import { useApiContext } from '../../contexts/api/ApiContext';
import { useGuildContext } from '../../contexts/guild/GuildContext';
import { useSessionContext } from '../../contexts/session/SessionContext';
import { Title } from '../../utils/metaTitle';

const Login = (props: { path: string }) => {
  const { apiUrl } = useApiContext();
  const { isAuthenticated } = useSessionContext();
  const { getGuildSlug } = useGuildContext();
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
      if (isAuthenticated) {
        redirectTo('/servers');
      }
      window.location.href = redirectUrl;
      return;
    }

    setOauthLink(redirectUrl);
    localStorage.setItem('rp_postauth_redirect', `/s/${redirectServerID}`);

    const fetchGuildSlug = async (id: string) => {
      const slug = await getGuildSlug(id);
      if (slug) {
        setGuildSlug(slug);
      }
    };

    fetchGuildSlug(redirectServerID);

    if (isAuthenticated) {
      redirectTo(`/s/${redirectServerID}`);
    }
  }, [apiUrl, getGuildSlug, isAuthenticated]);

  if (guildSlug === null) {
    return <GenericLoadingTemplate>Sending you to Discord...</GenericLoadingTemplate>;
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

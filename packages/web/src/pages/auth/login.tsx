import { useLocation, useNavigate } from '@reach/router';
import { palette } from '@roleypoly/design-system/atoms/colors';
import { Link } from '@roleypoly/design-system/atoms/typography';
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
  const navigate = useNavigate();
  const location = useLocation();
  // If ?r is in query, then let's render the slug page
  // If not, redirect.
  const [guildSlug, setGuildSlug] = React.useState<GuildSlug | null>(null);
  const [oauthLink, setOauthLink] = React.useState(`${apiUrl}/auth/bounce`);

  React.useEffect(() => {
    const url = new URL(location.href);
    const callbackHost = new URL('/', url);
    const redirectServerID = url.searchParams.get('r');
    const redirectUrl = `${apiUrl}/auth/bounce?cbh=${callbackHost.href}`;
    if (!redirectServerID) {
      if (isAuthenticated) {
        navigate('/servers');
      }
      navigate(redirectUrl);
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
      navigate(`/s/${redirectServerID}`);
    }
  }, [apiUrl, getGuildSlug, isAuthenticated, location, navigate]);

  if (guildSlug === null) {
    return (
      <GenericLoadingTemplate>
        <div style={{ textAlign: 'center' }}>
          <div>Sending you to Discord...</div>
          <Link style={{ color: palette.taupe400 }} href={oauthLink}>
            If you aren't redirected soon, click here.
          </Link>
        </div>
      </GenericLoadingTemplate>
    );
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

import { navigate, Redirect } from '@reach/router';
import { EditorTemplate } from '@roleypoly/design-system/templates/editor';
import { GenericLoadingTemplate } from '@roleypoly/design-system/templates/generic-loading';
import {
  GuildDataUpdate,
  PresentableGuild,
  UserGuildPermissions,
} from '@roleypoly/types';
import * as React from 'react';
import { useAppShellProps } from '../contexts/app-shell/AppShellContext';
import { useGuildContext } from '../contexts/guild/GuildContext';
import { useRecentGuilds } from '../contexts/recent-guilds/RecentGuildsContext';
import { useAuthedFetch } from '../contexts/session/AuthedFetchContext';
import { useSessionContext } from '../contexts/session/SessionContext';
import { Title } from '../utils/metaTitle';

type EditorProps = {
  serverID: string;
  path: string;
};

const Editor = (props: EditorProps) => {
  const { serverID } = props;
  const { session, isAuthenticated } = useSessionContext();
  const { authedFetch } = useAuthedFetch();
  const { pushRecentGuild } = useRecentGuilds();
  const appShellProps = useAppShellProps();
  const { getFullGuild, uncacheGuild, uncacheRemoteGuild } = useGuildContext();

  const [guild, setGuild] = React.useState<PresentableGuild | null | false>(null);
  const [pending, setPending] = React.useState(false);

  React.useEffect(() => {
    const shouldPullUncached = (): boolean => {
      const lastPull = sessionStorage.getItem('rp_editor_last_pull');
      if (!lastPull || Number(lastPull) < Date.now() - 1000 * 60 * 2) {
        // No last pull or 2 minutes since last pull
        sessionStorage.setItem('rp_editor_last_pull', String(Date.now()));
        return true;
      }

      return false;
    };
    const fetchGuild = async () => {
      const guild = await getFullGuild(serverID, shouldPullUncached());

      if (guild === null) {
        setGuild(false);
        return;
      }

      setGuild(guild);
    };

    if (guild === null) {
      fetchGuild();
    }
  }, [serverID, getFullGuild, guild]);

  React.useCallback((serverID) => pushRecentGuild(serverID), [pushRecentGuild])(serverID);

  // If the user is not authenticated, redirect to the login page.
  if (!isAuthenticated) {
    return <Redirect to={`/auth/login?r=${props.serverID}`} replace />;
  }

  // If the user is not an admin, they can't edit the guild
  // so we redirect them to the picker
  const guildSlug = session?.guilds?.find((guild) => guild.id === serverID);
  if (guildSlug && guildSlug?.permissionLevel === UserGuildPermissions.User) {
    return <Redirect to={`/s/${props.serverID}`} replace />;
  }

  // If the guild isn't loaded, render a loading placeholder
  if (guild === null) {
    return <GenericLoadingTemplate />;
  }

  // If the guild is not found, redirect to the picker page
  if (guild === false) {
    return <Redirect to={`/s/${props.serverID}`} replace />;
  }

  const onGuildChange = async (guild: PresentableGuild) => {
    if (pending) {
      return;
    }

    setPending(true);

    const updatePayload: Partial<GuildDataUpdate> = {
      message: guild.data.message,
      categories: guild.data.categories,
    };

    const response = await authedFetch(`/guilds/${serverID}`, {
      method: 'PATCH',
      body: JSON.stringify(updatePayload),
    });

    if (response.status === 200) {
      setGuild(guild);
      uncacheGuild(serverID);
      navigate(`/s/${props.serverID}`);
    }

    setPending(false);
  };

  const onRefreshCache = async () => {
    if (
      Number(sessionStorage.getItem('rp_editor_last_refresh')) >
      Date.now() - 1000 * 60 * 2
    ) {
      console.error('Slow down there partner!');
      return;
    }

    console.log('Refreshing cache');
    uncacheGuild(serverID);
    await uncacheRemoteGuild(serverID);
    sessionStorage.setItem('rp_editor_last_pull', String(Date.now()));
    sessionStorage.setItem('rp_editor_last_refresh', String(Date.now()));
    setGuild(null);
  };

  return (
    <>
      <Title title={`Editing ${guild.guild.name} - Roleypoly`} />
      <EditorTemplate
        {...appShellProps}
        guild={guild}
        onGuildChange={onGuildChange}
        onRefreshCache={onRefreshCache}
      />
    </>
  );
};

export default Editor;

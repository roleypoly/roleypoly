import { navigate, Redirect } from '@reach/router';
import { EditorAccessControlTemplate } from '@roleypoly/design-system/templates/editor-access-control';
import { GenericLoadingTemplate } from '@roleypoly/design-system/templates/generic-loading';
import {
  GuildAccessControl,
  GuildDataUpdate,
  PresentableGuild,
  UserGuildPermissions,
} from '@roleypoly/types';
import React from 'react';
import { useAppShellProps } from '../../contexts/app-shell/AppShellContext';
import { useGuildContext } from '../../contexts/guild/GuildContext';
import { useRecentGuilds } from '../../contexts/recent-guilds/RecentGuildsContext';
import { useAuthedFetch } from '../../contexts/session/AuthedFetchContext';
import { useSessionContext } from '../../contexts/session/SessionContext';

const AccessControlPage = (props: { serverID: string; path: string }) => {
  const { session, isAuthenticated } = useSessionContext();
  const { authedFetch } = useAuthedFetch();
  const { pushRecentGuild } = useRecentGuilds();
  const { getFullGuild, uncacheGuild } = useGuildContext();
  const appShellProps = useAppShellProps();

  const [guild, setGuild] = React.useState<PresentableGuild | null | false>(null);

  React.useEffect(() => {
    const fetchGuild = async () => {
      const guild = await getFullGuild(props.serverID);

      if (guild === null) {
        setGuild(false);
        return;
      }

      setGuild(guild);
    };

    fetchGuild();
  }, [props.serverID, getFullGuild]);

  React.useCallback(
    (serverID) => pushRecentGuild(serverID),
    [pushRecentGuild]
  )(props.serverID);

  // If the user is not authenticated, redirect to the login page.
  if (!isAuthenticated) {
    return <Redirect to={`/auth/login?r=${props.serverID}`} replace />;
  }

  // If the user is not an admin, they can't edit the guild
  // so we redirect them to the picker
  const guildSlug = session?.guilds?.find((guild) => guild.id === props.serverID);
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

  const onSubmit = async (accessControl: GuildAccessControl) => {
    const updatePayload: Partial<GuildDataUpdate> = {
      accessControl,
    };

    await authedFetch(`/update-guild/${props.serverID}`, {
      method: 'PATCH',
      body: JSON.stringify(updatePayload),
    });

    uncacheGuild(props.serverID);
    navigate(`/s/${props.serverID}/edit`);
  };

  return (
    <EditorAccessControlTemplate
      guild={guild}
      guildSlug={guild.guild}
      onSubmit={(data: any) => onSubmit(data)}
      onExit={() => navigate(`/s/${props.serverID}/edit`)}
      {...appShellProps}
    />
  );
};

export default AccessControlPage;

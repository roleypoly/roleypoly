import { Redirect } from '@reach/router';
import { EditorTemplate } from '@roleypoly/design-system/templates/editor';
import { GenericLoadingTemplate } from '@roleypoly/design-system/templates/generic-loading';
import {
  GuildDataUpdate,
  PresentableGuild,
  UserGuildPermissions,
} from '@roleypoly/types';
import * as React from 'react';
import { useAppShellProps } from '../contexts/app-shell/AppShellContext';
import { useRecentGuilds } from '../contexts/recent-guilds/RecentGuildsContext';
import { useSessionContext } from '../contexts/session/SessionContext';
import { Title } from '../utils/metaTitle';

type EditorProps = {
  serverID: string;
  path: string;
};

const Editor = (props: EditorProps) => {
  const { serverID } = props;
  const { session, authedFetch, isAuthenticated } = useSessionContext();
  const { pushRecentGuild } = useRecentGuilds();
  const appShellProps = useAppShellProps();

  const [guild, setGuild] = React.useState<PresentableGuild | null | false>(null);
  const [pending, setPending] = React.useState(false);

  React.useEffect(() => {
    const fetchGuild = async () => {
      const response = await authedFetch(`/get-picker-data/${serverID}`);
      const data = await response.json();

      if (response.status !== 200) {
        setGuild(false);
        return;
      }

      setGuild(data);
    };

    fetchGuild();
  }, [serverID, authedFetch]);

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

    const updatePayload: GuildDataUpdate = {
      message: guild.data.message,
      categories: guild.data.categories,
    };

    const response = await authedFetch(`/update-guild/${serverID}`, {
      method: 'PATCH',
      body: JSON.stringify(updatePayload),
    });

    if (response.status === 200) {
      setGuild(guild);
      setPending(false);
    }
  };

  return (
    <>
      <Title title={`Editing ${guild.guild.name} - Roleypoly`} />
      <EditorTemplate {...appShellProps} guild={guild} onGuildChange={onGuildChange} />
    </>
  );
};

export default Editor;

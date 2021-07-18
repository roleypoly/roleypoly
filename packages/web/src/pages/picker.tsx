import { navigate, Redirect } from '@reach/router';
import { GenericLoadingTemplate } from '@roleypoly/design-system/templates/generic-loading';
import { RolePickerTemplate } from '@roleypoly/design-system/templates/role-picker';
import { ServerSetupTemplate } from '@roleypoly/design-system/templates/server-setup';
import { PresentableGuild, RoleUpdate, UserGuildPermissions } from '@roleypoly/types';
import * as React from 'react';
import { useAppShellProps } from '../contexts/app-shell/AppShellContext';
import { useGuildContext } from '../contexts/guild/GuildContext';
import { useRecentGuilds } from '../contexts/recent-guilds/RecentGuildsContext';
import { useSessionContext } from '../contexts/session/SessionContext';
import { Title } from '../utils/metaTitle';
import { makeRoleTransactions } from '../utils/roleTransactions';

type PickerProps = {
  serverID: string;
  path: string;
};

const Picker = (props: PickerProps) => {
  const { session, authedFetch, isAuthenticated } = useSessionContext();
  const { pushRecentGuild } = useRecentGuilds();
  const appShellProps = useAppShellProps();
  const { getFullGuild, uncacheGuild } = useGuildContext();

  const [pickerData, setPickerData] = React.useState<PresentableGuild | null | false>(
    null
  );
  const [pending, setPending] = React.useState(false);

  React.useEffect(() => {
    const fetchPickerData = async () => {
      const data = await getFullGuild(props.serverID);

      if (data === false) {
        navigate('/error/accessControlViolation');
        return;
      }

      if (data === null) {
        setPickerData(false);
        return;
      }

      setPickerData(data);
    };

    fetchPickerData();
  }, [props.serverID, getFullGuild]);

  React.useCallback(
    (serverID) => pushRecentGuild(serverID),
    [pushRecentGuild]
  )(props.serverID);

  if (!isAuthenticated) {
    return <Redirect to={`/auth/login?r=${props.serverID}`} replace />;
  }

  if (pickerData === null) {
    return <GenericLoadingTemplate />;
  }

  if (pickerData === false) {
    if (session && session.user && session.guilds) {
      const guildSlug = session.guilds.find((guild) => guild.id === props.serverID);

      if (!guildSlug) {
        console.error({ error: 'guold not in session, 404' });
        return <Redirect to="/error/404" replace />;
      }

      return (
        <ServerSetupTemplate
          activeGuildId={props.serverID}
          guildSlug={guildSlug}
          {...appShellProps}
        />
      );
    }

    console.error({ error: 'session state is odd, 404' });
    return <Redirect to="/error/404" replace />;
  }

  const onSubmit = async (submittedRoles: string[]) => {
    if (pending === true) {
      return;
    }

    setPending(true);
    const updatePayload: RoleUpdate = {
      knownState: pickerData.member.roles,
      transactions: makeRoleTransactions(pickerData.member.roles, submittedRoles),
    };

    uncacheGuild(props.serverID);
    const response = await authedFetch(`/update-roles/${props.serverID}`, {
      method: 'PATCH',
      body: JSON.stringify(updatePayload),
    });
    if (response.status === 200) {
      setPickerData({
        ...pickerData,
        member: { ...pickerData.member, roles: (await response.json()).roles },
      });
    }

    setPending(false);
  };

  return (
    <>
      <Title title={`${pickerData.guild.name} - Roleypoly`} />
      <RolePickerTemplate
        activeGuildId={props.serverID}
        {...appShellProps}
        guild={pickerData.guild}
        guildData={pickerData.data}
        member={pickerData.member}
        roles={pickerData.roles}
        editable={pickerData.guild.permissionLevel > UserGuildPermissions.User}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default Picker;

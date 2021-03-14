import { Redirect } from '@reach/router';
import { RolePickerTemplate } from '@roleypoly/design-system/templates/role-picker';
import { ServerSetupTemplate } from '@roleypoly/design-system/templates/server-setup';
import { PresentableGuild, RoleUpdate, UserGuildPermissions } from '@roleypoly/types';
import * as React from 'react';
import { useAppShellProps } from '../contexts/app-shell/AppShellContext';
import { useRecentGuilds } from '../contexts/recent-guilds/RecentGuildsContext';
import { useSessionContext } from '../contexts/session/SessionContext';
import { Title } from '../utils/metaTitle';
import { makeRoleTransactions } from '../utils/roleTransactions';

type PickerProps = {
    serverID: string;
};

const Picker = (props: PickerProps) => {
    const { session, authedFetch, isAuthenticated } = useSessionContext();
    const { pushRecentGuild } = useRecentGuilds();
    const appShellProps = useAppShellProps();

    const [pickerData, setPickerData] = React.useState<PresentableGuild | null | false>(
        null
    );
    const [pending, setPending] = React.useState(false);

    React.useEffect(() => {
        const fetchPickerData = async () => {
            const response = await authedFetch(`/get-picker-data/${props.serverID}`);
            const data = await response.json();

            if (response.status !== 200) {
                setPickerData(false);
                return;
            }

            setPickerData(data);
        };

        fetchPickerData();
    }, [props.serverID, authedFetch, pushRecentGuild]);

    React.useCallback((serverID) => pushRecentGuild(serverID), [pushRecentGuild])(
        props.serverID
    );

    if (!isAuthenticated) {
        return <Redirect to={`/auth/login?r=${props.serverID}`} replace />;
    }

    if (pickerData === null) {
        return <div>Loading...</div>;
    }

    if (pickerData === false) {
        if (session && session.user && session.guilds) {
            const guildSlug = session.guilds.find((guild) => guild.id === props.serverID);
            if (!guildSlug) {
                throw new Error('placeholder: guild not found in user slugs, 404');
            }

            return (
                <ServerSetupTemplate
                    activeGuildId={props.serverID}
                    guildSlug={guildSlug}
                    {...appShellProps}
                />
            );
        }

        throw new Error('placeholder: session state is odd, 404');
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

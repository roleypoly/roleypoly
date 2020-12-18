import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import * as React from 'react';
import { PresentableGuild, UserGuildPermissions } from 'roleypoly/common/types';
import { apiFetch } from 'roleypoly/common/utils/isomorphicFetch';
import { RolePickerTemplate } from 'roleypoly/design-system/templates/role-picker';
import { useAppShellProps } from 'roleypoly/providers/appShellData';

type Props = {
    data: PresentableGuild;
};

const RolePickerPage: NextPage<Props> = (props) => {
    const { appShellProps } = useAppShellProps();

    return (
        <>
            <Head>
                <title>Picking roles on {props.data.guild.name} - Roleypoly</title>
            </Head>
            <RolePickerTemplate
                user={appShellProps.user}
                guilds={appShellProps.guilds}
                guild={props.data.guild}
                roles={props.data.roles}
                guildData={props.data.data}
                member={props.data.member}
                editable={props.data.guild.permissionLevel !== UserGuildPermissions.User}
                activeGuildId={props.data.id}
                onSubmit={(i) => {
                    console.log(i);
                }}
            />
        </>
    );
};

RolePickerPage.getInitialProps = async (context: NextPageContext): Promise<Props> => {
    const serverID = context.query.id;
    if (!serverID) {
        throw new Error('serverID missing');
    }

    const pickerData = await apiFetch<PresentableGuild>(
        `/get-picker-data/${serverID}`,
        undefined,
        context
    );

    if (!pickerData) {
        throw new Error('TODO: picker fetch failed');
    }

    return {
        data: pickerData,
    };
};

export default RolePickerPage;

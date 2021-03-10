import { RolePickerTemplate } from '@roleypoly/design-system/templates/role-picker';
import { NextPage, NextPageContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import * as React from 'react';
import {
    Member,
    PresentableGuild,
    Role,
    RoleTransaction,
    RoleUpdate,
    TransactionType,
    UserGuildPermissions,
} from 'roleypoly/common/types';
import { apiFetch, getSessionKey } from 'roleypoly/common/utils/isomorphicFetch';
import { useAppShellProps } from 'roleypoly/providers/appShellData';

type Props =
    | {
          data: PresentableGuild;
          redirect: null;
      }
    | {
          data: null;
          redirect: string;
      };

const createUpdatePayload = (
    oldRoles: Role['id'][],
    newRoles: Role['id'][]
): RoleTransaction[] => {
    const transactions: RoleTransaction[] = [];

    // Removes: old roles not in new roles
    for (let oldID of oldRoles) {
        if (!newRoles.includes(oldID)) {
            transactions.push({
                id: oldID,
                action: TransactionType.Remove,
            });
        }
    }

    // Adds: new roles not in old roles
    for (let newID of newRoles) {
        if (!oldRoles.includes(newID)) {
            transactions.push({
                id: newID,
                action: TransactionType.Add,
            });
        }
    }

    return transactions;
};

const RolePickerPage: NextPage<Props> = (props) => {
    const router = useRouter();

    React.useEffect(() => {
        if (props.redirect !== null) {
            void router.replace(props.redirect || '/auth/login');
        }
    }, [props.redirect]);

    if (!props.data) {
        return null;
    }

    const { appShellProps } = useAppShellProps();

    const [isPending, updatePending] = React.useState(false);
    const [memberRoles, updateMemberRoles] = React.useState(props.data.member.roles);

    const handlePickerSubmit = (guildID: string, oldRoles: Role['id'][]) => async (
        newRoles: Role['id'][]
    ) => {
        if (isPending) {
            return;
        }

        updatePending(true);

        const payload: RoleUpdate = {
            knownState: oldRoles,
            transactions: createUpdatePayload(oldRoles, newRoles),
        };

        const patchedMember = await apiFetch<Member>(`/update-roles/${guildID}`, {
            method: 'PATCH',
            body: JSON.stringify(payload),
        });

        if (!patchedMember) {
            console.error('role update failed', patchedMember);
            return;
        }

        updatePending(false);
        updateMemberRoles(patchedMember.roles);
        console.log('accepted', { patchedMember });
    };

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
                member={{ ...props.data.member, roles: memberRoles }}
                editable={props.data.guild.permissionLevel !== UserGuildPermissions.User}
                activeGuildId={props.data.id}
                onSubmit={handlePickerSubmit(props.data.id, memberRoles)}
            />
        </>
    );
};

RolePickerPage.getInitialProps = async (context: NextPageContext): Promise<Props> => {
    const serverID = context.query.id;
    if (!serverID) {
        throw new Error('serverID missing');
    }

    if (!getSessionKey()) {
        return {
            data: null,
            redirect: `/auth/login?r=${serverID}`,
        };
    }

    try {
        const pickerData = await apiFetch<PresentableGuild>(
            `/get-picker-data/${serverID}`,
            undefined,
            context
        );

        if (!pickerData) {
            throw new Error('Picker data failed.');
        }
        return {
            data: pickerData,
            redirect: null,
        };
    } catch (e) {
        return {
            data: null,
            redirect: `/auth/login?r=${serverID}`,
        };
    }
};

export default RolePickerPage;

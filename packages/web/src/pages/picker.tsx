import { RolePickerTemplate } from '@roleypoly/design-system/templates/role-picker';
import { PresentableGuild, UserGuildPermissions } from '@roleypoly/types';
import * as React from 'react';
import { useSessionContext } from '../session-context/SessionContext';

type PickerProps = {
    serverID: string;
};

const Picker = (props: PickerProps) => {
    const { session, authedFetch } = useSessionContext();

    const [pickerData, setPickerData] = React.useState<PresentableGuild | null>(null);

    React.useEffect(() => {
        const fetchPickerData = async () => {
            const response = await authedFetch(`/get-picker-data/${props.serverID}`);
            const data = await response.json();

            setPickerData(data);
        };

        fetchPickerData();
    }, [props.serverID, authedFetch]);

    if (pickerData === null) {
        return <div>Loading...</div>;
    }

    return (
        <RolePickerTemplate
            activeGuildId={props.serverID}
            user={session?.user}
            guilds={session?.guilds || []}
            guild={pickerData.guild}
            guildData={pickerData.data}
            member={pickerData.member}
            roles={pickerData.roles}
            onSubmit={(args) => console.log('onSubmit', ...args)}
            editable={pickerData.guild.permissionLevel > UserGuildPermissions.User}
        />
    );
};

export default Picker;

import * as React from 'react';
import { RolePickerTemplate, RolePickerTemplateProps } from './RolePicker';
import {
    guildData,
    member,
    guildRoles,
    guild,
    rpUser,
    guildEnum,
} from 'roleypoly/src/design-system/shared-types/storyData';

const props: RolePickerTemplateProps = {
    guildData: {
        ...guildData,
        message:
            'Hey, this is kind of a demo setup so features/use cases can be shown off.\n\nThanks for using Roleypoly <3',
    },
    member: member,
    guild: guild,
    roles: guildRoles,
    editable: false,
    user: rpUser,
    guildEnumeration: guildEnum,
    activeGuildId: guild.id,
};

export default {
    title: 'Templates/Role Picker',
    components: RolePickerTemplate,
    args: props,
};

export const Default = (args) => {
    return <RolePickerTemplate {...args} />;
};

export const Editable = (args) => {
    return <RolePickerTemplate {...args} />;
};
Editable.args = {
    editable: true,
};

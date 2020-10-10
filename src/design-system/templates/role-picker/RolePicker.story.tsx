import * as React from 'react';
import { templateStories } from 'templates/templates.story';
import { RolePickerTemplate, RolePickerTemplateProps } from './RolePicker';
import {
    guildData,
    member,
    guildRoles,
    guild,
    rpUser,
    guildEnum,
} from 'hack/fixtures/storyData';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';

const story = templateStories('Role Picker', module);

const props: RolePickerTemplateProps = {
    guildData: {
        ...guildData,
        message:
            'Hey, this is kind of a demo setup so features/use cases can be shown off.\n\nThanks for using Roleypoly <3',
    },
    member: member,
    guild: guild,
    roles: guildRoles,
    onSubmit: action('onSubmit'),
    editable: false,
    user: rpUser,
    guildEnumeration: guildEnum,
    activeGuildId: guild.id,
};

story.add('Role Picker', () => {
    return <RolePickerTemplate {...props} editable={boolean('Editable', false)} />;
});

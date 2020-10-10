import * as React from 'react';
import { RolePicker, RolePickerProps } from './RolePicker';
import { organismStories } from 'organisms/organisms.story';
import { guildData, member, guildRoles, guild } from 'hack/fixtures/storyData';
import { action } from '@storybook/addon-actions';

const storyPublic = organismStories('Role Picker/Public', module);
const storyEditable = organismStories('Role Picker/Editable', module);

const props: RolePickerProps = {
    guildData: guildData,
    member: member,
    guild: guild,
    roles: guildRoles,
    onSubmit: action('onSubmit'),
    editable: false,
};

const storyBuilder = (
    story: typeof storyPublic,
    mixinProps: Partial<RolePickerProps>
) => {
    story.add('Full', () => <RolePicker {...{ ...props, ...mixinProps }} />);
    story.add('No Message', () => (
        <RolePicker
            {...{
                ...props,
                guildData: { ...props.guildData, message: '' },
                ...mixinProps,
            }}
        />
    ));
    story.add('No Categories', () => (
        <RolePicker
            {...{
                ...props,
                guildData: { ...props.guildData, message: '', categoriesList: [] },
                ...mixinProps,
            }}
        />
    ));
};

storyBuilder(storyPublic, {});
storyBuilder(storyEditable, { editable: true });

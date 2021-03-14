import * as React from 'react';
import {
  guild,
  guildData,
  guildEnum,
  mastheadSlugs,
  member,
  roleCategory,
  roleCategory2,
  user,
} from '../../fixtures/storyData';
import { RolePickerTemplate, RolePickerTemplateProps } from './RolePicker';

const props: RolePickerTemplateProps = {
  guildData: {
    ...guildData,
    message:
      'Hey, this is kind of a demo setup so features/use cases can be shown off.\n\nThanks for using Roleypoly <3',
  },
  member: member,
  guild: guild,
  guilds: mastheadSlugs,
  roles: [...roleCategory, ...roleCategory2],
  editable: false,
  user: user,
  guildEnumeration: guildEnum,
  activeGuildId: guild.id,
  onSubmit: () => {},
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

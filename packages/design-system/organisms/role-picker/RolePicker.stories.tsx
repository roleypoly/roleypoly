import * as React from 'react';
import {
  guild,
  guildData,
  member,
  roleCategory,
  roleCategory2,
} from '../../fixtures/storyData';
import { RolePicker, RolePickerProps } from './RolePicker';

const props: Partial<RolePickerProps> = {
  guildData: guildData,
  member: member,
  guild: guild,
  roles: [...roleCategory, ...roleCategory2],
  editable: false,
};

const noMessageArgs: Partial<RolePickerProps> = {
  ...props,
  guildData: {
    ...guildData,
    message: '',
  },
};

const noCategoriesArgs: Partial<RolePickerProps> = {
  ...props,
  guildData: {
    ...guildData,
    categoriesList: [],
  },
};

const emptyArgs = {
  ...props,
  guildData: {
    ...guildData,
    categoriesList: [],
    message: '',
  },
};

export default {
  title: 'Organisms/Role Picker',
  args: props,
  component: RolePicker,
};

export const Full = (args) => <RolePicker {...args} />;
export const EditableFull = (args) => <RolePicker {...args} />;
EditableFull.args = {
  editable: true,
};
export const NoMessage = (args) => <RolePicker {...args} />;
NoMessage.args = noMessageArgs;
export const NoCategories = (args) => <RolePicker {...args} />;
NoCategories.args = noCategoriesArgs;
export const Empty = (args) => <RolePicker {...args} />;
Empty.args = emptyArgs;

import * as React from 'react';
import { mockCategory, roleCategory } from '../../fixtures/storyData';
import { EditorCategory } from './EditorCategory';

export default {
  title: 'Molecules/Editor Category',
  component: EditorCategory,
  args: {
    title: 'Pronouns',
    roles: roleCategory,
    category: mockCategory,
    selectedRoles: [],
  },
};

export const Default = (args) => {
  return <EditorCategory {...args} />;
};
export const Single = (args) => {
  return <EditorCategory {...args} type="single" />;
};
Single.args = {
  type: 'single',
};
export const Multi = (args) => {
  return <EditorCategory {...args} type="single" />;
};
Multi.args = {
  type: 'multi',
};

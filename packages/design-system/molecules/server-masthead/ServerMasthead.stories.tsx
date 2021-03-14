import * as React from 'react';
import { guild } from '../../fixtures/storyData';
import { ServerMasthead } from './ServerMasthead';

export default {
  title: 'Molecules/Server Masthead',
  args: {
    editable: false,
    guild,
  },
};

export const Default = (args) => <ServerMasthead {...args} />;
export const Editable = (args) => <ServerMasthead {...args} />;
Editable.args = {
  editable: true,
};

import * as React from 'react';
import { ServerMasthead } from './ServerMasthead';
import { guild } from 'roleypoly/common/types/storyData';

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

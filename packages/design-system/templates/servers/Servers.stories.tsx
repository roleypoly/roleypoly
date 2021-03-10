import * as React from 'react';
import { ServersTemplate } from '.';
import { mastheadSlugs, user } from '../../fixtures/storyData';

export default {
    title: 'Templates/Servers Page',
    args: {
        guilds: mastheadSlugs,
        user: user,
    },
};

export const serversPage = (args) => <ServersTemplate {...args} />;

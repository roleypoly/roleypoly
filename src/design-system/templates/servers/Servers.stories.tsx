import * as React from 'react';
import { mastheadSlugs, user } from 'roleypoly/common/types/storyData';
import { ServersTemplate } from '.';

export default {
    title: 'Templates/Servers Page',
    args: {
        guilds: mastheadSlugs,
        user: user,
    },
};

export const serversPage = (args) => <ServersTemplate {...args} />;

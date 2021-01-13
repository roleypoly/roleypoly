import * as React from 'react';
import { mastheadSlugs, user } from 'roleypoly/common/types/storyData';
import { ServerSetupTemplate } from './ServerSetup';

export default {
    title: 'Templates/Server Setup',
    component: ServerSetupTemplate,
    args: {
        guilds: mastheadSlugs,
        user: user,
        guildSlug: mastheadSlugs[1],
    },
};

export const serverSetup = (args) => <ServerSetupTemplate {...args} />;

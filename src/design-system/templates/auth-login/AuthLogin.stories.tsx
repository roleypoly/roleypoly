import * as React from 'react';
import { AuthLogin } from './AuthLogin';
import { guild } from 'roleypoly/src/design-system/shared-types/storyData';

export default {
    title: 'Templates/Auth: Login',
    args: {
        botName: 'roleypoly#3266',
    },
};

export const NoSlug = (args) => <AuthLogin {...args} />;

export const WithSlug = (args) => <AuthLogin {...args} />;
WithSlug.args = {
    guildSlug: guild,
};

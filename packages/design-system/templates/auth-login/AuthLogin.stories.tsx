import * as React from 'react';
import { guild } from '../../fixtures/storyData';
import { AuthLogin } from './AuthLogin';

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

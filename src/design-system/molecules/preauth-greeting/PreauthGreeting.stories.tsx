import * as React from 'react';
import { PreauthGreeting } from './PreauthGreeting';
import { guild } from 'roleypoly/src/design-system/shared-types/storyData';

export default {
    title: 'Molecules/Preauth/Greeting',
    component: PreauthGreeting,
    args: {
        guildSlug: guild,
    },
};

export const Greeting = (args) => <PreauthGreeting {...args} />;

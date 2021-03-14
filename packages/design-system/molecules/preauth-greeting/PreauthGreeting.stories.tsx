import * as React from 'react';
import { mastheadSlugs } from '../../fixtures/storyData';
import { PreauthGreeting } from './PreauthGreeting';

export default {
  title: 'Molecules/Preauth/Greeting',
  component: PreauthGreeting,
  args: {
    guildSlug: mastheadSlugs[0],
  },
};

export const Greeting = (args) => <PreauthGreeting {...args} />;

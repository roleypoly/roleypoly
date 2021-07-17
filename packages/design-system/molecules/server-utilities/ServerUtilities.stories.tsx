import { guildData } from '@roleypoly/design-system/fixtures/storyData';
import { ServerUtilities } from './ServerUtilities';

export default {
  title: 'Molecules/Server Utilities',
  component: ServerUtilities,
  args: {
    guildData: guildData,
  },
};

export const serverUtilities = (args) => <ServerUtilities {...args} />;

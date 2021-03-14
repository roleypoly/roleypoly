import { roleypolyGuild } from '../../fixtures/storyData';
import { ServerListingCard } from './ServerListingCard';

export default {
  title: 'Molecules/Server Listing Card',
  component: ServerListingCard,
  args: {
    guild: { ...roleypolyGuild, permissionLevel: 4 },
  },
};

export const serverListingCard = (args) => <ServerListingCard {...args} />;

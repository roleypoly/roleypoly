import { mastheadSlugs } from 'roleypoly/common/types/storyData';
import { ServersListing } from './ServersListing';

export default {
    title: 'Organisms/Servers Listing',
    component: ServersListing,
    args: {
        guilds: mastheadSlugs,
    },
};

export const serversListing = (args) => <ServersListing {...args} />;

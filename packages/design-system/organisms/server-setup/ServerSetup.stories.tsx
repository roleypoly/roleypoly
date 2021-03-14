import { UserGuildPermissions } from '@roleypoly/types';
import { mastheadSlugs } from '../../fixtures/storyData';
import { ServerSetup } from './ServerSetup';

export default {
  title: 'Organisms/Server Setup',
  component: ServerSetup,
};

export const asAdmin = () => (
  <ServerSetup
    guildSlug={{ ...mastheadSlugs[1], permissionLevel: UserGuildPermissions.Admin }}
  />
);
export const asManager = () => (
  <ServerSetup
    guildSlug={{
      ...mastheadSlugs[1],
      permissionLevel: UserGuildPermissions.Manager,
    }}
  />
);
export const asUser = () => (
  <ServerSetup guildSlug={{ ...mastheadSlugs[1], permissionLevel: 0 }} />
);

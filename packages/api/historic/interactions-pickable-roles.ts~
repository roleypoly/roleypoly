import { Category, CategorySlug } from '@roleypoly/types';
import { respond } from '@roleypoly/worker-utils';
import { interactionsEndpoint } from '../utils/api-tools';
import { getGuildData } from '../utils/guild';
import { notFound } from '../utils/responses';

export const InteractionsPickableRoles = interactionsEndpoint(
  async (request: Request): Promise<Response> => {
    const reqURL = new URL(request.url);
    const [, , serverID] = reqURL.pathname.split('/');

    const guildData = await getGuildData(serverID);
    if (!guildData) {
      return notFound();
    }

    const roleMap: Record<Category['name'], CategorySlug> = {};

    for (let category of guildData.categories) {
      if (category.hidden) {
        continue;
      }

      // TODO: role safety?
      roleMap[category.name] = {
        roles: category.roles,
        type: category.type,
      };
    }

    return respond(roleMap);
  }
);

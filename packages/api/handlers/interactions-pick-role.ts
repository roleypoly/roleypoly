import { interactionsEndpoint } from '../utils/api-tools';
import { getGuildData } from '../utils/guild';
import { invalid, notFound, ok } from '../utils/responses';

export const InteractionsPickRole = interactionsEndpoint(
  async (request: Request): Promise<Response> => {
    const reqURL = new URL(request.url);
    const [, , serverID, userID, roleID] = reqURL.pathname.split('/');
    if (!serverID || !userID || !roleID) {
      return invalid();
    }

    const guildData = await getGuildData(serverID);
    if (!guildData) {
      return notFound();
    }

    // We get exactly one role, but we have to interact with it the same way as UI does.
    // So check for safety, disable any "single" mode roles

    return ok();
  }
);

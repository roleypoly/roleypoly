import { respond } from '@roleypoly/api/utils/api-tools';
import { asEditor } from '@roleypoly/api/utils/guild';
import {
  fetchLegacyServer,
  transformLegacyGuild,
} from '@roleypoly/api/utils/import-from-legacy';
import { notFound } from '@roleypoly/api/utils/responses';

export const FetchFromLegacy = asEditor({}, (session, { guildID }) => async () => {
  const legacyGuild = await fetchLegacyServer(guildID);
  if (!legacyGuild) {
    return notFound();
  }

  const transformedGuild = transformLegacyGuild(legacyGuild);

  return respond(transformedGuild);
});

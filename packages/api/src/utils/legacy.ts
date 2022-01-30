import { Config } from '@roleypoly/api/src/utils/config';
import { getID } from '@roleypoly/api/src/utils/id';
import { sortBy } from '@roleypoly/misc-utils/sortBy';
import { CategoryType, Features, GuildData } from '@roleypoly/types';

export type LegacyCategory = {
  id: string;
  name: string;
  roles: string[];
  hidden: boolean;
  type: 'single' | 'multi';
  position: number;
};

export type LegacyGuildData = {
  id: string;
  categories: LegacyCategory[];
  message: string;
};

export const fetchLegacyServer = async (
  config: Config,
  id: string
): Promise<LegacyGuildData | null> => {
  if (!config.interactionsSharedKey) {
    return null;
  }

  const guildDataResponse = await fetch(
    `https://beta.roleypoly.com/x/import-to-next/${id}`,
    {
      headers: {
        authorization: `Shared ${config.importSharedKey}`,
      },
    }
  );

  if (guildDataResponse.status === 404) {
    return null;
  }

  if (guildDataResponse.status !== 200) {
    throw new Error('Guild data fetch failed');
  }

  return await guildDataResponse.json();
};

export const transformLegacyGuild = (guild: LegacyGuildData): GuildData => {
  return {
    id: guild.id,
    message: guild.message,
    features: Features.LegacyGuild,
    auditLogWebhook: null,
    accessControl: {
      allowList: [],
      blockList: [],
      blockPending: true,
    },
    categories: sortBy(Object.values(guild.categories), 'position').map(
      (category, idx) => ({
        ...category,
        id: getID(),
        position: idx, // Reset positions by index. May have side-effects but oh well.
        type: category.type === 'multi' ? CategoryType.Multi : CategoryType.Single,
      })
    ),
  };
};

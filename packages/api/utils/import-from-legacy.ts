import { sortBy } from '@roleypoly/misc-utils/sortBy';
import { CategoryType, Features, GuildData } from '@roleypoly/types';
import KSUID from 'ksuid';
import { importSharedKey } from './config';

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

export const fetchLegacyServer = async (id: string): Promise<LegacyGuildData | null> => {
  const guildDataResponse = await fetch(
    `https://beta.roleypoly.com/x/import-to-next/${id}`,
    {
      headers: {
        authorization: `Shared ${importSharedKey}`,
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
    categories: sortBy(guild.categories, 'position').map((category, idx) => ({
      ...category,
      id: KSUID.randomSync().string,
      position: idx, // Reset positions by index. May have side-effects but oh well.
      type: category.type === 'multi' ? CategoryType.Multi : CategoryType.Single,
    })),
  };
};

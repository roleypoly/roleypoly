import { sortBy } from '@roleypoly/misc-utils/sortBy';
import { GuildSlug } from '@roleypoly/types';

type RecentAndSortedT = {
  recentGuildSlugs: GuildSlug[];
  sortedGuildSlugs: GuildSlug[];
};

export const getRecentAndSortedGuilds = (
  guilds: GuildSlug[],
  recentGuilds: string[]
): RecentAndSortedT => {
  return {
    recentGuildSlugs: recentGuilds.reduce<GuildSlug[]>((acc, id) => {
      const guild = guilds.find((guild) => guild.id === id);
      if (guild) {
        acc.push(guild);
      }

      return acc;
    }, []),
    sortedGuildSlugs: sortBy(guilds, 'name', (a: string, b: string) =>
      a.toLowerCase() > b.toLowerCase() ? 1 : -1
    ),
  };
};

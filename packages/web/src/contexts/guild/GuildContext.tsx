import { GuildSlug, PresentableGuild } from '@roleypoly/types';
import React from 'react';
import { useApiContext } from '../api/ApiContext';
import { useAuthedFetch } from '../session/AuthedFetchContext';
import { useSessionContext } from '../session/SessionContext';

const CACHE_HOLD_TIME = 2 * 60 * 1000; // 2 minutes

type StoredGuild<T extends PresentableGuild | GuildSlug> = {
  user: string;
  guild: T;
  expiresAt: number;
};

type GuildContextT = {
  getFullGuild: (
    id: string,
    uncached?: boolean
  ) => Promise<PresentableGuild | null | false>;
  getGuildSlug: (id: string) => Promise<GuildSlug | null>;
  uncacheGuild: (id: string) => void;
};

export const GuildContext = React.createContext<GuildContextT>({
  getFullGuild: (id: string) => Promise.reject(new Error('Not implemented')),
  getGuildSlug: (id: string) => Promise.reject(new Error('Not implemented')),
  uncacheGuild: (id: string) => {},
});

export const useGuildContext = () => React.useContext(GuildContext);

export const GuildProvider = (props: { children: React.ReactNode }) => {
  const { session } = useSessionContext();
  const { authedFetch } = useAuthedFetch();
  const { fetch } = useApiContext();

  const guildContextValue: GuildContextT = {
    getGuildSlug: async (id: string) => {
      const cachedSlug = sessionStorage.getItem(`guild-slug-${id}`);
      if (cachedSlug) {
        const storedSlug = JSON.parse(cachedSlug) as StoredGuild<GuildSlug>;
        if (storedSlug.user === session.user?.id && storedSlug.expiresAt > Date.now()) {
          return storedSlug.guild;
        }
      }

      // Slug could also be cached via a PresentableGuild
      const cachedGuild = sessionStorage.getItem(`guild-${id}`);
      if (cachedGuild) {
        const storedGuild = JSON.parse(cachedGuild) as StoredGuild<PresentableGuild>;
        if (storedGuild.user === session.user?.id && storedGuild.expiresAt > Date.now()) {
          sessionStorage.setItem(`guild-slug-${id}`, JSON.stringify(storedGuild.guild));
          return storedGuild.guild.guild;
        }
      }

      const response = await fetch(`/guilds/${id}/slug`);
      if (response.status !== 200) {
        return null;
      }
      const slug = await response.json();

      const storedSlug: StoredGuild<GuildSlug> = {
        user: session.user?.id || 'none',
        guild: slug,
        expiresAt: Date.now() + CACHE_HOLD_TIME,
      };

      sessionStorage.setItem(`guild-slug-${id}`, JSON.stringify(storedSlug));

      return slug;
    },
    getFullGuild: async (id: string, uncached: boolean = false) => {
      if (!uncached) {
        const cachedGuild = sessionStorage.getItem(`guild-${id}`);
        if (cachedGuild) {
          const storedGuild = JSON.parse(cachedGuild);
          if (
            storedGuild.user === session.user?.id &&
            storedGuild.expiresAt > Date.now()
          ) {
            return storedGuild.guild;
          }
        }
      }

      const skipCache = uncached ? '?__no_cache' : '';
      const response = await authedFetch(`/guilds/${id}${skipCache}`);
      const guild: PresentableGuild = await response.json();

      if (response.status !== 200) {
        if (response.status === 403) {
          return false;
        }

        return null;
      }

      const storedGuild: StoredGuild<PresentableGuild> = {
        user: session.user?.id || 'none',
        guild,
        expiresAt: Date.now() + CACHE_HOLD_TIME,
      };

      sessionStorage.setItem(`guild-${id}`, JSON.stringify(storedGuild));
      return guild;
    },
    uncacheGuild: (id: string) => {
      sessionStorage.removeItem(`guild-${id}`);
    },
  };

  return (
    <GuildContext.Provider value={guildContextValue}>
      {props.children}
    </GuildContext.Provider>
  );
};

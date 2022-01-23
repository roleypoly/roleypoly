import { CompletelyStylelessLink } from '@roleypoly/design-system/atoms/typography';
import { ServerListingCard } from '@roleypoly/design-system/molecules/server-listing-card';
import { getRecentAndSortedGuilds } from '@roleypoly/misc-utils/guildListing';
import { GuildSlug } from '@roleypoly/types';
import * as React from 'react';
import { GoHistory, GoListUnordered } from 'react-icons/go';
import {
  CardContainer,
  ContentContainer,
  Line,
  SectionHead,
} from './ServersListing.styled';

type ServersListingProps = {
  guilds: GuildSlug[];
  recentGuilds: string[];
};

const CardList = (props: { guilds: GuildSlug[] }) => (
  <>
    {props.guilds.map((guild, idx) => (
      <CardContainer key={idx}>
        <CompletelyStylelessLink to={`/s/${guild.id}`}>
          <ServerListingCard guild={guild} />
        </CompletelyStylelessLink>
      </CardContainer>
    ))}
  </>
);

export const ServersListing = (props: ServersListingProps) => {
  const { recentGuildSlugs, sortedGuildSlugs } = getRecentAndSortedGuilds(
    props.guilds,
    props.recentGuilds
  );

  return (
    <ContentContainer>
      {recentGuildSlugs.length !== 0 && (
        <>
          <SectionHead>
            <GoHistory />
            &nbsp; Recent Servers
            <Line />
          </SectionHead>
          <CardList guilds={recentGuildSlugs} />
        </>
      )}
      <SectionHead>
        <GoListUnordered />
        &nbsp; All Servers
        <Line />
      </SectionHead>
      <CardList guilds={sortedGuildSlugs} />
    </ContentContainer>
  );
};

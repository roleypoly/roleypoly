import { CompletelyStylelessLink } from '@roleypoly/design-system/atoms/typography';
import { ServerListingCard } from '@roleypoly/design-system/molecules/server-listing-card';
import { getRecentAndSortedGuilds } from '@roleypoly/misc-utils/guildListing';
import { GuildSlug } from '@roleypoly/types';
import * as React from 'react';
import { CardContainer, ContentContainer, SectionHead } from './ServersListing.styled';

type ServersListingProps = {
    guilds: GuildSlug[];
    recentGuilds: string[];
};

const CardList = (props: { guilds: GuildSlug[] }) => (
    <>
        {props.guilds.map((guild, idx) => (
            <CardContainer key={idx}>
                <a href={`/s/${guild.id}`}>
                    <CompletelyStylelessLink>
                        <ServerListingCard guild={guild} />
                    </CompletelyStylelessLink>
                </a>
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
            {recentGuildSlugs && (
                <>
                    <SectionHead>Recent Guilds</SectionHead>
                    <CardList guilds={recentGuildSlugs} />
                    <SectionHead>All Guilds</SectionHead>
                </>
            )}
            <CardList guilds={sortedGuildSlugs} />
        </ContentContainer>
    );
};

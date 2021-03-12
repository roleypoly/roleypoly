import { CompletelyStylelessLink } from '@roleypoly/design-system/atoms/typography';
import { ServerListingCard } from '@roleypoly/design-system/molecules/server-listing-card';
import { GuildSlug } from '@roleypoly/types';
import * as React from 'react';
import { sortBy } from '../../../../src/common/utils/sortBy';
import { CardContainer, ContentContainer } from './ServersListing.styled';

type ServersListingProps = {
    guilds: GuildSlug[];
};

export const ServersListing = (props: ServersListingProps) => (
    <ContentContainer>
        {props.guilds &&
            sortBy(props.guilds, 'name', (a: string, b: string) =>
                a.toLowerCase() > b.toLowerCase() ? 1 : -1
            ).map((guild, idx) => (
                <CardContainer key={idx}>
                    <a href={`/s/${guild.id}`}>
                        <CompletelyStylelessLink>
                            <ServerListingCard guild={guild} />
                        </CompletelyStylelessLink>
                    </a>
                </CardContainer>
            ))}
    </ContentContainer>
);

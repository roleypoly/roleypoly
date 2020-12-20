import Link from 'next/link';
import * as React from 'react';
import { GuildSlug } from 'roleypoly/common/types';
import { sortBy } from 'roleypoly/common/utils/sortBy';
import { CompletelyStylelessLink } from 'roleypoly/design-system/atoms/typography';
import { ServerListingCard } from 'roleypoly/design-system/molecules/server-listing-card';
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
                    <Link
                        as={`/s/${guild.id}`}
                        href={`/s/[id]`}
                        prefetch={false}
                        passHref
                    >
                        <CompletelyStylelessLink>
                            <ServerListingCard guild={guild} />
                        </CompletelyStylelessLink>
                    </Link>
                </CardContainer>
            ))}
    </ContentContainer>
);

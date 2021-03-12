import { Avatar, utils as avatarUtils } from '@roleypoly/design-system/atoms/avatar';
import { Space } from '@roleypoly/design-system/atoms/space';
import { AccentTitle } from '@roleypoly/design-system/atoms/typography';
import { GuildSlug } from '@roleypoly/types';
import * as React from 'react';
import styled from 'styled-components';

type GreetingProps = {
    guildSlug: GuildSlug;
};

const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
`;

export const PreauthGreeting = (props: GreetingProps) => (
    <Center>
        <Avatar
            size={64}
            src={avatarUtils.avatarHash(
                props.guildSlug.id,
                props.guildSlug.icon,
                'icons',
                512
            )}
            hash={props.guildSlug.icon}
        >
            {avatarUtils.initialsFromName(props.guildSlug.name)}
        </Avatar>
        <AccentTitle>
            Hi there. <b>{props.guildSlug.name}</b> uses Roleypoly to help assign you
            roles.
        </AccentTitle>
        <Space />
        <Space />
    </Center>
);

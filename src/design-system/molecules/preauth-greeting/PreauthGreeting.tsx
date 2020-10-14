import * as React from 'react';
import { Avatar, utils as avatarUtils } from 'roleypoly/src/design-system/atoms/avatar';
import { Guild } from 'roleypoly/src/design-system/shared-types';
import { AccentTitle } from 'roleypoly/src/design-system/atoms/typography';
import { Space } from 'roleypoly/src/design-system/atoms/space';
import styled from 'styled-components';

type GreetingProps = {
    guildSlug: Guild;
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
        <Avatar size={64} src={props.guildSlug.icon}>
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

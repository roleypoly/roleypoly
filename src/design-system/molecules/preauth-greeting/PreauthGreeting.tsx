import * as React from 'react';
import { Avatar, utils as avatarUtils } from 'atoms/avatar';
import { Guild } from '@roleypoly/rpc/shared';
import { AccentTitle } from 'atoms/typography';
import { Space } from 'atoms/space';
import styled from 'styled-components';

type GreetingProps = {
    guildSlug: Guild.AsObject;
};

const Center = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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

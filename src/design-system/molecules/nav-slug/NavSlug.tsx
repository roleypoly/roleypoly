import * as React from 'react';
import { Guild } from '@roleypoly/rpc/shared';
import { Avatar, utils } from 'atoms/avatar';
import { SlugContainer, SlugName } from './NavSlug.styled';
import { GoOrganization } from 'react-icons/go';

type Props = {
    guild: Guild.AsObject | null;
};

export const NavSlug = (props: Props) => (
    <SlugContainer>
        <Avatar src={props.guild?.icon} deliberatelyEmpty={!props.guild} size={35}>
            {props.guild ? utils.initialsFromName(props.guild.name) : <GoOrganization />}
        </Avatar>
        <SlugName>{props.guild?.name || <>Your Guilds</>}</SlugName>
    </SlugContainer>
);

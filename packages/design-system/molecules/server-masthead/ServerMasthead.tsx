import { Avatar, utils } from '@roleypoly/design-system/atoms/avatar';
import { AccentTitle, AmbientLarge } from '@roleypoly/design-system/atoms/typography';
import * as React from 'react';
import { GoPencil } from 'react-icons/go';
import { GuildSlug } from '../../../../src/common/types';
import { Editable, Icon, Name, Wrapper } from './ServerMasthead.styled';

export type ServerMastheadProps = {
    guild: GuildSlug;
    editable: boolean;
};

export const ServerMasthead = (props: ServerMastheadProps) => {
    return (
        <Wrapper>
            <Icon>
                <Avatar
                    hash={props.guild.icon}
                    size={props.editable ? 60 : 48}
                    src={utils.avatarHash(props.guild.id, props.guild.icon, 'icons', 512)}
                >
                    {utils.initialsFromName(props.guild.name)}
                </Avatar>
            </Icon>
            <Name>
                <AccentTitle>{props.guild.name}</AccentTitle>
                {props.editable && (
                    <a href={`/s/${props.guild.id}/edit`}>
                        <Editable role="button">
                            <GoPencil />
                            &nbsp; <AmbientLarge>Edit Server</AmbientLarge>
                        </Editable>
                    </a>
                )}
            </Name>
        </Wrapper>
    );
};

import { Guild } from 'roleypoly/common/types';
import { Avatar, utils } from 'roleypoly/design-system/atoms/avatar';
import { AccentTitle, AmbientLarge } from 'roleypoly/design-system/atoms/typography';
import Link from 'next/link';
import { guild } from 'roleypoly/common/types/storyData';
import * as React from 'react';
import { GoPencil } from 'react-icons/go';
import { Editable, Icon, Name, Wrapper } from './ServerMasthead.styled';

export type ServerMastheadProps = {
    guild: Guild;
    editable: boolean;
};

export const ServerMasthead = (props: ServerMastheadProps) => {
    return (
        <Wrapper>
            <Icon>
                <Avatar
                    size={props.editable ? 60 : 48}
                    src={utils.avatarHash(guild.id, guild.icon, 'icons', 512)}
                >
                    {utils.initialsFromName(props.guild.name)}
                </Avatar>
            </Icon>
            <Name>
                <AccentTitle>{props.guild.name}</AccentTitle>
                {props.editable && (
                    <Link href="/s/[id]/edit" as={`/s/${props.guild.id}/edit`}>
                        <Editable role="button">
                            <GoPencil />
                            &nbsp; <AmbientLarge>Edit Server</AmbientLarge>
                        </Editable>
                    </Link>
                )}
            </Name>
        </Wrapper>
    );
};

import { Guild } from 'roleypoly/src/design-system/shared-types';
import { Avatar, utils } from 'roleypoly/src/design-system/atoms/avatar';
import { AccentTitle, AmbientLarge } from 'roleypoly/src/design-system/atoms/typography';
import Link from 'next/link';
import { guild } from 'roleypoly/src/design-system/shared-types/storyData';
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
                <Avatar size={props.editable ? 60 : 48} src={guild.icon}>
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

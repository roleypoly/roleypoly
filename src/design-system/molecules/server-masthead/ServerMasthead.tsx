import { Guild } from '@roleypoly/rpc/shared';
import { Avatar, utils } from 'atoms/avatar';
import { AccentTitle, AmbientLarge } from 'atoms/typography';
import Link from 'next/link';
import { guild } from 'hack/fixtures/storyData';
import * as React from 'react';
import { GoPencil } from 'react-icons/go';
import { Editable, Icon, Name, Wrapper } from './ServerMasthead.styled';

export type ServerMastheadProps = {
    guild: Guild.AsObject;
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

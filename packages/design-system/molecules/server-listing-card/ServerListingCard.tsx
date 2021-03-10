import { Avatar, utils } from '@roleypoly/design-system/atoms/avatar';
import { Collapse } from '@roleypoly/design-system/atoms/collapse';
import * as React from 'react';
import { GoPerson, GoStar, GoZap } from 'react-icons/go';
import { GuildSlug, UserGuildPermissions } from '../../../../src/common/types';
import {
    CardBase,
    CardLine,
    MaxWidthTitle,
    PermissionTagStyled,
} from './ServerListingCard.styled';

type ServerListingProps = {
    guild: GuildSlug;
};

export const ServerListingCard = (props: ServerListingProps) => (
    <CardBase>
        <CardLine>
            <Avatar
                hash={props.guild.icon}
                src={utils.avatarHash(props.guild.id, props.guild.icon, 'icons')}
            >
                {utils.initialsFromName(props.guild.name)}
            </Avatar>
        </CardLine>
        <MaxWidthTitle>{props.guild.name}</MaxWidthTitle>
        <CardLine left>
            <PermissionTag permissionLevel={props.guild.permissionLevel} />
        </CardLine>
    </CardBase>
);

const PermissionTag = (props: { permissionLevel: UserGuildPermissions }) => {
    switch (props.permissionLevel) {
        case UserGuildPermissions.Admin:
            return (
                <PermissionTagStyled>
                    <GoStar />
                    <Collapse>Administrator</Collapse>
                </PermissionTagStyled>
            );
        case UserGuildPermissions.Manager:
            return (
                <PermissionTagStyled>
                    <GoZap />
                    <Collapse>Role Manager</Collapse>
                </PermissionTagStyled>
            );
        default:
            return (
                <PermissionTagStyled hiddenOnSmall>
                    <GoPerson />
                    <Collapse>Member</Collapse>
                </PermissionTagStyled>
            );
    }
};

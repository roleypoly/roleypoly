import { Avatar, utils } from '@roleypoly/design-system/atoms/avatar';
import {
  AccentTitle,
  AmbientLarge,
  CompletelyStylelessLink,
} from '@roleypoly/design-system/atoms/typography';
import { GuildSlug } from '@roleypoly/types';
import * as React from 'react';
import { GoPencil } from 'react-icons/go';
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
          <CompletelyStylelessLink to={`/s/${props.guild.id}/edit`}>
            <Editable role="button">
              <GoPencil />
              &nbsp; <AmbientLarge>Edit Server</AmbientLarge>
            </Editable>
          </CompletelyStylelessLink>
        )}
      </Name>
    </Wrapper>
  );
};

import { palette } from '@roleypoly/design-system/atoms/colors';
import { HalfsiesContainer, HalfsiesItem } from '@roleypoly/design-system/atoms/halfsies';
import { SparkleOverlay } from '@roleypoly/design-system/atoms/sparkle';
import { Toggle } from '@roleypoly/design-system/atoms/toggle';
import {
  AmbientLarge,
  LargeText,
  SmallTitle,
} from '@roleypoly/design-system/atoms/typography';
import { Role } from '@roleypoly/types';
import { demoData } from '@roleypoly/types/demoData';
import chroma from 'chroma-js';
import * as React from 'react';
import { DiscordBase, DiscordRole, Do, Dont, Why } from './WhyNoRoles.styled';

const adminRoles: Role[] = [
  {
    id: 'roley2',
    name: 'Admin',
    permissions: '0',
    color: chroma('hotpink').num(),
    position: -1,
    managed: true,
    safety: 0,
  },
  {
    id: 'roley3',
    name: 'Moderator',
    permissions: '0',
    color: chroma('lime').num(),
    position: -1,
    managed: true,
    safety: 0,
  },
];

const roleypolyRole: Role = {
  id: 'roley',
  name: 'Roleypoly',
  permissions: '0',
  color: chroma(palette.taupe500).num(),
  position: -1,
  managed: true,
  safety: 0,
};

const goodRoles = [...adminRoles, roleypolyRole, ...demoData];

const badRoles = [...adminRoles, ...demoData, roleypolyRole];

const MaybeWithOverlay = (props: { children: React.ReactNode; withOverlay: boolean }) => {
  if (props.withOverlay) {
    return (
      <SparkleOverlay size={-5} repeatCount={10}>
        {props.children}
      </SparkleOverlay>
    );
  } else {
    return <>{props.children}</>;
  }
};

const Example = (props: { roles: Role[]; isGood: boolean }) => (
  <div>
    <DiscordBase>
      {props.roles.map((r) => (
        <MaybeWithOverlay withOverlay={props.isGood && r.name === 'Roleypoly'}>
          <DiscordRole
            discordRole={r}
            isRoleypoly={r.name === 'Roleypoly'}
            isGood={props.isGood}
          >
            {r.name}
          </DiscordRole>
        </MaybeWithOverlay>
      ))}
    </DiscordBase>
  </div>
);

export const WhyNoRoles = () => (
  <div>
    <p>
      <SmallTitle>Why can't I see my roles?</SmallTitle>
    </p>
    <HalfsiesContainer>
      <HalfsiesItem>
        <Do />
        <b>DO:</b> Roleypoly is above the other roles
        <Example isGood roles={goodRoles} />
      </HalfsiesItem>
      <HalfsiesItem>
        <Dont />
        <b>DON'T:</b> Roleypoly is below the other roles
        <Example isGood={false} roles={badRoles} />
      </HalfsiesItem>
    </HalfsiesContainer>

    <AmbientLarge>
      <Why />
      {'  '}
      Discord doesn't let members/bots with "manage roles" permissions assign roles above
      their highest role.
    </AmbientLarge>

    <p>
      <LargeText>Other tips:</LargeText>
    </p>

    <p>
      <Do />
      <b>DO:</b> Roles have no elevated permissions.
      <Toggle state={false}>Administrator</Toggle>
      <Toggle state={false}>Manage Roles</Toggle>
      <br />
      <Dont />
      <b>DON'T:</b> Roles cannot have Administrator or Manage Roles permissions.
      <Toggle state={true}>Administrator</Toggle>
      <Toggle state={true}>Manage Roles</Toggle>
      <AmbientLarge>
        <Why />
        {'  '}
        These permissions give access to the Roleypoly editor and Discord tools, which can
        open your server up to vandalism.
      </AmbientLarge>
    </p>
  </div>
);

import { DynamicLogomark } from '@roleypoly/design-system/atoms/branding';
import { Popover } from '@roleypoly/design-system/atoms/popover';
import { GuildNav } from '@roleypoly/design-system/molecules/guild-nav';
import { NavSlug } from '@roleypoly/design-system/molecules/nav-slug';
import { UserAvatarGroup } from '@roleypoly/design-system/molecules/user-avatar-group';
import { UserPopover } from '@roleypoly/design-system/molecules/user-popover';
import { DiscordUser, GuildSlug } from '@roleypoly/types';
import * as React from 'react';
import { GoOrganization } from 'react-icons/go';
import {
  GuildPopoverHead,
  InteractionBase,
  MastheadA,
  MastheadAlignment,
  MastheadBase,
  MastheadLeft,
  MastheadRight,
} from './Masthead.styled';

type Props = {
  user?: DiscordUser;
  activeGuildId: string | null;
  guilds: GuildSlug[];
  disableGuildPicker?: boolean;
  recentGuilds: string[];
};

export const Authed = (props: Props) => {
  const [userPopoverState, setUserPopoverState] = React.useState(false);
  const [serverPopoverState, setServerPopoverState] = React.useState(false);

  return (
    <MastheadBase>
      <MastheadAlignment>
        <MastheadLeft>
          <MastheadA to="/servers">
            <DynamicLogomark height={35} />
          </MastheadA>
          <InteractionBase
            onClick={() => {
              if (!props.disableGuildPicker) {
                setServerPopoverState(true);
                setUserPopoverState(false);
              }
            }}
            hide={!serverPopoverState}
          >
            <NavSlug
              guild={
                props.guilds.find((guild) => guild.id === props.activeGuildId) || null
              }
            />
          </InteractionBase>
          <Popover
            headContent={
              <GuildPopoverHead>
                <GoOrganization />
                My Guilds
              </GuildPopoverHead>
            }
            canDefocus
            position="bottom left"
            active={serverPopoverState}
            preferredWidth={560}
            onExit={() => setServerPopoverState(false)}
          >
            {() => (
              <GuildNav guilds={props.guilds} recentGuilds={props.recentGuilds || []} />
            )}
          </Popover>
        </MastheadLeft>
        <MastheadRight>
          <InteractionBase
            onClick={() => {
              setUserPopoverState(true);
              setServerPopoverState(false);
            }}
            hide={!userPopoverState}
          >
            {props.user !== undefined && <UserAvatarGroup user={props.user} />}
          </InteractionBase>
          <Popover
            headContent={<></>}
            canDefocus
            position="top right"
            active={userPopoverState}
            onExit={() => setUserPopoverState(false)}
          >
            {() => props.user && <UserPopover user={props.user} />}
          </Popover>
        </MastheadRight>
      </MastheadAlignment>
    </MastheadBase>
  );
};

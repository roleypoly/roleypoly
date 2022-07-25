import { Space } from '@roleypoly/design-system/atoms/space';
import {
  AmbientLarge,
  CompletelyStylelessLink,
  Link,
} from '@roleypoly/design-system/atoms/typography';
import { UserAvatarGroup } from '@roleypoly/design-system/molecules/user-avatar-group';
import { DiscordUser } from '@roleypoly/types';
import * as React from 'react';
import { FaDiscord, FaGithub, FaPatreon } from 'react-icons/fa';
import { GoSignOut } from 'react-icons/go';
import { Base, NavAction } from './UserPopover.styled';

type UserPopoverProps = {
  user: DiscordUser;
};

export const UserPopover = (props: UserPopoverProps) => {
  const subtitleText = React.useMemo(() => {
    const texts = [
      '✊ Black Lives Matter.',
      'Trans Rights are Human Rights',
      'Stop AAPI Hate.',
      "Get vaccinated, it's free!",
      'Imagine having bodily autonomy',
    ];

    return texts[Math.floor(Math.random() * texts.length)];
  }, []);
  return (
    <Base>
      <UserAvatarGroup user={props.user} preventCollapse={true} />
      <NavAction>
        <CompletelyStylelessLink to="/machinery/logout">
          Log Out <GoSignOut />
        </CompletelyStylelessLink>
      </NavAction>
      <Space />
      <NavAction>
        <Link href="https://patreon.com/roleypoly">
          Support us on Patreon <FaPatreon />
        </Link>
      </NavAction>{' '}
      <NavAction>
        <Link href="https://github.com/roleypoly/roleypoly">
          Roleypoly on GitHub <FaGithub />
        </Link>
      </NavAction>
      <NavAction>
        <Link href="https://discord.gg/PWQUVsd">
          Get help on Discord <FaDiscord />
        </Link>
      </NavAction>
      <NavAction>
        <AmbientLarge>
          &copy; {new Date().getFullYear()} Roleypoly - {subtitleText}
        </AmbientLarge>
      </NavAction>
    </Base>
  );
};

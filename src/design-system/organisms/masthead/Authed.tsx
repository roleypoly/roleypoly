import Link from 'next/link';
import * as React from 'react';
import { GoOrganization } from 'react-icons/go';
import { GuildEnumeration, RoleypolyUser } from 'roleypoly/common/types';
import { guildEnum } from 'roleypoly/common/types/storyData';
import { DynamicLogomark } from 'roleypoly/design-system/atoms/branding';
import { Popover } from 'roleypoly/design-system/atoms/popover';
import { GuildNav } from 'roleypoly/design-system/molecules/guild-nav';
import { NavSlug } from 'roleypoly/design-system/molecules/nav-slug';
import { UserAvatarGroup } from 'roleypoly/design-system/molecules/user-avatar-group';
import { UserPopover } from 'roleypoly/design-system/molecules/user-popover';
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
    user: RoleypolyUser;
    activeGuildId: string | null;
    guildEnumeration: GuildEnumeration;
};

export const Authed = (props: Props) => {
    const [userPopoverState, setUserPopoverState] = React.useState(false);
    const [serverPopoverState, setServerPopoverState] = React.useState(false);

    return (
        <MastheadBase>
            <MastheadAlignment>
                <MastheadLeft>
                    <Link href="/dashboard" passHref>
                        <MastheadA>
                            <DynamicLogomark height={35} />
                        </MastheadA>
                    </Link>
                    <InteractionBase
                        onClick={() => {
                            setServerPopoverState(true);
                            setUserPopoverState(false);
                        }}
                        hide={!serverPopoverState}
                    >
                        <NavSlug
                            guild={
                                guildEnum.guildsList.find(
                                    (g) => g.id === props.activeGuildId
                                )?.guild || null
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
                        onExit={() => setServerPopoverState(false)}
                    >
                        <GuildNav guildEnumeration={props.guildEnumeration} />
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
                        {props.user.discorduser && (
                            <UserAvatarGroup user={props.user.discorduser} />
                        )}
                    </InteractionBase>
                    <Popover
                        headContent={<></>}
                        canDefocus
                        position="top right"
                        active={userPopoverState}
                        onExit={() => setUserPopoverState(false)}
                    >
                        {props.user.discorduser && (
                            <UserPopover user={props.user.discorduser} />
                        )}
                    </Popover>
                </MastheadRight>
            </MastheadAlignment>
        </MastheadBase>
    );
};

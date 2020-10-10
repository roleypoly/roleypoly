import { GuildEnumeration } from '@roleypoly/rpc/platform';
import { RoleypolyUser } from '@roleypoly/rpc/shared';
import { Logomark } from 'atoms/branding';
import { Popover } from 'atoms/popover';
import { guildEnum } from 'hack/fixtures/storyData';
import { GuildNav } from 'molecules/guild-nav';
import { NavSlug } from 'molecules/nav-slug';
import { UserAvatarGroup } from 'molecules/user-avatar-group';
import { UserPopover } from 'molecules/user-popover';
import Link from 'next/link';
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
    user: RoleypolyUser.AsObject;
    activeGuildId: string | null;
    guildEnumeration: GuildEnumeration.AsObject;
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
                            <Logomark height={40} />
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

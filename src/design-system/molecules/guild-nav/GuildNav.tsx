import * as React from 'react';
import { NavSlug } from 'molecules/nav-slug';
import { sortBy } from 'utils/sortBy';
import { GuildEnumeration, PresentableGuild } from '@roleypoly/rpc/platform';
import { hasPermission, permissions } from 'utils/hasPermission';
import { GoZap, GoStar } from 'react-icons/go';
import { Role } from '@roleypoly/rpc/shared';
import { GuildNavItem } from './GuildNav.styled';
import ReactTooltip from 'react-tooltip';
import Link from 'next/link';

type Props = {
    guildEnumeration: GuildEnumeration.AsObject;
};

const tooltipId = 'guildnav';

const Badges = (props: { guild: PresentableGuild.AsObject }) => {
    return React.useMemo(() => {
        if (!props.guild.member) {
            return null;
        }

        const roles = props.guild.member.rolesList
            .map((id) => {
                if (!props.guild.roles) {
                    return undefined;
                }

                return props.guild.roles.rolesList.find((role) => role.id === id);
            })
            .filter((x) => !!x) as Role.AsObject[];

        if (hasPermission(roles, permissions.ADMINISTRATOR)) {
            return <GoStar data-tip="Administrator" data-for={tooltipId} />;
        }

        if (hasPermission(roles, permissions.MANAGE_ROLES)) {
            return <GoZap data-tip="Role Editor" data-for={tooltipId} />;
        }

        return null;
    }, [props.guild]);
};

export const GuildNav = (props: Props) => (
    <div>
        {sortBy(
            props.guildEnumeration.guildsList.map((g) => ({
                ...g,
                nameLower: g.guild?.name.toLowerCase(),
            })),
            'nameLower'
        ).map(({ nameLower, ...guild }) => (
            <Link href={`/s/${guild.id}`} passHref>
                <GuildNavItem>
                    <NavSlug guild={guild.guild || null} key={guild.id} />
                    <Badges guild={guild} />
                </GuildNavItem>
            </Link>
        ))}
        <ReactTooltip id={tooltipId} />
    </div>
);

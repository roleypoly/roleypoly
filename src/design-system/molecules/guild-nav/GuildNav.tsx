import Link from 'next/link';
import * as React from 'react';
import { GoStar, GoZap } from 'react-icons/go';
import ReactTooltip from 'react-tooltip';
import { hasPermission, permissions } from 'roleypoly/src/common/utils/hasPermission';
import { sortBy } from 'roleypoly/src/common/utils/sortBy';
import {
    GuildEnumeration,
    PresentableGuild,
    Role,
} from 'roleypoly/src/design-system/shared-types';
import { NavSlug } from 'roleypoly/src/design-system/molecules/nav-slug';
import { GuildNavItem } from './GuildNav.styled';

type Props = {
    guildEnumeration: GuildEnumeration;
};

const tooltipId = 'guildnav';

const Badges = (props: { guild: PresentableGuild }) => {
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
            .filter((x) => !!x) as Role[];

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
        {sortBy(props.guildEnumeration.guildsList, 'id').map((guild) => (
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

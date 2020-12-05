import Link from 'next/link';
import * as React from 'react';
import { GoStar, GoZap } from 'react-icons/go';
import ReactTooltip from 'react-tooltip';
import { GuildSlug, UserGuildPermissions } from 'roleypoly/common/types';
import { sortBy } from 'roleypoly/common/utils/sortBy';
import { NavSlug } from 'roleypoly/design-system/molecules/nav-slug';
import { GuildNavItem } from './GuildNav.styled';

type Props = {
    guilds: GuildSlug[];
};

const tooltipId = 'guildnav';

const Badges = (props: { guild: GuildSlug }) => {
    return React.useMemo(() => {
        if (props.guild.permissionLevel === UserGuildPermissions.Admin) {
            return <GoStar data-tip="Administrator" data-for={tooltipId} />;
        }

        if (props.guild.permissionLevel === UserGuildPermissions.Manager) {
            return <GoZap data-tip="Role Editor" data-for={tooltipId} />;
        }

        return null;
    }, [props.guild.permissionLevel]);
};

export const GuildNav = (props: Props) => (
    <div>
        {sortBy(props.guilds, 'id').map((guild) => (
            <Link href={`/s/${guild.id}`} passHref>
                <GuildNavItem>
                    <NavSlug guild={guild || null} key={guild.id} />
                    <Badges guild={guild} />
                </GuildNavItem>
            </Link>
        ))}
        <ReactTooltip id={tooltipId} />
    </div>
);

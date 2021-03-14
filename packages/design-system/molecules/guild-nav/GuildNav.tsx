import { NavSlug } from '@roleypoly/design-system/molecules/nav-slug';
import { getRecentAndSortedGuilds } from '@roleypoly/misc-utils/guildListing';
import { GuildSlug, UserGuildPermissions } from '@roleypoly/types';
import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { GoStar, GoZap } from 'react-icons/go';
import ReactTooltip from 'react-tooltip';
import { GuildNavItem } from './GuildNav.styled';

type Props = {
    guilds: GuildSlug[];
    recentGuilds: string[];
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

const NavList = (props: { guilds: Props['guilds'] }) => (
    <>
        {props.guilds.map((guild) => (
            <GuildNavItem href={`/s/${guild.id}`} key={guild.id}>
                <NavSlug guild={guild || null} key={guild.id} />
                <Badges guild={guild} />
            </GuildNavItem>
        ))}
    </>
);

export const GuildNav = (props: Props) => {
    const { sortedGuildSlugs, recentGuildSlugs } = getRecentAndSortedGuilds(
        props.guilds,
        props.recentGuilds
    );

    return (
        <div>
            <Scrollbars
                universal
                autoHide
                // autoHeight
                style={{ height: 'calc(100vh - 45px - 1.4em)', overflowX: 'hidden' }}
            >
                {recentGuildSlugs && (
                    <>
                        <div>Recents</div>
                        <NavList guilds={recentGuildSlugs} />
                        <div>All Guilds</div>
                    </>
                )}
                <NavList guilds={sortedGuildSlugs} />
                <ReactTooltip id={tooltipId} />
            </Scrollbars>
        </div>
    );
};

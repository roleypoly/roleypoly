import { NavSlug } from '@roleypoly/design-system/molecules/nav-slug';
import * as React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { GoStar, GoZap } from 'react-icons/go';
import ReactTooltip from 'react-tooltip';
import { GuildSlug, UserGuildPermissions } from '../../../../src/common/types';
import { sortBy } from '../../../../src/common/utils/sortBy';
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
        <Scrollbars
            universal
            autoHide
            // autoHeight
            style={{ height: 'calc(100vh - 45px - 1.4em)', overflowX: 'hidden' }}
        >
            {sortBy(props.guilds, 'name', (a: string, b: string) =>
                a.toLowerCase() > b.toLowerCase() ? 1 : -1
            ).map((guild) => (
                <GuildNavItem href={`/s/${guild.id}`} key={guild.id}>
                    <NavSlug guild={guild || null} key={guild.id} />
                    <Badges guild={guild} />
                </GuildNavItem>
            ))}
            <ReactTooltip id={tooltipId} />
        </Scrollbars>
    </div>
);

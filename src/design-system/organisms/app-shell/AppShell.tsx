import * as React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { DiscordUser, GuildSlug } from 'roleypoly/common/types';
import { GlobalStyleColors } from 'roleypoly/design-system/atoms/colors';
import { Footer } from 'roleypoly/design-system/molecules/footer';
import * as Masthead from 'roleypoly/design-system/organisms/masthead';
import { Content, GlobalStyles } from './AppShell.styled';

export type AppShellProps = {
    children: React.ReactNode;
    user?: DiscordUser;
    showFooter?: boolean;
    small?: boolean;
    activeGuildId?: string | null;
    guilds?: GuildSlug[];
};

export const AppShell = (props: AppShellProps) => (
    <>
        <GlobalStyles />
        <GlobalStyleColors />
        {props.user ? (
            <Masthead.Authed
                guilds={props.guilds || []}
                activeGuildId={props.activeGuildId || null}
                user={props.user}
            />
        ) : (
            <Masthead.Guest />
        )}
        <Scrollbars
            style={{ height: 'calc(100vh - 25px)', margin: 0, padding: 0 }}
            autoHide
            universal
        >
            <Content small={props.small}>{props.children}</Content>
            {props.showFooter && <Footer />}
        </Scrollbars>
    </>
);

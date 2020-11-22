import * as React from 'react';
import * as Masthead from 'roleypoly/design-system/organisms/masthead';
import { RoleypolyUser, GuildEnumeration } from 'roleypoly/common/types';
import { Footer } from 'roleypoly/design-system/molecules/footer';
import { Content, GlobalStyles } from './AppShell.styled';
import { GlobalStyleColors } from 'roleypoly/design-system/atoms/colors';
import { Scrollbars } from 'react-custom-scrollbars';

type AppShellProps = {
    children: React.ReactNode;
    user: RoleypolyUser | null;
    showFooter?: boolean;
    small?: boolean;
    activeGuildId?: string | null;
    guildEnumeration?: GuildEnumeration;
};

export const AppShell = (props: AppShellProps) => (
    <>
        <GlobalStyles />
        <GlobalStyleColors />
        {props.user !== null ? (
            <Masthead.Authed
                guildEnumeration={props.guildEnumeration || { guildsList: [] }}
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

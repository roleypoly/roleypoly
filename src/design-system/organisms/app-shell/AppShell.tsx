import * as React from 'react';
import * as Masthead from 'organisms/masthead';
import { RoleypolyUser } from '@roleypoly/rpc/shared';
import { Footer } from 'molecules/footer';
import { Content, GlobalStyles } from './AppShell.styled';
import { GlobalStyleColors } from 'atoms/colors';
import { GuildEnumeration } from '@roleypoly/rpc/platform';
import { Scrollbars } from 'react-custom-scrollbars';

type AppShellProps = {
    children: React.ReactNode;
    user: RoleypolyUser.AsObject | null;
    showFooter?: boolean;
    small?: boolean;
    activeGuildId?: string | null;
    guildEnumeration?: GuildEnumeration.AsObject;
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

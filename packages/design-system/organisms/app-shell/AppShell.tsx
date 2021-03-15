import { GlobalStyleColors } from '@roleypoly/design-system/atoms/colors';
import { Footer } from '@roleypoly/design-system/molecules/footer';
import * as Masthead from '@roleypoly/design-system/organisms/masthead';
import { DiscordUser, GuildSlug } from '@roleypoly/types';
import * as React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Content, GlobalStyles } from './AppShell.styled';

export type AppShellProps = {
  children: React.ReactNode;
  user?: DiscordUser;
  showFooter?: boolean;
  small?: boolean;
  activeGuildId?: string | null;
  guilds?: GuildSlug[];
  recentGuilds?: string[];
  disableGuildPicker?: boolean;
  skeleton?: boolean;
};

const OptionallyScroll = (props: {
  shouldScroll: boolean;
  children: React.ReactNode;
}) => {
  if (props.shouldScroll) {
    return (
      <Scrollbars
        style={{ height: 'calc(100vh - 25px)', margin: 0, padding: 0 }}
        autoHide
        universal
      >
        {props.children}
      </Scrollbars>
    );
  }

  return <>{props.children}</>;
};

export const AppShell = (props: AppShellProps) => (
  <>
    <GlobalStyles />
    <GlobalStyleColors />
    {props.skeleton ? (
      <Masthead.Skeleton />
    ) : props.user ? (
      <Masthead.Authed
        disableGuildPicker={props.disableGuildPicker}
        guilds={props.guilds || []}
        activeGuildId={props.activeGuildId || null}
        user={props.user}
        recentGuilds={props.recentGuilds || []}
      />
    ) : (
      <Masthead.Guest />
    )}
    <OptionallyScroll shouldScroll={!props.skeleton}>
      <>
        <Content small={props.small}>{props.children}</Content>
        {props.showFooter && <Footer />}
      </>
    </OptionallyScroll>
  </>
);

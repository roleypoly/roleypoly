import * as React from 'react';
import { guild, mastheadSlugs, user } from '../../fixtures/storyData';
import { Authed } from './Authed';
import { Guest } from './Guest';
import { Skeleton } from './Skeleton';

export default {
  title: 'Organisms/Masthead',
};

export const hasGuilds = () => (
  <Authed guilds={mastheadSlugs} activeGuildId={guild.id} user={user} recentGuilds={[]} />
);

export const noGuilds = () => (
  <Authed guilds={[]} activeGuildId={null} user={user} recentGuilds={[]} />
);

export const guest = () => <Guest />;

export const skeleton = () => <Skeleton />;

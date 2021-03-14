import * as React from 'react';
import { guild, mastheadSlugs, user } from '../../fixtures/storyData';
import { Authed } from './Authed';
import { Guest } from './Guest';

export default {
  title: 'Organisms/Masthead',
};

export const HasGuilds = () => (
  <Authed guilds={mastheadSlugs} activeGuildId={guild.id} user={user} />
);

export const NoGuilds = () => <Authed guilds={[]} activeGuildId={null} user={user} />;

export const Guest_ = () => <Guest />;

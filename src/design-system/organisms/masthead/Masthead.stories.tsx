import { rpUser, guild, guildEnum } from 'roleypoly/common/types/storyData';
import * as React from 'react';
import { Authed } from './Authed';
import { Guest } from './Guest';

export default {
    title: 'Organisms/Masthead',
};

export const HasGuilds = () => (
    <Authed guildEnumeration={guildEnum} activeGuildId={guild.id} user={rpUser} />
);

export const NoGuilds = () => (
    <Authed guildEnumeration={{ guildsList: [] }} activeGuildId={null} user={rpUser} />
);

export const Guest_ = () => <Guest />;

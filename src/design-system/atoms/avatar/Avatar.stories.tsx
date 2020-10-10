import { text } from '@storybook/addon-knobs';
import * as React from 'react';
import { Avatar } from './Avatar';

export default {
    title: 'Atoms/Avatar',
    component: Avatar,
    argTypes: {
        initials: { control: 'text' },
    },
    args: {
        initials: 'KR',
    },
};

export const WithInitials = ({ initials, ...rest }) => (
    <Avatar src="https://i.imgur.com/epMSRQH.png" size={48} {...rest}>
        {initials}
    </Avatar>
);

export const WithText = ({ initials, ...rest }) => (
    <Avatar size={48} {...rest}>
        {initials}
    </Avatar>
);
export const Empty = (args) => <Avatar size={48} {...args}></Avatar>;
export const DeliberatelyEmpty = (args) => (
    <Avatar size={48} deliberatelyEmpty={true} {...args}></Avatar>
);

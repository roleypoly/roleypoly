import * as React from 'react';
import { Avatar, AvatarProps } from './Avatar';

export default {
    title: 'Atoms/Avatar',
    component: Avatar,
    argTypes: {
        initials: { control: 'text' },
    },
    args: {
        initials: 'KR',
        hash: 'aa',
    },
};

type StoryArgs = {
    initials?: string;
} & AvatarProps;

export const WithInitials = ({ initials, ...rest }: StoryArgs) => (
    <Avatar src="https://i.imgur.com/epMSRQH.png" size={48} {...rest}>
        {initials}
    </Avatar>
);

export const WithText = ({ initials, ...rest }: StoryArgs) => (
    <Avatar size={48} {...rest}>
        {initials}
    </Avatar>
);
export const Empty = (args: StoryArgs) => <Avatar size={48} {...args}></Avatar>;
export const DeliberatelyEmpty = (args: StoryArgs) => (
    <Avatar size={48} deliberatelyEmpty={true} {...args}></Avatar>
);

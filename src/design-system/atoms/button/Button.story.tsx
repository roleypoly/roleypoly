// TODO: port to new story

import * as React from 'react';
import { atomStories } from 'atoms/atoms.story';
import { Button, ButtonProps } from './Button';
import { text as textKnob } from '@storybook/addon-knobs';
import { FaDiscord } from 'react-icons/fa';
import { styled } from '@storybook/theming';

const largeStory = atomStories('Button/Large', module);
const smallStory = atomStories('Button/Small', module);

const colorModes: NonNullable<ButtonProps['color']>[] = [
    'primary',
    'secondary',
    'discord',
    'muted',
];

const Margin = styled.div`
    margin-top: 5px;
    display: flex;
    align-items: center;
`;

const storyTemplate = (props: Omit<ButtonProps, 'children'>) => () => {
    const text = textKnob('Button content', 'Example Button');

    return (
        <div>
            {colorModes.map((color, i) => (
                <Margin key={i}>
                    <Button {...props} color={color}>
                        {text}
                    </Button>
                    <div style={{ marginLeft: '1em' }}>
                        {color[0].toUpperCase()}
                        {color.slice(1)}
                    </div>
                </Margin>
            ))}
        </div>
    );
};
const storyBuilder = (
    story: typeof largeStory,
    size: NonNullable<ButtonProps['size']>
) => {
    story.add(
        'Normal',
        storyTemplate({
            size,
        })
    );

    story.add(
        'Icon',
        storyTemplate({
            size,
            icon: (
                <div style={{ position: 'relative', top: 3 }}>
                    <FaDiscord />
                </div>
            ),
        })
    );

    story.add(
        'Loading',
        storyTemplate({
            size,
            icon: (
                <div style={{ position: 'relative', top: 3 }}>
                    <FaDiscord />
                </div>
            ),
            loading: true,
        })
    );
};

storyBuilder(largeStory, 'large');
storyBuilder(smallStory, 'small');

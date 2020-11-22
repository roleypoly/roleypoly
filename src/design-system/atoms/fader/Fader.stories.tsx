import * as React from 'react';
import { FaderOpacity, FaderSlide } from './Fader';
import { Button } from 'roleypoly/design-system/atoms/button';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Atoms/Fader',
    component: FaderSlide,
    args: {
        isVisible: true,
    },
};

export const Opacity = (args) => {
    return (
        <FaderOpacity {...args}>
            <Button onClick={action('onClick')}>Click me!</Button>
        </FaderOpacity>
    );
};

export const Slide = (args) => {
    return (
        <FaderSlide {...args}>
            <Button onClick={action('onClick')}>Click me!</Button>
        </FaderSlide>
    );
};

import * as React from 'react';
import { atomStories } from 'atoms/atoms.story';
import { SparkleOverlay } from './Sparkle';
import { Button } from 'atoms/button';
import { number } from '@storybook/addon-knobs';
import { Hero } from 'atoms/hero';

const story = atomStories('Sparkle', module);

story.add('Example Button', () => {
    return (
        <Hero>
            <SparkleOverlay
                opacity={number('Effect Opacity', 1, {
                    min: 0,
                    max: 1,
                    step: 0.001,
                    range: true,
                })}
                size={number('Effect Size', -10)}
                repeatCount={3}
            >
                <Button>Yo check this!</Button>
            </SparkleOverlay>
        </Hero>
    );
});

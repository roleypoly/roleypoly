import * as React from 'react';
import { organismStories } from 'organisms/organisms.story';
import { ErrorBanner } from './ErrorBanner';
import { text } from '@storybook/addon-knobs';

const story = organismStories('Error Banner', module);

story.add('Error Banner', () => (
    <ErrorBanner
        message={{
            english: text('English', 'Primary Text'),
            japanese: text('Japanese (Subtext)', 'Subtext'),
            friendlyCode: text('Friendly Code', 'Oops!'),
        }}
    />
));

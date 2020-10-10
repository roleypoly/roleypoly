import * as React from 'react';
import { moleculeStories } from 'molecules/molecules.story';
import { action } from '@storybook/addon-actions';
import { ResetSubmit } from './ResetSubmit';
const story = moleculeStories('Reset & Submit', module);

story.add('Reset & Submit', () => (
    <ResetSubmit onSubmit={action('onSubmit')} onReset={action('onReset')} />
));

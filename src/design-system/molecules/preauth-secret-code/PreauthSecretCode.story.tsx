import * as React from 'react';
import { moleculeStories } from '../molecules.story';
import { PreauthSecretCode } from './PreauthSecretCode';
import { action } from '@storybook/addon-actions';

const story = moleculeStories('Preauth', module);

story.add('Secret Code', () => <PreauthSecretCode onSubmit={action('onSubmit')} />);

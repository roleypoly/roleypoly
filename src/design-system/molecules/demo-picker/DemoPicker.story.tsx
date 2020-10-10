import * as React from 'react';
import { moleculeStories } from 'molecules/molecules.story';
import { DemoPicker } from './DemoPicker';

const story = moleculeStories('Landing Demos', module);

story.add('Picker', () => <DemoPicker />);

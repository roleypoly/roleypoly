import { moleculeStories } from 'molecules/molecules.story';
import * as React from 'react';
import { DemoDiscord } from './DemoDiscord';

const story = moleculeStories('Landing Demos', module);

story.add('Discord', () => <DemoDiscord />);

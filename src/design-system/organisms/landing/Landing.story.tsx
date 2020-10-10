import * as React from 'react';
import { organismStories } from 'organisms/organisms.story';
import { Landing } from './Landing';

const story = organismStories('Landing', module);

story.add('Landing', () => <Landing />);

import * as React from 'react';
import { templateStories } from 'templates/templates.story';
import { LandingTemplate } from './Landing';

const story = templateStories('Landing', module);

story.add('Landing', () => <LandingTemplate />);

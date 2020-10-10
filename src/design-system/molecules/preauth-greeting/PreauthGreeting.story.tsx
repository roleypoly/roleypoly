import * as React from 'react';
import { moleculeStories } from '../molecules.story';
import { PreauthGreeting } from './PreauthGreeting';
import { guild } from 'hack/fixtures/storyData';

const story = moleculeStories('Preauth', module);

story.add('Greeting', () => <PreauthGreeting guildSlug={guild} />);

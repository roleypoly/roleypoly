import * as React from 'react';
import { moleculeStories } from 'molecules/molecules.story';
import { ServerMasthead } from './ServerMasthead';
import { guild } from 'hack/fixtures/storyData';

const story = moleculeStories('Server Masthead', module);

story.add('Default', () => <ServerMasthead guild={guild} editable={false} />);
story.add('Editable', () => <ServerMasthead guild={guild} editable={true} />);

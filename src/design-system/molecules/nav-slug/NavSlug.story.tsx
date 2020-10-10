import * as React from 'react';
import { moleculeStories } from 'molecules/molecules.story';
import { NavSlug } from './NavSlug';
import { guild } from 'hack/fixtures/storyData';

const story = moleculeStories('Server Slug', module);

story.add('Empty', () => <NavSlug guild={null} />);
story.add('Example', () => <NavSlug guild={guild} />);

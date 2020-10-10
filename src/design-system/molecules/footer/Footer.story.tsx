import * as React from 'react';
import { moleculeStories } from 'molecules/molecules.story';
import { Footer } from './Footer';

const story = moleculeStories('Footer', module);

story.add('Basic', () => <Footer />);

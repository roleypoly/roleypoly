import * as React from 'react';
import { templateStories } from 'templates/templates.story';
import { HelpPageTemplate } from './HelpPage';

const story = templateStories('Help Page', module);

story.add('Base', () => (
    <HelpPageTemplate user={null}>
        <h1>What is the world but vibrations?</h1>
        <p>Vibrations that synchronize and tie it together, running free forever.</p>
    </HelpPageTemplate>
));

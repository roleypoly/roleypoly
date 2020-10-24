import * as React from 'react';
import { HelpStoryWrapper } from './storyDecorator';

export default {
    title: 'Molecules/Help Page',
    decorators: [HelpStoryWrapper],
};

export const Base = () => (
    <>
        <h1>What is the world but vibrations?</h1>
        <p>Vibrations that synchronize and tie it together, running free forever.</p>
    </>
);

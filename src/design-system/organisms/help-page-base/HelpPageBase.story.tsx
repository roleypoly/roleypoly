import * as React from 'react';
import { organismStories } from 'organisms/organisms.story';
import { HelpPageBase } from './HelpPageBase';
import { Content } from 'organisms/app-shell/AppShell.styled';

const baseStory = organismStories('Help Pages', module);

export const HelpStoryWrapper = (props: { children: React.ReactNode }) => (
    <Content>
        <HelpPageBase>{props.children}</HelpPageBase>
    </Content>
);

baseStory.add('Base', () => (
    <HelpStoryWrapper>
        <h1>What is the world but vibrations?</h1>
        <p>Vibrations that synchronize and tie it together, running free forever.</p>
    </HelpStoryWrapper>
));

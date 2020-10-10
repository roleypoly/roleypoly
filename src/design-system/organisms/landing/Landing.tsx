import { palette } from 'atoms/colors';
import { Space } from 'atoms/space';
import { LargeText, LargeTitle } from 'atoms/typography';
import { DemoDiscord } from 'molecules/demo-discord';
import { DemoPicker } from 'molecules/demo-picker';
import * as React from 'react';
import { DemoAlignment, DemoSubtitle, HeroCentering, HeroText } from './Landing.styled';
import { HalfsiesContainer, HalfsiesItem } from 'atoms/halfsies';

export const Landing = () => (
    <HeroCentering>
        <HeroText>
            <div>
                <LargeTitle>Discord roles for humans.</LargeTitle>
            </div>
            <div style={{ color: palette.taupe500 }}>
                <LargeText>
                    Ditch the bot commands. It's&nbsp;{new Date().getFullYear()}.
                </LargeText>
            </div>
        </HeroText>
        <Space />
        <HalfsiesContainer>
            <HalfsiesItem style={{ marginTop: '2em' }}>
                <DemoAlignment>
                    <DemoDiscord />
                </DemoAlignment>
                <DemoSubtitle>Why are you okay with antiques?</DemoSubtitle>
            </HalfsiesItem>
            <HalfsiesItem style={{ marginTop: '2em' }}>
                <DemoAlignment>
                    <DemoPicker />
                </DemoAlignment>
                <DemoSubtitle>Just click or tap.</DemoSubtitle>
            </HalfsiesItem>
        </HalfsiesContainer>
    </HeroCentering>
);

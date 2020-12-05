import { palette } from 'roleypoly/design-system/atoms/colors';
import { Space } from 'roleypoly/design-system/atoms/space';
import { LargeText, LargeTitle } from 'roleypoly/design-system/atoms/typography';
import { DemoDiscord } from 'roleypoly/design-system/molecules/demo-discord';
import { DemoPicker } from 'roleypoly/design-system/molecules/demo-picker';
import * as React from 'react';
import { DemoAlignment, DemoSubtitle, HeroCentering, HeroText } from './Landing.styled';
import { HalfsiesContainer, HalfsiesItem } from 'roleypoly/design-system/atoms/halfsies';

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

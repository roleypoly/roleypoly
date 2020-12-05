import { onTablet } from 'roleypoly/design-system/atoms/breakpoints';
import { text400 } from 'roleypoly/design-system/atoms/typography';
import styled, { css } from 'styled-components';
import * as _ from 'styled-components'; // eslint-disable-line no-duplicate-imports

export const HeroText = styled.div`
    ${onTablet(css`
        text-align: center;
    `)}
`;

export const DemoSubtitle = styled.p`
    ${text400}
    text-align: center;
    margin-top: 0.4em;
`;

export const DemoAlignment = styled.div`
    min-height: 125px;
    ${onTablet(css`
        min-height: 95px;
    `)}
`;

export const HeroCentering = styled.div`
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 200px);
    align-items: center;
    justify-content: center;
    margin-bottom: 2em;
`;

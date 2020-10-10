import styled, { css } from 'styled-components';
import { onTablet } from 'roleypoly/src/design-system/atoms/breakpoints';
import * as _ from 'styled-components'; // tslint:disable-line:no-duplicate-imports

export const HalfsiesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
`;

export const HalfsiesItem = styled.div`
    box-sizing: border-box;
    flex: 1 1 100%;
    ${onTablet(css`
        flex: 1 2 50%;
    `)}
`;

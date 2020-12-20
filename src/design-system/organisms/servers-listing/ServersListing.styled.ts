import { onTablet } from 'roleypoly/design-system/atoms/breakpoints';
import styled, { css } from 'styled-components';

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: calc(98vw - 15px);
    padding-bottom: 25px;
    ${onTablet(css`
        flex-direction: row;
        flex-wrap: wrap;
    `)}
`;

export const CardContainer = styled.div`
    box-sizing: border-box;
    margin-bottom: 5px;
    ${onTablet(css`
        margin: 5px;
        flex-basis: 30%;
        max-width: 30%;
    `)}
`;

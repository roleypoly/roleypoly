import { onSmallScreen } from 'atoms/breakpoints';
import { palette } from 'atoms/colors';
import { text300, text500, text700 } from 'atoms/typography';
import styled, { css } from 'styled-components';

export const ErrorWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    ${onSmallScreen(css`
        display: block;
        text-align: center;
    `)}
`;

export const ErrorDivider = styled.div`
    width: 1px;
    height: 3em;
    background: ${palette.grey600};
    margin: 0 1em;
    ${onSmallScreen(css`
        display: none;
    `)}
`;

export const ErrorSideCode = styled.div`
    ${text700}
    ${onSmallScreen(css`
        margin-bottom: 0.4em;
    `)}
`;

export const ErrorText = styled.div`
    ${text500}
`;

export const ErrorTextLower = styled.div`
    ${text300}
    color: ${palette.taupe500};
`;

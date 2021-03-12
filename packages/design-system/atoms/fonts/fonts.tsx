import styled, { css } from 'styled-components';

export const fontCSS = css`
    font-family: 'source-han-sans-japanese', 'Source Sans Pro', sans-serif,
        'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol' !important;
`;

export const UseFontStyled = styled.div`
    ${fontCSS}
`;

import styled, { css } from 'styled-components';
import { onSmallScreen } from '../breakpoints';

export const Collapse = styled.span<{ preventCollapse?: boolean }>`
    ${(props) =>
        !props.preventCollapse &&
        onSmallScreen(css`
            display: none;
        `)}
`;

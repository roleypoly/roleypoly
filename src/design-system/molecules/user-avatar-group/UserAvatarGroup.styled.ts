import styled, { css } from 'styled-components';
import { onSmallScreen } from 'roleypoly/src/design-system/atoms/breakpoints';
import { palette } from 'roleypoly/src/design-system/atoms/colors';
import * as _ from 'styled-components'; // eslint-disable-line no-duplicate-imports

export const Collapse = styled.div<{ preventCollapse: boolean }>`
    ${(props) =>
        !props.preventCollapse &&
        onSmallScreen(css`
            display: none;
        `)}
`;

export const Group = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    white-space: nowrap;
`;

export const Discriminator = styled.span`
    color: ${palette.taupe500};
    font-size: 75%;
    padding: 0 5px;
`;

export const GroupText = styled.span`
    position: relative;
    top: -2px;
`;

import styled, { css } from 'styled-components';
import { palette } from 'roleypoly/src/design-system/atoms/colors';
import { transitions } from 'roleypoly/src/design-system/atoms/timings';
import { onTablet } from 'roleypoly/src/design-system/atoms/breakpoints';
import * as _ from 'styled-components'; // eslint-disable-line no-duplicate-imports

export const TabViewStyled = styled.div``;

export const TabTitleRow = styled.div`
    display: flex;
    border-bottom: 1px solid ${palette.taupe100};
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
`;

export const TabTitle = styled.div<{ selected: boolean }>`
    flex: 1;
    text-align: center;
    padding: 0.7em 1em;
    border-bottom: 3px solid transparent;
    transition: border-color ${transitions.in2out}s ease-in-out,
        color ${transitions.in2out}s ease-in-out;
    cursor: pointer;
    color: ${palette.taupe500};
    ${(props) =>
        props.selected
            ? css`
                  color: unset;
                  border-bottom-color: ${palette.taupe500};
              `
            : css`
                  &:hover {
                      border-bottom-color: ${palette.taupe300};
                      color: unset;
                  }
              `};
    ${onTablet(css`
        padding: 0.45em 1em;
    `)}
`;

export const TabContent = styled.div``;

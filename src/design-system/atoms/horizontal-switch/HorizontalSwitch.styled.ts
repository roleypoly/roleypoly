import { palette } from 'roleypoly/design-system/atoms/colors';
import { transitions } from 'roleypoly/design-system/atoms/timings';
import styled, { css } from 'styled-components';

export const Item = styled.div<{ selected: boolean }>`
    padding: 10px;
    box-sizing: border-box;
    transition: background-color ease-in-out ${transitions.actionable}s;
    ${(props) =>
        props.selected &&
        css`
            background-color: ${palette.taupe300};
        `}
`;

export const Wrapper = styled.div`
    display: inline-flex;
    user-select: none;
    cursor: pointer;
    border: 1px solid ${palette.taupe200};
    border-radius: calc(1em + 20px);
    overflow: hidden;
`;

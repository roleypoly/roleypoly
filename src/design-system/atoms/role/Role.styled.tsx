import styled, { css } from 'styled-components';
import { transitions } from 'roleypoly/src/design-system/atoms/timings';
import { palette } from 'roleypoly/src/design-system/atoms/colors';
import * as _ from 'styled-components'; // eslint-disable-line no-duplicate-imports

export type StyledProps = {
    selected: boolean;
    defaultColor: boolean;
    disabled: boolean;
};

export const Outer = styled.div<StyledProps>`
    border-radius: 24px;
    background-color: ${(props) =>
        props.selected && !props.defaultColor ? 'var(--role-color)' : palette.taupe100};
    color: ${(props) => (props.selected ? 'var(--role-contrast)' : palette.grey600)};
    transition: color ${transitions.in2in}s ease-in-out,
        background-color ${transitions.in2in}s ease-in-out,
        transform ${transitions.actionable}s ease-in-out,
        box-shadow ${transitions.actionable}s ease-in-out;
    display: flex;
    padding: 4px;
    user-select: none;
    overflow: hidden;
    cursor: pointer;
    ${(props) =>
        !props.disabled
            ? css`
                  &:hover {
                      transform: translateY(-2px);
                      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
                  }

                  &:active {
                      transform: translateY(0);
                      box-shadow: 0 0 0 transparent;
                  }
              `
            : null};
`;

export const Circle = styled.div<StyledProps>`
    width: 24px;
    height: 24px;
    border-radius: 25px;
    background-color: ${(props) =>
        props.defaultColor && !props.selected ? 'transparent' : 'var(--role-color)'};
    border: 1px solid
        ${(props) =>
            props.defaultColor
                ? 'var(--role-color)'
                : props.selected
                ? 'var(--role-accent)'
                : 'transparent'};
    display: flex;
    justify-content: center;
    align-items: center;
    transition: border ${transitions.in2in}s ease-in-out,
        background-color ${transitions.in2in}s ease-in-out;
    flex-shrink: 0;

    svg {
        width: 10px;
        height: 10px;
        fill-opacity: ${(props) => (props.selected || props.disabled ? 1 : 0)};
        transition: fill-opacity ${transitions.in2in}s ease-in-out;
        fill: ${(props) =>
            props.disabled && props.defaultColor
                ? 'var(--role-color)'
                : 'var(--role-contrast)'};
    }
`;

export const Text = styled.div`
    padding: 0 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

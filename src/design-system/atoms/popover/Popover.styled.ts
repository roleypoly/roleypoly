import { onSmallScreen, onTablet } from 'roleypoly/design-system/atoms/breakpoints';
import { palette } from 'roleypoly/design-system/atoms/colors';
import { transitions } from 'roleypoly/design-system/atoms/timings';
import styled, { css } from 'styled-components';

type PopoverStyledProps = {
    active: boolean;
    preferredWidth?: number;
};

export const PopoverBase = styled.div<PopoverStyledProps>`
    box-sizing: border-box;
    position: absolute;
    background-color: ${palette.taupe100};
    padding: 5px;
    border: 2px solid rgba(0, 0, 0, 0.15);
    border-radius: 3px;
    z-index: 10;
    transition: opacity ${transitions.out2in}s ease-in,
        transform ${transitions.out2in}s ease-in;
    min-width: ${(props) => props.preferredWidth || 320}px;
    max-width: 100vw;
    ${(props) =>
        !props.active &&
        css`
            transform: translateY(-2vh);
            opacity: 0;
            pointer-events: none;
        `}
    ${onSmallScreen(css`
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        min-width: unset;
        width: 100vw;
        height: 100vh;
    `)};
`;

export const DefocusHandler = styled.div<PopoverStyledProps>`
    background-color: rgba(0, 0, 0, 0.01);
    position: fixed;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    ${(props) =>
        !props.active &&
        css`
            display: none;
            pointer-events: none;
        `}
`;

export const PopoverHead = styled.div`
    display: flex;
    align-items: center;
`;

export const PopoverHeadCloser = styled.div`
    flex: 0;
    font-size: 2em;
    cursor: pointer;
    margin-right: 10px;
    border-radius: 2em;
    min-width: 1.4em;
    height: 1.4em;
    display: flex;
    align-items: center;
    justify-content: center;
    ${onTablet(
        css`
            display: none;
        `
    )}

    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }
`;

export const PopoverContent = styled.div`
    padding: 5px;
`;

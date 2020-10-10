import styled from 'styled-components';
import { palette } from 'atoms/colors';
import { transitions } from 'atoms/timings';

export const Base = styled.div`
    text-align: right;
    display: flex;
    flex-direction: column;
    user-select: none;
`;

export const NavAction = styled.div`
    height: 2.25em;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    transition: color ${transitions.actionable}s ease-in-out;
    color: ${palette.taupe500};
    box-sizing: border-box;

    &:hover {
        cursor: pointer;
        color: ${palette.taupe600};
    }

    svg {
        font-size: 120%;
        box-sizing: content-box;
        padding: 5px 8px;
        position: relative;
        top: 0.1em;
    }
`;

import styled from 'styled-components';
import { transitions } from 'atoms/timings';
import { palette } from 'atoms/colors';

export const GuildNavItem = styled.a`
    display: flex;
    align-items: center;
    transition: border ${transitions.in2in}s ease-in-out;
    border: 1px solid transparent;
    border-radius: 3px;
    box-sizing: border-box;
    margin: 5px;
    user-select: none;
    color: unset;
    text-decoration: none;

    &:hover {
        border-color: ${palette.taupe300};
        cursor: pointer;
    }
`;

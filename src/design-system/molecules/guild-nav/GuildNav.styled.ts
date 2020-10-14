import styled from 'styled-components';
import * as _ from 'styled-components'; // tslint:disable-line:no-duplicate-imports
import { transitions } from 'roleypoly/src/design-system/atoms/timings';
import { palette } from 'roleypoly/src/design-system/atoms/colors';

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

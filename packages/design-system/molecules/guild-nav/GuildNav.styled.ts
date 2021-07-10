import { palette } from '@roleypoly/design-system/atoms/colors';
import { transitions } from '@roleypoly/design-system/atoms/timings';
import { text400 } from '@roleypoly/design-system/atoms/typography';
import styled from 'styled-components';

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

export const SectionHead = styled.div`
  ${text400}

  display: flex;
  align-items: center;
  justify-content: left;
  svg {
    position: relative;
    top: 1px;
    color: ${palette.taupe500};
  }
`;

export const HeadLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: ${palette.taupe300};
  margin-left: 0.5em;
`;

import { onSmallScreen } from '@roleypoly/design-system/atoms/breakpoints';
import { palette } from '@roleypoly/design-system/atoms/colors';
import { transitions } from '@roleypoly/design-system/atoms/timings';
import styled, { css } from 'styled-components';

export const HideIfSmall = styled.div`
  display: initial;

  ${onSmallScreen(css`
    display: none;
  `)}
`;
export const HideIfNotSmall = styled.div`
  display: none;

  ${onSmallScreen(css`
    display: initial;
  `)}
`;

export const NavItem = styled.div<{ selected: boolean }>`
  padding: 7px;
  border-radius: 2px;
  margin-bottom: 2px;
  transition: background-color ${transitions.actionable}s ease-in-out;

  &:hover {
    background-color: ${palette.taupe400};
  }

  ${(props) =>
    props.selected &&
    css`
      background-color: ${palette.taupe300};
    `}
`;

export const DropdownNavIcon = styled.div`
  padding: 5px;
  transition: transform ${transitions.actionable}s ease-in-out;
  transform: translateY(2px);
`;

export const DropdownNavCurrent = styled.div`
  padding: 5px;
`;

export const DropdownNavOpener = styled.div`
  padding: 5px;
  display: flex;
  cursor: pointer;
  border-radius: 2px;
  transition: background-color ${transitions.actionable}s ease-in-out;
  width: 98vw;

  &:hover {
    background-color: ${palette.taupe300};
    ${DropdownNavIcon} {
      transform: translateY(3px);
    }
  }
`;

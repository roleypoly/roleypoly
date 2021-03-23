import styled, { css } from 'styled-components';
import { palette } from '../colors';
import { transitions } from '../timings';

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

  &:hover {
    background-color: ${palette.taupe300};
    ${DropdownNavIcon} {
      transform: translateY(3px);
    }
  }
`;

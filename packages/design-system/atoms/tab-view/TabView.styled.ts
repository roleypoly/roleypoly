import styled, { css } from 'styled-components';
import { onSmallScreen } from '../breakpoints';
import { palette } from '../colors';
import { transitions } from '../timings';
import { text500 } from '../typography';

export const TabViewStyled = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;

  ${onSmallScreen(
    css`
      flex-direction: column;
    `
  )}
`;

export const TabTitleRow = styled.div`
  flex: 1;
  width: 23vw;
  position: fixed;
  ${onSmallScreen(
    css`
      width: fit-content;
      position: unset;
      max-width: 98vw;
    `
  )}
`;

export const TabTitle = styled.div<{ selected: boolean }>`
  padding: 7px;
  cursor: pointer;
  transition: background-color ${transitions.actionable}s ease-in-out;
  border-radius: 2px;
  margin-bottom: 5px;

  &:hover {
    background-color: ${palette.taupe400};
  }

  ${(props) =>
    props.selected &&
    css`
      background-color: ${palette.taupe300};
    `}
`;

export const TabContent = styled.div`
  padding-left: 1em;
  margin-left: 23vw;
  flex: 1;

  ${onSmallScreen(
    css`
      padding-left: 0;
      margin-left: 0;
      position: unset;
      max-width: 100vw;
    `
  )}
`;

export const TabContentTitle = styled.div`
  ${text500}

  border-bottom: 1px solid rgb(0 0 0 / 10%);
  padding: 0.5em 7px;
`;

export const TabDepth = styled.div`
  margin-left: 7px;
`;

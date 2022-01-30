import { onSmallScreen, onTablet } from '@roleypoly/design-system/atoms/breakpoints';
import { palette } from '@roleypoly/design-system/atoms/colors';
import { transitions } from '@roleypoly/design-system/atoms/timings';
import { text200, text500 } from '@roleypoly/design-system/atoms/typography';
import styled, { css } from 'styled-components';

export const CardLine = styled.div<{ left?: boolean }>`
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 5px;
  box-sizing: border-box;
  ${(props) =>
    props.left &&
    css`
      flex: 1;
      justify-content: flex-end;
      align-items: flex-end;
    `}
`;

export const MaxWidthTitle = styled.div`
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const PermissionTagStyled = styled.div<{ hiddenOnSmall?: boolean }>`
  ${text200}

  display: inline-block;
  background-color: ${palette.taupe200};
  padding: 4px 6px;
  border-radius: 2px;

  svg {
    position: relative;
    top: 1px;
    ${onTablet(
      css`
        margin-right: 2px;
      `
    )}
  }

  ${(props) =>
    props.hiddenOnSmall &&
    onSmallScreen(
      css`
        display: none;
      `
    )}
`;

export const CardBase = styled.div`
  ${text500}

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-color: ${palette.taupe300};
  overflow-x: hidden;
  text-align: center;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 3px;
  cursor: pointer;
  user-select: none;
  transform: translate(0);
  transition: transform ease-in-out ${transitions.actionable}s,
    box-shadow ease-in-out ${transitions.actionable}s,
    border-color ease-in-out ${transitions.out2in}s;
  box-sizing: border-box;
  max-width: 98vw;
  :hover {
    box-shadow: 0 2px 2px rgb(0 0 0 / 25%);
    transform: translate(0, -1px);
  }
  :active {
    box-shadow: 0 1px 2px rgb(0 0 0 / 25%);
    transform: translate(0);
  }

  ${onTablet(css`
    flex-direction: column;
    justify-content: left;
  `)}
`;

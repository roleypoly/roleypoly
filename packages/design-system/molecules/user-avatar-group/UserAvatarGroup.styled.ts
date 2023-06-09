import { onSmallScreen } from '@roleypoly/design-system/atoms/breakpoints';
import { palette } from '@roleypoly/design-system/atoms/colors';
import styled, { css } from 'styled-components';

export const Collapse = styled.div<{ preventCollapse: boolean }>`
  ${(props) =>
    !props.preventCollapse &&
    onSmallScreen(css`
      display: none;
    `)}
`;

export const Group = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  white-space: nowrap;
`;

export const Discriminator = styled.span`
  color: ${palette.taupe500};
  font-size: 75%;
  padding-left: 5px;
`;

export const GroupText = styled.span`
  position: relative;
  top: -2px;
  padding-right: 5px;
`;

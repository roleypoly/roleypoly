import { onTablet } from '@roleypoly/design-system/atoms/breakpoints';
import styled, { css } from 'styled-components';

export const HalfsiesItem = styled.div`
  box-sizing: border-box;
  flex: 1 1 100%;
  ${onTablet(css`
    flex: 1 2 50%;
  `)}
`;

export const HalfsiesContainer = styled.div<{ center?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  ${({ center }) =>
    center &&
    css`
      align-content: center;
    `}
`;

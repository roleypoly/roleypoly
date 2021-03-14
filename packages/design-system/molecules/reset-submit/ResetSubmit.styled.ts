import { onSmallScreen } from '@roleypoly/design-system/atoms/breakpoints';
import styled from 'styled-components';

export const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Left = styled.div`
  flex: 0;
  ${onSmallScreen`
    flex: 1 1 100%; 
    order: 2;
  `}
`;

export const Right = styled.div`
  flex: 1;
`;

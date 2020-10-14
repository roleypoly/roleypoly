import styled from 'styled-components';
import * as _ from 'styled-components'; // tslint:disable-line:no-duplicate-imports
import { onSmallScreen } from 'roleypoly/src/design-system/atoms/breakpoints';

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

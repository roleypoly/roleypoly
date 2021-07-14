import { palette } from '@roleypoly/design-system/atoms/colors';
import styled, { css } from 'styled-components';

export const Space = styled.div`
  height: 15px;
`;

export const LinedSpace = styled.div<{ width?: number }>`
  height: 7.5px;
  margin-top: 7.5px;
  border-top: 1px solid ${palette.taupe300};
  ${(props) =>
    props.width &&
    css`
      width: ${props.width}px;
    `}
`;

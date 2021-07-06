import { onSmallScreen } from '@roleypoly/design-system/atoms/breakpoints';
import styled, { css } from 'styled-components';

export const Head = styled.div`
  margin: 7px 5px;
  line-height: 200%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeadTitle = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const HeadSub = styled.div`
  flex-shrink: 0;
  margin-top: -4px;
`;

export const Box = styled.div`
  display: flex;
  align-items: top;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Section = styled.div<{ big?: boolean }>`
  padding: 7px 5px;
  flex: 1 2 ${(props) => (props.big ? '100%' : '50%')};
  ${onSmallScreen(css`
    flex-basis: 100%;
  `)}
`;

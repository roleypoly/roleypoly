import { onTablet } from '@roleypoly/design-system/atoms/breakpoints';
import { palette } from '@roleypoly/design-system/atoms/colors';
import { text500 } from '@roleypoly/design-system/atoms/typography';
import styled, { css } from 'styled-components';

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: calc(98vw - 15px);
  padding-bottom: 25px;
  ${onTablet(css`
    flex-direction: row;
    flex-wrap: wrap;
  `)}
`;

export const CardContainer = styled.div`
  box-sizing: border-box;
  margin-bottom: 5px;
  ${onTablet(css`
    margin: 5px;
    flex-basis: 30%;
    max-width: 30%;
  `)}
`;

export const SectionHead = styled.div`
  ${text500}
  flex: 1 1 100%;
  padding: 0.6em;
  display: flex;
  align-items: center;
  justify-content: left;

  svg {
    position: relative;
    top: 1px;
    color: ${palette.taupe500};
  }
`;

export const Line = styled.div`
  height: 1px;
  flex: 1;
  background-color: ${palette.taupe400};
  margin-left: 1em;
`;

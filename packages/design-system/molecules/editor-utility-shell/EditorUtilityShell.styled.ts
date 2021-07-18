import { onSmallScreen } from '@roleypoly/design-system/atoms/breakpoints';
import { text900 } from '@roleypoly/design-system/atoms/typography';
import styled, { css } from 'styled-components';

export const Shell = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeadBox = styled.div`
  ${text900}

  display: flex;
  align-items: center;
  justify-content: space-around;

  svg {
    margin-right: 0.5em;
    position: relative;
    top: 0.125em;
  }

  ${onSmallScreen(
    css`
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `
  )}
`;

export const Content = styled.div`
  width: 960px;
  max-width: 90vw;
  margin: 0 auto;
  padding: 1.6em 0;
`;

export const Title = styled.div`
  ${onSmallScreen(
    css`
      order: 2;
      flex: 1 1 100%;
    `
  )}
`;

export const GoBack = styled.div`
  display: flex;
  button {
    margin-right: 0.5em;
  }

  ${onSmallScreen(
    css`
      order: 1;
      flex: 1 1 100%;
    `
  )}
`;

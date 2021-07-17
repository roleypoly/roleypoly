import { palette } from '@roleypoly/design-system/atoms/colors';
import { transitions } from '@roleypoly/design-system/atoms/timings';
import { text200, text400 } from '@roleypoly/design-system/atoms/typography';
import styled from 'styled-components';

export const ClickaleBlock = styled.a`
  display: flex;
  color: unset;
  text-decoration: none;
  align-items: center;
  padding: 0.5em;
  transition: background-color ${transitions.actionable}s ease-in-out;
  box-sizing: border-box;
  justify-content: space-between;
  max-width: 93vw;

  :hover {
    background-color: ${palette.taupe300};
  }
`;

export const Title = styled.div`
  ${text400};
  /* padding: 0.15em 0; */

  svg {
    color: ${palette.taupe500};
    position: relative;
    top: 2px;
  }
`;

export const Description = styled.div`
  ${text200};
`;

export const MainSide = styled.div``;

import { palette } from '@roleypoly/design-system/atoms/colors';
import { transitions } from '@roleypoly/design-system/atoms/timings';
import styled from 'styled-components';

export const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  a {
    color: ${palette.taupe500};
    text-decoration: none;
    transition: color ${transitions.actionable}s ease-in-out;
    &:hover {
      color: ${palette.taupe600};
    }
  }
`;

export const HoverColor = styled.div`
  opacity: 0.3;
  filter: saturate(0);
  transition: all ${transitions.in2in}s ease-in-out;

  &:hover {
    opacity: 1;
    filter: none;
  }
`;

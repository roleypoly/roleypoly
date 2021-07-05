import { palette } from '@roleypoly/design-system/atoms/colors';
import styled, { css } from 'styled-components';
import { transitions } from '../timings';

export const ToggleState = styled.div`
  height: 1em;
  width: 1em;
  border-radius: 1em;
  background-color: ${palette.grey600};
  position: absolute;
  top: 0.15em;
  left: 0.15em;
  transform: translateX(0);

  @media (prefers-reduced-motion: no-preference) {
    transition: transform ${transitions.actionable}s ease-in-out;
  }
`;

export const ToggleSwitch = styled.div<{ state: boolean }>`
  display: inline-block;
  background-color: ${(props) => (props.state ? palette.green200 : 'rgba(0,0,0,0.45)')};
  height: 1.3em;
  width: 2.6em;
  border-radius: 1.3em;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.1);
  top: 0.23em;
  transition: background-color ${transitions.in2in}s ease-in-out;
  cursor: pointer;
  margin-right: 0.5em;

  ${ToggleState} {
    ${(props) =>
      props.state === true &&
      css`
        transform: translateX(1.3em);
      `}
  }
`;

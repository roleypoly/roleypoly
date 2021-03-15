import styled, { keyframes } from 'styled-components';
import { palette } from '../colors';

type SpinnerProps = {
  size?: number;
  reverse?: boolean;
  color?: string;
  speed?: number;
};

const spinnerKeyframes = keyframes`
  0%, 100% {
    border-width: 0;
    border-right-width: 3px;
  }
  25% {
    border-width: 0;
    border-top-width: 3px;
  }
  50% {
    border-width: 0;
    border-left-width: 3px;
  }
  75% {
    border-width: 0;
    border-bottom-width: 3px;
  }
`;

const SpinnerStyled = styled.div<Required<SpinnerProps>>`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${spinnerKeyframes} ${(props) => props.speed}s linear infinite
      ${(props) => (props.reverse ? `reverse` : '')};
    transform: rotateZ(0);
  }

  border: 0 solid ${(props) => props.color};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size * 0.7}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Spinner = (
  props: SpinnerProps & { innerColor?: string; outerColor?: string }
) => (
  <SpinnerStyled
    size={props.size || 50}
    color={props.outerColor || palette.taupe400}
    reverse={!!props.reverse}
    speed={props.speed || 1}
  >
    <SpinnerStyled
      size={(props.size || 50) * 0.75}
      color={props.innerColor || palette.taupe100}
      reverse={!props.reverse}
      speed={(props.speed || 1) * 1.25}
    />
  </SpinnerStyled>
);

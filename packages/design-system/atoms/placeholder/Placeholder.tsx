import styled, { css, keyframes } from 'styled-components';
import { palette } from '../colors';

export const fadeInOut = keyframes`
  from {
    background-color: var(--placeholder-first-color);
  } 
  to {
    background-color: var(--placeholder-second-color);
  }
`;

export const animateFade = (firstColor?: string, secondColor?: string) => css`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${fadeInOut} 2s ease-in-out infinite alternate;
  }

  --placeholder-first-color: ${firstColor};
  --placeholder-second-color: ${secondColor};
`;

type PlaceholderProps = {
  forceReduceMotion?: boolean;
  firstColor?: string;
  secondColor?: string;
};

export const PlaceholderBox = styled.div<PlaceholderProps>`
  width: 7em;
  height: 1em;
  background-color: ${(props) => props.firstColor || palette.taupe200};
  display: inline-block;
  border-radius: 2px;
  position: relative;
  top: 0.2em;
  ${(props) =>
    props.secondColor &&
    !props.forceReduceMotion &&
    animateFade(props.firstColor, props.secondColor)}
`;

export const opacityInOut = keyframes`
  from {
    opacity: 0.6;
  } 
  to {
    opacity: 0.3;
  }
`;

export const animateOpacity = css`
  @media (prefers-reduced-motion: no-preference) {
    animation: ${opacityInOut} 5s ease-in-out infinite alternate;
  }
`;

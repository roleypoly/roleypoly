import { palette } from '@roleypoly/design-system/atoms/colors';
import { fontCSS } from '@roleypoly/design-system/atoms/fonts';
import { text300, text400 } from '@roleypoly/design-system/atoms/typography';
import styled, { css } from 'styled-components';

export const IconContainer = styled.div<{ small?: boolean }>`
  margin-right: 0.6rem;
  font-size: 1.75em;

  ${(props) =>
    props.small &&
    css`
      margin-right: 0.2rem;
      font-size: 1.25em;
      position: relative;
      top: 2px;
    `}
`;

const base = css`
  ${fontCSS}

  appearance: none;
  display: block;
  background-color: ${palette.taupe300};
  color: ${palette.grey500};
  border-radius: 3px;
  border: 2px solid rgb(0 0 0 / 55%);
  transition: all 0.15s ease-in-out;
  outline: 0;
  position: relative;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;

  ::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #000;
    opacity: 0%;
    transition: all 0.15s ease-in-out;
  }

  :hover {
    transform: translateY(-1px);
    box-shadow: 0 1px 2px rgb(0 0 0 / 15%);
  }

  :active {
    transform: translateY(1px);
    box-shadow: 0 0 2px rgb(0 0 0 / 25%);
    ::after {
      opacity: 10%;
    }
  }
`;

const colors = {
  primary: css`
    background-color: ${palette.green400};
    color: ${palette.taupe100};
  `,
  secondary: css``,
  discord: css`
    background-color: ${palette.discord400};
    border: 2px solid ${palette.discord200};
  `,
  muted: css`
    border: 2px solid rgb(0 0 0 / 15%);
    background: none;
    :hover {
      background-color: ${palette.taupe200};
    }
  `,
  silent: css`
    background: none;
    border-color: transparent;
    :hover {
      background-color: ${palette.taupe200};
    }
  `,
};

const sizes = {
  small: css`
    ${text300}

    padding: 4px 8px;
  `,
  large: css`
    ${text400}

    padding: 12px 32px;
    width: 100%;
  `,
};

const modifiers = {
  withIcon: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  withLoading: css`
    pointer-events: none;
  `,
};

export type ButtonComposerOptions = {
  size: keyof typeof sizes;
  color: keyof typeof colors;
  modifiers?: Array<keyof typeof modifiers>;
};

export const Button = styled.button<ButtonComposerOptions>`
  ${base}
  ${(props) => props.size in sizes && sizes[props.size]}
    ${(props) => props.color in colors && colors[props.color]}
    ${(props) => props.modifiers?.map((m) => modifiers[m])}
`;

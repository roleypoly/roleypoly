import { numberToChroma, palette } from '@roleypoly/design-system/atoms/colors';
import { Role } from '@roleypoly/types';
import chroma from 'chroma-js';
import { GoCheck, GoQuestion, GoX } from 'react-icons/go';
import styled, { css, keyframes } from 'styled-components';

export const DiscordBase = styled.div`
  background-color: ${palette.discord100};
  border: solid 1px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  padding: 10px;
  user-select: none;
  width: 250px;
`;

const hover = (roleColor: string) => css`
  color: #efefef;
  background-color: ${roleColor};
  cursor: pointer;
`;

const isBadFlash = keyframes`
  /* stylelint-disable function-name-case, function-whitespace-after */

  0%, 100% {
    box-shadow: 0 0 8px ${chroma(palette.red400).alpha(0.5).css()}
  }

  66% {
    box-shadow: 0 0 2px ${chroma(palette.red200).alpha(0.5).css()}
  }

  33% {
    box-shadow: 0 0 2px ${chroma(palette.red400).alpha(0.5).css()}
  }
`;

export const DiscordRole = styled.div<{
  discordRole: Role;
  isRoleypoly: boolean;
  isGood: boolean;
}>`
  /* stylelint-disable function-name-case, function-whitespace-after */

  /* Disabled due to postcss bug parsing the below functions as CSS and not a JS interpolation */

  padding: 6px 10px;
  color: ${(props) => numberToChroma(props.discordRole.color).css()};
  border-radius: 3px;

  :hover {
    ${(props) => hover(numberToChroma(props.discordRole.color).alpha(0.5).css())}
  }

  ${(props) =>
    props.isRoleypoly && hover(numberToChroma(props.discordRole.color).alpha(0.5).css())}
  ${(props) =>
    !props.isGood &&
    props.isRoleypoly &&
    css`
      animation: ${isBadFlash} 0.5s 10s ease-in-out both;
    `}
`;

const bumpDown = css`
  position: relative;
  top: 0.1em;
  margin-right: 0.25em;
`;

export const Dont = styled(GoX)`
  ${bumpDown}
  color: ${palette.red400};
`;
export const Do = styled(GoCheck)`
  ${bumpDown}
  color: ${palette.green400};
`;
export const Why = styled(GoQuestion)`
  ${bumpDown}
  color: ${palette.discord400};
`;

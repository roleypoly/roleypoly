import { palette } from '@roleypoly/design-system/atoms/colors';
import styled from 'styled-components';

const levelColors = {
  error: palette.red400,
  warn: palette.gold400,
  info: palette.discord400,
  chrome: palette.taupe400,
  success: palette.green400,
  none: 'unset',
};

export type IconHelperLevel = keyof typeof levelColors;

export const IconHelperStyled = styled.span<{
  level: IconHelperLevel;
}>`
  position: relative;
  top: 0.12em;
  color: ${(props) => levelColors[props.level]};
`;

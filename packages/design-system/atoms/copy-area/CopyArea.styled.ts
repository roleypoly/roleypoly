import { palette } from '@roleypoly/design-system/atoms/colors';
import { StyledTextInput } from '@roleypoly/design-system/atoms/text-input';
import styled, { css } from 'styled-components';

export const CopyAreaStyled = styled.div`
  cursor: pointer;
`;

export const CopyAreaTextInput = styled(StyledTextInput)<{ copied?: boolean }>`
  margin: 0.5em 0;
  cursor: pointer;
  font-size: 1em;
  ${({ copied }) =>
    copied &&
    css`
      border-color: ${palette.green400} !important;
      box-shadow: inset 0 0 2px ${palette.green200} !important;
    `}
`;

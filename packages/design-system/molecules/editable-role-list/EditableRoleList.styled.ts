import { palette } from '@roleypoly/design-system/atoms/colors';
import { transitions } from '@roleypoly/design-system/atoms/timings';
import styled, { css } from 'styled-components';

export const EditableRoleListStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > div {
    margin: 2.5px;
  }
`;

export const AddRoleButton = styled.div<{ long?: boolean }>`
  border: 2px solid ${palette.taupe500};
  color: ${palette.taupe500};
  border-radius: 24px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${transitions.actionable}s ease-in-out;

  &:hover {
    background-color: ${palette.taupe100};
    transform: translateY(-2px);
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  ${(props) =>
    props.long
      ? css`
          padding: 0 14px;
        `
      : css`
          width: 32px;
        `};
`;

import { transitions } from '@roleypoly/design-system/atoms/timings';
import { CategoryContainer } from '@roleypoly/design-system/organisms/role-picker/RolePicker.styled';
import styled, { css } from 'styled-components';

export const CategoryActions = styled.div<{ right?: boolean }>`
  display: flex;
  flex-direction: row;

  & > button {
    ${(props) =>
      props.right
        ? css`
            margin-left: 5px;
          `
        : css`
            margin-right: 5px;
          `};
  }

  ${(props) =>
    props.right &&
    css`
      justify-content: flex-end;
    `}
`;

export const ReorderButton = styled.div`
  height: 40px;
  width: 40px;
  font-size: 20px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color ${transitions.actionable}s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

export const ReorderCategoryContainer = styled(CategoryContainer)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
`;

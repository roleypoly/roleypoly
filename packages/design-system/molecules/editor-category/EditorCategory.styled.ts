import { onSmallScreen } from '@roleypoly/design-system/atoms/breakpoints';
import { palette } from '@roleypoly/design-system/atoms/colors';
import { transitions } from '@roleypoly/design-system/atoms/timings';
import styled, { css } from 'styled-components';

export const Head = styled.div`
  margin: 7px 5px;
  line-height: 200%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeadTitle = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const HeadSub = styled.div`
  flex-shrink: 0;
  margin-top: -4px;
`;

export const Box = styled.div`
  display: flex;
  align-items: top;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Section = styled.div<{ big?: boolean; actions?: boolean }>`
  padding: 7px 5px;
  flex: 1 2 ${(props) => (props.big ? '100%' : '50%')};
  ${onSmallScreen(css`
    flex-basis: 100%;
  `)}

  ${(props) =>
    props.actions &&
    css`
      display: flex;
    `}
`;

export const RoleContainer = styled.div`
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
    box-shadow: 0 1px 1px rgb(0 0 0 / 10%);
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
        `}
`;

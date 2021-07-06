import styled, { css } from 'styled-components';
import { onSmallScreen } from './Breakpoints';

const ShowOnSmall = styled.span`
  display: none;
  ${onSmallScreen(css`
    display: initial;
  `)}
`;

const ShowOnLarge = styled.span`
  display: initial;
  ${onSmallScreen(css`
    display: none;
  `)}
`;

export const BreakpointText = (props: { small: string; large: string }) => {
  const { small, large } = props;
  return (
    <>
      <ShowOnSmall>{small}</ShowOnSmall>
      <ShowOnLarge>{large}</ShowOnLarge>
    </>
  );
};

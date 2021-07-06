import { Link } from '@reach/router';
import { onSmallScreen } from '@roleypoly/design-system/atoms/breakpoints';
import { palette } from '@roleypoly/design-system/atoms/colors';
import { transitions } from '@roleypoly/design-system/atoms/timings';
import styled, { css } from 'styled-components';

export const MastheadBase = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: ${palette.taupe100};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  z-index: 100;
`;

export const MastheadAlignment = styled.div`
  max-width: 98vw;
  width: 1024px;
  display: flex;
  align-items: center;
`;

const sideBase = styled.div`
  flex: 1;
  display: flex;
`;

export const MastheadLeft = styled(sideBase)``;

export const MastheadRight = styled(sideBase)`
  flex: 0;
  justify-content: flex-end;
`;

export const MastheadCollapse = styled.div`
  ${onSmallScreen(css`
    display: none;
  `)}
`;

export const MastheadInner = styled.div`
  /* height: 30px; */
  display: flex;
  align-items: center;
`;

type InteractionBaseProps = {
  hide: boolean;
};
export const InteractionBase = styled.div<InteractionBaseProps>`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 5px;
  transition: opacity ${transitions.actionable}s ease-in-out,
    background-color ${transitions.actionable}s ease-in-out;
  opacity: ${(props) => (props.hide ? 1 : 0)};

  :hover {
    background-color: rgba(0, 0, 0, 0.15);
    cursor: pointer;
  }
`;

export const MastheadA = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: unset;
  text-decoration: unset;
`;

export const GuildPopoverHead = styled.div`
  display: flex;
  align-items: center;

  svg {
    color: ${palette.taupe500};
    padding: 5px;
    height: 1.4em;
    font-size: 2em;
    margin-right: 10px;
    margin-left: 16px;
    ${onSmallScreen(css`
      margin-left: 0;
    `)}
  }
`;

export const SecondaryBase = styled(MastheadBase)`
  top: 50px;
  background-color: ${palette.taupe300};
  z-index: 99;
  padding: 0 15px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
`;

export const IconHolder = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: 2px solid ${palette.taupe200};
  background-color: ${palette.taupe100};
  margin-right: 1em;
`;

export const TextHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

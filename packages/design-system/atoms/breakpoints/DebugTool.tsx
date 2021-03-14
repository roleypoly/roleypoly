import * as React from 'react';
import styled from 'styled-components';
import { onDesktop, onTablet } from './Breakpoints';
import { useBreakpointContext } from './Context';

const DebuggerPosition = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  font-family: monospace;
  & > div {
    display: flex;
  }
`;

const OnSmallScreen = styled.div`
  display: block;
`;

const OnTablet = styled.div`
  display: none;
  ${onTablet(`display: block;`)}
`;

const OnDesktop = styled.div`
  display: none;
  ${onDesktop`display: block;`}
`;

const CSSBreakpointDebugger = () => (
  <div>
    <OnSmallScreen style={{ backgroundColor: 'red' }}>S</OnSmallScreen>
    <OnTablet style={{ backgroundColor: 'green' }}>T</OnTablet>
    <OnDesktop style={{ backgroundColor: 'blue' }}>D</OnDesktop>
  </div>
);

const JSBreakpointDebugger = () => {
  const {
    screenSize: { onTablet, onDesktop, onSmallScreen },
  } = useBreakpointContext();

  return (
    <div>
      {onSmallScreen && <div style={{ backgroundColor: 'red' }}>S</div>}
      {onTablet && <div style={{ backgroundColor: 'green' }}>T</div>}
      {onDesktop && <div style={{ backgroundColor: 'blue' }}>D</div>}
    </div>
  );
};
export const BreakpointDebugTool = () => (
  <DebuggerPosition>
    <JSBreakpointDebugger />
    <CSSBreakpointDebugger />
  </DebuggerPosition>
);

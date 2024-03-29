import { animateOpacity } from '@roleypoly/design-system/atoms/placeholder';
import * as React from 'react';
import styled from 'styled-components';

const dotOverlayBase = styled.div`
  opacity: 60%;
  pointer-events: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: -10;
  background-size: 27px 27px;
`;

const DotOverlayDark = styled(dotOverlayBase)`
  background-image: radial-gradient(
    circle,
    #332d2d,
    #332d2d 1px,
    transparent 1px,
    transparent
  );
`;

const DotOverlayLight = styled(dotOverlayBase)`
  background-image: radial-gradient(
    circle,
    #dbd9d9,
    #dbd9d9 1px,
    transparent 1px,
    transparent
  );
`;

const DotOverlaySkeleton = styled(DotOverlayDark)`
  ${animateOpacity}
`;

export const DotOverlay = ({
  light,
  skeleton,
}: {
  light?: boolean;
  skeleton?: boolean;
}) => {
  return skeleton ? (
    <DotOverlaySkeleton />
  ) : light ? (
    <DotOverlayLight />
  ) : (
    <DotOverlayDark />
  );
};

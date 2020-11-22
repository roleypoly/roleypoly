import styled from 'styled-components';
import * as React from 'react';

const dotOverlayBase = styled.div`
    opacity: 0.6;
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

export const DotOverlay = ({ light }: { light?: boolean }) => {
    return light ? <DotOverlayLight /> : <DotOverlayDark />;
};

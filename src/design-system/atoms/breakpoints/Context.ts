import * as React from 'react';
import { withContext } from 'roleypoly/common/utils/withContext';

export type ScreenSize = {
    onSmallScreen: boolean;
    onTablet: boolean;
    onDesktop: boolean;
};

export type BreakpointProps = {
    screenSize: ScreenSize;
};

const defaultScreenSize: BreakpointProps = {
    screenSize: {
        onSmallScreen: true,
        onDesktop: false,
        onTablet: false,
    },
};

export const BreakpointContext = React.createContext(defaultScreenSize);

export const useBreakpointContext = () => React.useContext(BreakpointContext);

export const withBreakpoints = <T>(Component: React.ComponentType<T>) =>
    withContext(BreakpointContext, Component as any);

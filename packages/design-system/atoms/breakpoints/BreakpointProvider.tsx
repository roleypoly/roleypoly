import * as React from 'react';
import { mediaQueryDefs } from './Breakpoints';
import { BreakpointContext, BreakpointProps, ScreenSize } from './Context';

export const BreakpointsProvider = (props: { children: React.ReactNode }) => {
  const [screenSize, setScreenSize] = React.useState<ScreenSize>({
    onDesktop: false,
    onTablet: false,
    onSmallScreen: true, // Always true to be a viable "failback"
  });

  React.useEffect(() => {
    const mediaQueries = {
      onSmallScreen: window.matchMedia(
        mediaQueryDefs.onSmallScreen.replace('@media screen and', '')
      ),
      onTablet: window.matchMedia(
        mediaQueryDefs.onTablet.replace('@media screen and', '')
      ),
      onDesktop: window.matchMedia(
        mediaQueryDefs.onDesktop.replace('@media screen and', '')
      ),
    };

    const updateScreenSize = () => {
      setScreenSize({
        onDesktop: mediaQueries.onDesktop.matches,
        onTablet: mediaQueries.onTablet.matches,
        onSmallScreen: true, // Always true to be a viable "failback"
      });
    };

    updateScreenSize();
    setTimeout(() => updateScreenSize(), 0);
    setTimeout(() => updateScreenSize(), 10);

    mediaQueries.onDesktop.addEventListener('change', updateScreenSize);
    mediaQueries.onTablet.addEventListener('change', updateScreenSize);
    mediaQueries.onSmallScreen.addEventListener('change', updateScreenSize);

    return () => {
      mediaQueries.onDesktop.removeEventListener('change', updateScreenSize);
      mediaQueries.onTablet.removeEventListener('change', updateScreenSize);
      mediaQueries.onSmallScreen.removeEventListener('change', updateScreenSize);
    };
  }, []);

  const breakpointsValue: BreakpointProps = {
    screenSize,
  };

  return (
    <BreakpointContext.Provider value={breakpointsValue}>
      {props.children}
    </BreakpointContext.Provider>
  );
};

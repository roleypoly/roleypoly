import * as React from 'react';
import { mediaQueryDefs } from './Breakpoints';
import { ScreenSize, BreakpointContext } from './Context';

const resetScreen: ScreenSize = {
    onSmallScreen: false,
    onTablet: false,
    onDesktop: false,
};

export class BreakpointsProvider extends React.Component<{}, ScreenSize> {
    public state = {
        ...resetScreen,
        onSmallScreen: true,
    };

    private mediaQueries: { [key in keyof ScreenSize]: MediaQueryList } = {
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

    componentDidMount() {
        Object.entries(this.mediaQueries).forEach(([key, mediaQuery]) =>
            mediaQuery.addEventListener('change', this.handleMediaEvent)
        );
    }

    componentWillUnmount() {
        Object.entries(this.mediaQueries).forEach(([key, mediaQuery]) =>
            mediaQuery.removeEventListener('change', this.handleMediaEvent)
        );
    }

    handleMediaEvent = (event: MediaQueryListEvent) => {
        console.log('handleMediaEvent', { event });
        this.setState({
            ...resetScreen,
            ...this.calculateScreen(),
        });
    };

    calculateScreen = () => {
        if (this.mediaQueries.onDesktop.matches) {
            return { onDesktop: true };
        }

        if (this.mediaQueries.onTablet.matches) {
            return { onTablet: true };
        }

        return { onSmallScreen: true };
    };

    render() {
        return (
            <BreakpointContext.Provider value={{ screenSize: { ...this.state } }}>
                {this.props.children}
            </BreakpointContext.Provider>
        );
    }
}

import * as React from 'react';
import { FeatureFlag, FeatureFlagProvider, FeatureFlagsContext } from './FeatureFlags';

export const FeatureFlagDecorator = (flags: FeatureFlag[]) => (
    storyFn: () => React.ReactNode
) => {
    return (
        <FeatureFlagsContext.Provider value={new FeatureFlagProvider(flags)}>
            {storyFn()}
        </FeatureFlagsContext.Provider>
    );
};

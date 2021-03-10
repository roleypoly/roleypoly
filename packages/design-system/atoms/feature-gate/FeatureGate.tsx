import * as React from 'react';
import {
    FeatureFlag,
    FeatureFlagsContext,
} from '../../../../src/common/utils/featureFlags/react';

export type FeatureGateProps = {
    featureFlag: FeatureFlag;
    children: () => React.ReactNode;
};

export const FeatureGate = (props: FeatureGateProps) => {
    const featureContext = React.useContext(FeatureFlagsContext);

    if (featureContext.has(props.featureFlag)) {
        return props.children();
    } else {
        return <></>;
    }
};

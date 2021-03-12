import { FeatureFlagDecorator } from '@roleypoly/misc-utils/featureFlags/react/storyDecorator';
import * as React from 'react';
import { FeatureGate } from './FeatureGate';

export default {
    title: 'Atoms/Feature Gate',
    decorators: [FeatureFlagDecorator(['AllowListBlockList'])],
};

export const ActiveGate = () => (
    <FeatureGate featureFlag="AllowListBlockList">{() => <div>hello!</div>}</FeatureGate>
);

export const InactiveGate = () => (
    <FeatureGate featureFlag="aaa">{() => <div>hello!</div>}</FeatureGate>
);

import * as React from 'react';

export enum FeatureFlag {
  AllowListsBlockLists = 'AllowListsBlockLists',
}

export class FeatureFlagProvider {
  activeFlags: FeatureFlag[] = [];

  constructor(flags: FeatureFlag[] = []) {
    this.activeFlags = flags;
  }

  has(flag: FeatureFlag) {
    return this.activeFlags.includes(flag);
  }
}

export const FeatureFlagsContext = React.createContext(new FeatureFlagProvider());

import { Features } from '@roleypoly/types';

export const hasFeature = (feature: Features, features: number): boolean => {
  return (features & feature) === feature;
};

import * as React from 'react';
import { DotOverlay } from './DotOverlay';

export default {
  title: 'Atoms/Dot Overlay',
};

export const Dark = () => <DotOverlay />;
export const Light = () => <DotOverlay light />;
export const Skeleton = () => <DotOverlay skeleton />;

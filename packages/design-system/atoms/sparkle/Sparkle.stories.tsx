import { Button } from '@roleypoly/design-system/atoms/button';
import { Hero } from '@roleypoly/design-system/atoms/hero';
import * as React from 'react';
import { SparkleOverlay } from './Sparkle';

export default {
  title: 'Atoms/Sparkle',
  component: SparkleOverlay,
  args: {
    size: -10,
    opacity: 1,
    repeatCount: 3,
  },
};

export const ExampleButton = (args) => (
  <Hero>
    <SparkleOverlay {...args}>
      <Button>Yo check this!</Button>
    </SparkleOverlay>
  </Hero>
);

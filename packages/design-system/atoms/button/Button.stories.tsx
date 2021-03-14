import * as React from 'react';
import { Button as ButtonComponent } from './Button';

export default {
  title: 'Atoms/Button',
  component: ButtonComponent,
  argTypes: {
    content: { control: 'text' },
  },
  args: {
    content: 'Press me!',
    size: 'large',
  },
};

export const Large = ({ content, ...args }) => (
  <ButtonComponent {...args}>{content}</ButtonComponent>
);

export const Small = ({ content, ...args }) => (
  <ButtonComponent {...args}>{content}</ButtonComponent>
);
Small.args = {
  size: 'small',
};

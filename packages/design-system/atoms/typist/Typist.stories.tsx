import * as React from 'react';
import { Typist } from './Typist';

export default {
  title: 'Atoms/Typist',
  component: Typist,
  args: {
    charTimeout: 75,
    resetTimeout: 2000,
    lines: ['hello world', 'and again', 'a third', 'story time!'],
  },
};

export const Looping = (args) => {
  return <Typist {...args} />;
};

import * as React from 'react';
import { LinedSpace, Space } from './Space';

export default {
  title: 'Atoms/Space',
};

export const space = () => (
  <>
    hello world
    <Space />
    but im over here
  </>
);

export const linedSpace = () => (
  <>
    hello world
    <LinedSpace />
    but im over here
  </>
);

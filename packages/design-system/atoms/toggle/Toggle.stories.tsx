import * as React from 'react';
import { Toggle } from './Toggle';
export default {
  title: 'Atoms/Toggle',
  component: Toggle,
};

export const toggle = (args) => <Toggle {...args}>Turn a cool thing on</Toggle>;
export const interactive = (args) => {
  const [state, setState] = React.useState(true);
  return (
    <Toggle
      {...args}
      state={state}
      onChange={(val) => {
        setState(val);
        args.onChange(val);
      }}
    >
      Turn a cool thing on
    </Toggle>
  );
};

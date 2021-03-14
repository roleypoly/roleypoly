import * as React from 'react';
import { HorizontalSwitch } from './HorizontalSwitch';

export default {
  title: 'Atoms/Horizontal Switch',
  component: HorizontalSwitch,
  args: {
    items: ['true', 'false'],
    value: 'true',
  },
};

const Story = (args) => {
  const [value, setValue] = React.useState(args.value);

  return (
    <HorizontalSwitch
      {...args}
      value={value}
      onChange={(a) => {
        setValue(a);
        args.onChange(a);
      }}
    />
  );
};

export const Switch = Story.bind({});
export const SwitchThree = Story.bind({});
SwitchThree.args = {
  items: ['aaa', 'bbb', 'ccc'],
  value: 'aaa',
};

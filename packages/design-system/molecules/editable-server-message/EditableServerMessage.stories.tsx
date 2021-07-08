import * as React from 'react';
import { mastheadSlugs } from '../../fixtures/storyData';
import { EditableServerMessage } from './EditableServerMessage';
export default {
  title: 'Molecules/Editable Server Message',
  component: EditableServerMessage,
  args: {
    value: 'Hello World',
    guild: mastheadSlugs[1],
  },
};

export const editableServerMessage = (args) => {
  const [value, setValue] = React.useState(args.value);
  React.useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  return (
    <EditableServerMessage
      {...args}
      value={value}
      onChange={(message) => setValue(message)}
    />
  );
};

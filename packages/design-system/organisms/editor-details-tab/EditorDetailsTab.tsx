import { MultilineTextInput } from '@roleypoly/design-system/atoms/text-input';
import { EditorShellProps } from '@roleypoly/design-system/organisms/editor-shell';
import * as React from 'react';

export const EditorDetailsTab = (props: EditorShellProps) => {
  const [serverMessage, updateServerMessage] = React.useState(props.guild.data.message);
  return (
    <div>
      Server Message
      <MultilineTextInput
        value={serverMessage}
        onChange={(eventData) => updateServerMessage(eventData.target.value)}
      />
    </div>
  );
};

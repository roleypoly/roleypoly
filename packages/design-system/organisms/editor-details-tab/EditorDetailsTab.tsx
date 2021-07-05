import { Space } from '@roleypoly/design-system/atoms/space';
import { TabDepth } from '@roleypoly/design-system/atoms/tab-view/TabView.styled';
import { MultilineTextInput } from '@roleypoly/design-system/atoms/text-input';
import { Text } from '@roleypoly/design-system/atoms/typography';
import { EditorShellProps } from '@roleypoly/design-system/organisms/editor-shell';
import * as React from 'react';

export const EditorDetailsTab = (props: EditorShellProps) => {
  return (
    <TabDepth>
      <Space />
      <Text>Server Message</Text>
      <MultilineTextInput
        value={props.guild.data.message}
        onChange={(eventData) => props.onMessageChange?.(eventData.target.value)}
      />
      <Space />
    </TabDepth>
  );
};

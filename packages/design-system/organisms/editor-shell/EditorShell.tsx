import { Space } from '@roleypoly/design-system/atoms/space';
import { Tab, TabView } from '@roleypoly/design-system/atoms/tab-view';
import { EditorMasthead } from '@roleypoly/design-system/molecules/editor-masthead';
import { EditorCategoriesTab } from '@roleypoly/design-system/organisms/editor-categories-tab';
import { EditorDetailsTab } from '@roleypoly/design-system/organisms/editor-details-tab';
import { Category, PresentableGuild } from '@roleypoly/types';
import deepEqual from 'deep-equal';
import React from 'react';

export type EditorShellProps = {
  guild: PresentableGuild;
  onGuildChange?: (guild: PresentableGuild) => void;
  onCategoryChange?: (category: Category) => void;
  onMessageChange?: (message: PresentableGuild['data']['message']) => void;
};

export const EditorShell = (props: EditorShellProps) => {
  const [guild, setGuild] = React.useState<PresentableGuild>(props.guild);

  const reset = () => {
    setGuild(props.guild);
  };

  const onCategoryChange = (category: Category) => {
    setGuild((currentGuild) => {
      const categories = [
        ...currentGuild.data.categories.filter((x) => x.id !== category.id),
        category,
      ];
      return { ...currentGuild, data: { ...currentGuild.data, categories } };
    });
  };

  const onMessageChange = (message: PresentableGuild['data']['message']) => {
    setGuild((currentGuild) => {
      return { ...currentGuild, data: { ...guild.data, message } };
    });
  };

  const hasChanges = React.useMemo(() => !deepEqual(guild.data, props.guild.data), [
    guild.data,
    props.guild.data,
  ]);

  return (
    <div>
      <Space />
      <TabView initialTab={0} masthead={<EditorMasthead guild={guild} />}>
        <Tab title="Guild Details">
          {() => (
            <EditorDetailsTab
              {...props}
              guild={guild}
              onMessageChange={onMessageChange}
            />
          )}
        </Tab>
        <Tab title="Categories & Roles">
          {() => (
            <EditorCategoriesTab
              {...props}
              guild={guild}
              onCategoryChange={onCategoryChange}
            />
          )}
        </Tab>
        <Tab title="Utilities">{() => <div>hi2!</div>}</Tab>
      </TabView>
    </div>
  );
};

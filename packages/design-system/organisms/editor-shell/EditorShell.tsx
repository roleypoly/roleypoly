import { Tab, TabView } from '@roleypoly/design-system/atoms/tab-view';
import { EditorCategoriesTab } from '@roleypoly/design-system/organisms/editor-categories-tab';
import { PresentableGuild } from '@roleypoly/types';

export type EditorShellProps = {
  guild: PresentableGuild;
};

export const EditorShell = (props: EditorShellProps) => (
  <TabView initialTab={0}>
    <Tab title="Guild Details">{() => <div>hi2!</div>}</Tab>
    <Tab title="Categories & Roles">{() => <EditorCategoriesTab {...props} />}</Tab>
    <Tab title="Utilities">{() => <div>hi2!</div>}</Tab>
  </TabView>
);

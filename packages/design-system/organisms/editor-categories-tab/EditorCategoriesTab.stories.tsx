import { guildEnum } from '@roleypoly/design-system/fixtures/storyData';
import { EditorCategoriesTab } from './EditorCategoriesTab';

export default {
  title: 'Organisms/Editor/Categories Tab',
  component: EditorCategoriesTab,
  args: {
    guild: guildEnum.guilds[0],
  },
};

export const categoriesTab = (args) => <EditorCategoriesTab {...args} />;

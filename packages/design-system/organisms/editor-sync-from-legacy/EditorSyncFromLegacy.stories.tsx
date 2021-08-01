import { presentableGuild, roleypolyGuild } from '../../fixtures/storyData';
import { EditorSyncFromLegacy } from './EditorSyncFromLegacy';

export default {
  title: 'Organisms/Editor/Sync From Legacy',
  component: EditorSyncFromLegacy,
  args: {
    guild: presentableGuild,
    guildSlug: roleypolyGuild,
  },
};

export const syncFromLegacy = (args) => <EditorSyncFromLegacy {...args} />;

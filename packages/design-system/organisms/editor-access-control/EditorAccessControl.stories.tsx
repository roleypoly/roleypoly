import { presentableGuild, roleypolyGuild } from '../../fixtures/storyData';
import { EditorAccessControl } from './EditorAccessControl';

export default {
  title: 'Organisms/Editor/Access Control',
  component: EditorAccessControl,
  args: {
    guild: presentableGuild,
    guildSlug: roleypolyGuild,
  },
};

export const accessControl = (args) => <EditorAccessControl {...args} />;

import ReactTooltip from 'react-tooltip';
import { BreakpointsProvider } from '../../atoms/breakpoints';
import { guildEnum, mastheadSlugs, roleypolyGuild, user } from '../../fixtures/storyData';
import { EditorAccessControlTemplate } from './EditorAccessControl';

export default {
  title: 'Templates/Editor Access Control',
  component: EditorAccessControlTemplate,
  decorators: [
    (story) => (
      <BreakpointsProvider>
        {story()}
        <ReactTooltip />
      </BreakpointsProvider>
    ),
  ],
  args: {
    errors: { validationStatus: 0 },
    guilds: mastheadSlugs,
    user: user,
    guild: guildEnum.guilds[1],
    guildSlug: roleypolyGuild,
  },
};

export const editorAccessControl = (args) => <EditorAccessControlTemplate {...args} />;

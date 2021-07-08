import ReactTooltip from 'react-tooltip';
import { BreakpointsProvider } from '../../atoms/breakpoints';
import { guildEnum, mastheadSlugs, user } from '../../fixtures/storyData';
import { EditorTemplate } from './Editor';
export default {
  title: 'Templates/Server Editor',
  component: EditorTemplate,
  decorators: [
    (story) => (
      <BreakpointsProvider>
        {story()}
        <ReactTooltip />
      </BreakpointsProvider>
    ),
  ],
  args: {
    guilds: mastheadSlugs,
    user: user,
    guild: guildEnum.guilds[0],
  },
};

export const serverEditor = (args) => <EditorTemplate {...args} />;

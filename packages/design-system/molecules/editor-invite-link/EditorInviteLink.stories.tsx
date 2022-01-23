import { mastheadSlugs } from '../../fixtures/storyData';
import { EditorInviteLink } from './EditorInviteLink';

export default {
  title: 'Molecules/Editor Invite Link',
  component: EditorInviteLink,
  args: {
    guild: mastheadSlugs[0],
  },
};

export const editorInviteLink = (args) => <EditorInviteLink {...args} />;

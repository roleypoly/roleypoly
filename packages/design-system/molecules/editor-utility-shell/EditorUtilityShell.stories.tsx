import { mastheadSlugs } from '@roleypoly/design-system/fixtures/storyData';
import { GoGear } from 'react-icons/go';
import { EditorUtilityShell } from './EditorUtilityShell';

export default {
  title: 'Molecules/Editor Utility Shell',
  component: EditorUtilityShell,
  args: {
    title: 'Utility Title',
    guild: mastheadSlugs[0],
    icon: <GoGear />,
  },
};

export const editorUtilityShell = (args) => (
  <EditorUtilityShell {...args}>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, odit inventore?
      Recusandae dolor minima quos, laboriosam alias iusto officiis culpa! Autem, odit ut.
      Fugit quaerat esse explicabo quibusdam, ipsum maiores?
    </p>
  </EditorUtilityShell>
);

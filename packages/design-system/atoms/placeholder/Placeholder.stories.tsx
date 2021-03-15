import { palette } from '../colors';
import { PlaceholderBox } from './Placeholder';

export default {
  title: 'Atoms/Placeholder',
  component: PlaceholderBox,
  args: {
    firstColor: palette.taupe100,
    secondColor: palette.taupe300,
  },
};

export const placeholderBox = (args) => <PlaceholderBox {...args} />;

import { CopyArea } from './CopyArea';

export default {
  title: 'Atoms/Copy Area',
  component: CopyArea,
  args: {
    value: 'Hello world',
  },
};

export const copyArea = (args) => <CopyArea {...args} />;

import { Hero } from '@roleypoly/design-system/atoms/hero';
import { LoadingFill } from './Loading';
export default {
  title: 'Atoms/Loading Text',
  component: LoadingFill,
};

export const loading = (args) => (
  <Hero>
    <LoadingFill {...args} />
  </Hero>
);

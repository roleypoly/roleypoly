import { Hero } from '@roleypoly/design-system/atoms/hero';
import { Spinner } from './Spinner';

export default {
  title: 'Atoms/Spinner',
  component: Spinner,
};

export const spinner = (args) => (
  <Hero>
    <Spinner {...args} />
  </Hero>
);

import { mdxComponents } from '../atoms/typography/mdx';
import { roleypolyTheme } from './theme';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  docs: {
    theme: roleypolyTheme,
    components: mdxComponents,
  },
};

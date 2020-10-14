import { roleypolyTheme } from './theme';
import { mdxComponents } from '../src/design-system/atoms/typography/mdx';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
        theme: roleypolyTheme,
        components: mdxComponents,
    },
};

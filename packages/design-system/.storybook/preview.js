import { roleypolyTheme } from './theme';
import { mdxComponents } from '../atoms/typography/mdx';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    docs: {
        theme: roleypolyTheme,
        components: mdxComponents,
    },
};

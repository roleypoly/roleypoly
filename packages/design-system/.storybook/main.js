module.exports = {
  stories: [
    ...['atoms', 'molecules', 'organisms', 'templates'].map(
      (dir) => `../${dir}/**/*.stories.@(tsx|mdx)`
    ),
    '*.stories.mdx',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  reactOptions: {
    fastRefresh: true,
  },
};

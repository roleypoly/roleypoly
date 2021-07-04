module.exports = {
  stories: [
    '../*.stories.mdx',
    ...['atoms', 'molecules', 'organisms', 'templates'].map(
      (dir) => `../${dir}/**/*.stories.@(tsx|mdx)`
    ),
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  reactOptions: {
    fastRefresh: true,
  },
};

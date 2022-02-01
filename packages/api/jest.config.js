module.exports = {
  preset: 'ts-jest/presets/default-esm',
  name: 'api',
  testEnvironment: 'miniflare',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json',
      useESM: true,
    },
  },
};

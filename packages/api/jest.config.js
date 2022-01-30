module.exports = {
  preset: 'ts-jest/presets/default-esm',
  name: 'api',
  testEnvironment: 'miniflare',
  testEnvironmentOptions: {
    envPath: '../../.env',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json',
      useESM: true,
    },
  },
};

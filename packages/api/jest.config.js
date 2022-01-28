module.exports = {
  preset: 'ts-jest/presets/default-esm',
  name: 'api',
  rootDir: '../../',
  testEnvironment: 'miniflare',
  testEnvironmentOptions: {
    wranglerConfigPath: 'packages/api/wrangler.toml',
    envPath: '.env',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/packages/api/tsconfig.test.json',
      useESM: true,
    },
  },
};

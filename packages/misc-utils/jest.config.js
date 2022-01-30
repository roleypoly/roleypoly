module.exports = {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['../../hack/jestSetup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '../../tsconfig.test.json',
    },
  },
};

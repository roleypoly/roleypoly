module.exports = {
  name: 'design-system',
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  reporters: ['default'],
  setupFilesAfterEnv: ['jest-styled-components', '../../hack/jestSetup.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  globals: {
    'ts-jest': {
      tsconfig: '../../tsconfig.test.json',
    },
  },
};

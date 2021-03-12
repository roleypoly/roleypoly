module.exports = {
    preset: 'ts-jest/presets/js-with-babel',
    testEnvironment: 'enzyme',
    reporters: ['default'],
    setupFilesAfterEnv: ['jest-enzyme', 'jest-styled-components', './hack/jestSetup.ts'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.test.json',
        },
    },
};

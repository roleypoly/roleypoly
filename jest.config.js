const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'enzyme',
    reporters: ['default', './jest-reporter'],
    setupFilesAfterEnv: ['jest-enzyme', 'jest-styled-components'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
    }),
    snapshotSerializers: ['enzyme-to-json/serializer'],
};

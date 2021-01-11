const { pathsToModuleNameMapper } = require('ts-jest/utils')

const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: [
    "**/*.spec.ts",
  ]
};

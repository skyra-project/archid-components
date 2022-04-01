/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
	displayName: 'unit test',
	preset: 'ts-jest',
	testEnvironment: 'node',
	testRunner: 'jest-circus/runner',
	testMatch: ['<rootDir>/packages/**/tests/**/*.test.ts', '<rootDir>/packages/**/tests/*.test.js'],
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.base.json'
		}
	}
};

export default config;

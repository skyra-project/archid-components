/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
	displayName: 'unit test',
	preset: 'ts-jest',
	testMatch: ['<rootDir>/packages/**/tests/**/*.test.ts', '<rootDir>/packages/**/tests/*.test.js'],
	collectCoverageFrom: ['<rootDir>/packages/http-framework/src/**/*.ts', '<rootDir>/packages/start-banner/src/**/*.ts'],
	setupFilesAfterEnv: ['jest-extended/all'],
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.dev.json'
		}
	},
	reporters: ['default', 'github-actions']
};

export default config;

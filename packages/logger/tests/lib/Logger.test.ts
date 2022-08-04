import { blue, gray, magenta, red, redBright, yellow } from 'colorette';
import { Logger } from '../../src';

describe('Logger', () => {
	describe('constructor', () => {
		test('GIVEN no options THEN assigns correct defaults', () => {
			const logger = new Logger();

			expect(logger.depth).toBe(0);
			expect(logger.level).toBe(Logger.Level.Info);
			expect(logger.levels).toEqual({
				[Logger.Level.Trace]: { color: gray, method: 'trace', name: 'TRACE' },
				[Logger.Level.Debug]: { color: magenta, method: 'debug', name: 'DEBUG' },
				[Logger.Level.Info]: { color: blue, method: 'info', name: 'INFO' },
				[Logger.Level.Warn]: { color: yellow, method: 'warn', name: 'WARN' },
				[Logger.Level.Error]: { color: red, method: 'error', name: 'ERROR' },
				[Logger.Level.Fatal]: { color: redBright, method: 'error', name: 'FATAL' }
			});
		});

		test('GIVEN empty object THEN assigns correct defaults', () => {
			expect(new Logger({})).toEqual(new Logger());
		});
	});

	describe('enabled', () => {
		test('GIVEN level trace THEN all levels return true', () => {
			const logger = new Logger({ level: Logger.Level.Trace });

			expect(logger.enabled(Logger.Level.Trace)).toBe(true);
			expect(logger.enabled(Logger.Level.Debug)).toBe(true);
			expect(logger.enabled(Logger.Level.Info)).toBe(true);
			expect(logger.enabled(Logger.Level.Warn)).toBe(true);
			expect(logger.enabled(Logger.Level.Error)).toBe(true);
			expect(logger.enabled(Logger.Level.Fatal)).toBe(true);
		});

		test('GIVEN level debug THEN trace level returns false', () => {
			const logger = new Logger({ level: Logger.Level.Debug });

			expect(logger.enabled(Logger.Level.Trace)).toBe(false);
			expect(logger.enabled(Logger.Level.Debug)).toBe(true);
			expect(logger.enabled(Logger.Level.Info)).toBe(true);
			expect(logger.enabled(Logger.Level.Warn)).toBe(true);
			expect(logger.enabled(Logger.Level.Error)).toBe(true);
			expect(logger.enabled(Logger.Level.Fatal)).toBe(true);
		});

		test('GIVEN level info THEN trace and debug levels return false', () => {
			const logger = new Logger({ level: Logger.Level.Info });

			expect(logger.enabled(Logger.Level.Trace)).toBe(false);
			expect(logger.enabled(Logger.Level.Debug)).toBe(false);
			expect(logger.enabled(Logger.Level.Info)).toBe(true);
			expect(logger.enabled(Logger.Level.Warn)).toBe(true);
			expect(logger.enabled(Logger.Level.Error)).toBe(true);
			expect(logger.enabled(Logger.Level.Fatal)).toBe(true);
		});

		test('GIVEN level warn THEN trace, debug, and info levels return false', () => {
			const logger = new Logger({ level: Logger.Level.Warn });

			expect(logger.enabled(Logger.Level.Trace)).toBe(false);
			expect(logger.enabled(Logger.Level.Debug)).toBe(false);
			expect(logger.enabled(Logger.Level.Info)).toBe(false);
			expect(logger.enabled(Logger.Level.Warn)).toBe(true);
			expect(logger.enabled(Logger.Level.Error)).toBe(true);
			expect(logger.enabled(Logger.Level.Fatal)).toBe(true);
		});

		test('GIVEN level error THEN only error and fatal return true', () => {
			const logger = new Logger({ level: Logger.Level.Error });

			expect(logger.enabled(Logger.Level.Trace)).toBe(false);
			expect(logger.enabled(Logger.Level.Debug)).toBe(false);
			expect(logger.enabled(Logger.Level.Info)).toBe(false);
			expect(logger.enabled(Logger.Level.Warn)).toBe(false);
			expect(logger.enabled(Logger.Level.Error)).toBe(true);
			expect(logger.enabled(Logger.Level.Fatal)).toBe(true);
		});

		test('GIVEN level fatal THEN only fatal returns true', () => {
			const logger = new Logger({ level: Logger.Level.Fatal });

			expect(logger.enabled(Logger.Level.Trace)).toBe(false);
			expect(logger.enabled(Logger.Level.Debug)).toBe(false);
			expect(logger.enabled(Logger.Level.Info)).toBe(false);
			expect(logger.enabled(Logger.Level.Warn)).toBe(false);
			expect(logger.enabled(Logger.Level.Error)).toBe(false);
			expect(logger.enabled(Logger.Level.Fatal)).toBe(true);
		});
	});

	describe('disabled', () => {
		test('GIVEN level trace THEN all levels return false', () => {
			const logger = new Logger({ level: Logger.Level.Trace });

			expect(logger.disabled(Logger.Level.Trace)).toBe(false);
			expect(logger.disabled(Logger.Level.Debug)).toBe(false);
			expect(logger.disabled(Logger.Level.Info)).toBe(false);
			expect(logger.disabled(Logger.Level.Warn)).toBe(false);
			expect(logger.disabled(Logger.Level.Error)).toBe(false);
			expect(logger.disabled(Logger.Level.Fatal)).toBe(false);
		});

		test('GIVEN level debug THEN trace level returns true', () => {
			const logger = new Logger({ level: Logger.Level.Debug });

			expect(logger.disabled(Logger.Level.Trace)).toBe(true);
			expect(logger.disabled(Logger.Level.Debug)).toBe(false);
			expect(logger.disabled(Logger.Level.Info)).toBe(false);
			expect(logger.disabled(Logger.Level.Warn)).toBe(false);
			expect(logger.disabled(Logger.Level.Error)).toBe(false);
			expect(logger.disabled(Logger.Level.Fatal)).toBe(false);
		});

		test('GIVEN level info THEN trace and debug levels return true', () => {
			const logger = new Logger({ level: Logger.Level.Info });

			expect(logger.disabled(Logger.Level.Trace)).toBe(true);
			expect(logger.disabled(Logger.Level.Debug)).toBe(true);
			expect(logger.disabled(Logger.Level.Info)).toBe(false);
			expect(logger.disabled(Logger.Level.Warn)).toBe(false);
			expect(logger.disabled(Logger.Level.Error)).toBe(false);
			expect(logger.disabled(Logger.Level.Fatal)).toBe(false);
		});

		test('GIVEN level warn THEN trace, debug, and info levels return true', () => {
			const logger = new Logger({ level: Logger.Level.Warn });

			expect(logger.disabled(Logger.Level.Trace)).toBe(true);
			expect(logger.disabled(Logger.Level.Debug)).toBe(true);
			expect(logger.disabled(Logger.Level.Info)).toBe(true);
			expect(logger.disabled(Logger.Level.Warn)).toBe(false);
			expect(logger.disabled(Logger.Level.Error)).toBe(false);
			expect(logger.disabled(Logger.Level.Fatal)).toBe(false);
		});

		test('GIVEN level error THEN only error and fatal return false', () => {
			const logger = new Logger({ level: Logger.Level.Error });

			expect(logger.disabled(Logger.Level.Trace)).toBe(true);
			expect(logger.disabled(Logger.Level.Debug)).toBe(true);
			expect(logger.disabled(Logger.Level.Info)).toBe(true);
			expect(logger.disabled(Logger.Level.Warn)).toBe(true);
			expect(logger.disabled(Logger.Level.Error)).toBe(false);
			expect(logger.disabled(Logger.Level.Fatal)).toBe(false);
		});

		test('GIVEN level fatal THEN only fatal returns false', () => {
			const logger = new Logger({ level: Logger.Level.Fatal });

			expect(logger.disabled(Logger.Level.Trace)).toBe(true);
			expect(logger.disabled(Logger.Level.Debug)).toBe(true);
			expect(logger.disabled(Logger.Level.Info)).toBe(true);
			expect(logger.disabled(Logger.Level.Warn)).toBe(true);
			expect(logger.disabled(Logger.Level.Error)).toBe(true);
			expect(logger.disabled(Logger.Level.Fatal)).toBe(false);
		});
	});
});

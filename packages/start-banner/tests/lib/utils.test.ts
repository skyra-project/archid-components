import { escapedLength, generateFrameData, generateLineData } from '../../src/index.js';

describe('escapedLength', () => {
	test('GIVEN string without ansi codes THEN returns the same length', () => {
		expect(escapedLength('foo bar')).toBe(7);
	});

	test('GIVEN string with ansi codes THEN returns the correct escaped length', () => {
		expect(escapedLength('\u001B[0;33;49;3;9;4mbar\u001B[0m')).toBe(3);
	});
});

describe('generateLineData', () => {
	test('GIVEN an array THEN returns the correct data', () => {
		expect(generateLineData(['foo bar', '\u001B[0;33;49;3;9;4mbar\u001B[0m'])).toStrictEqual([
			{ line: 'foo bar', length: 7 },
			{ line: '\u001B[0;33;49;3;9;4mbar\u001B[0m', length: 3 }
		]);
	});
});

describe('generateFrameData', () => {
	test('GIVEN undefined THEN returns empty data', () => {
		expect(generateFrameData()).toStrictEqual({ length: 0, lines: [] });
	});

	test('GIVEN an empty array THEN returns empty data', () => {
		expect(generateFrameData([])).toStrictEqual({ length: 0, lines: [] });
	});

	test('GIVEN a non-empty array THEN returns frame data', () => {
		expect(generateFrameData(['foo bar', '\u001B[0;33;49;3;9;4mbar\u001B[0m'])).toStrictEqual({
			length: 7,
			lines: ['foo bar', '\u001B[0;33;49;3;9;4mbar\u001B[0m    ']
		});
	});
});

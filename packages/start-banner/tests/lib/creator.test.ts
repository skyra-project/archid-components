import { createBanner } from '../../src';

describe('createBanner', () => {
	test('GIVEN no options THEN throws an Error', () => {
		expect(() => createBanner({})).toThrow('Expected any of the options to be passed');
	});

	describe('no logo', () => {
		test('GIVEN name THEN returns name', () => {
			expect(createBanner({ name: ['Hello', 'World'] })).toBe('Hello\nWorld');
		});

		test('GIVEN extra THEN returns extra', () => {
			expect(createBanner({ extra: ['Hello', 'World'] })).toBe('Hello\nWorld');
		});

		test('GIVEN name and extra THEN returns name and extra', () => {
			expect(createBanner({ name: ['Hello', 'World'], extra: ['Foo', 'Bar'] })).toBe('Hello\nWorld\nFoo\nBar');
		});
	});

	describe('logo', () => {
		test('GIVEN no details THEN returns logo as-is', () => {
			expect(createBanner({ logo: ['Hello', 'Foo'] })).toBe('Hello\nFoo');
		});

		test('GIVEN name THEN returns padded logo with name', () => {
			expect(createBanner({ logo: ['Hello', 'Foo'], name: ['Skyra'] })).toBe('Hello Skyra\nFoo');
		});

		test('GIVEN extra THEN returns padded logo with extra', () => {
			expect(createBanner({ logo: ['Hello', 'Foo'], extra: ['Skyra'] })).toBe('Hello Skyra\nFoo');
		});

		test('GIVEN name and extra THEN returns padded logo with details', () => {
			expect(createBanner({ logo: ['Hello', 'Foo'], name: ['Skyra'], extra: ['Moderation: ON'] })).toBe('Hello Skyra\nFoo   Moderation: ON');
		});

		test('GIVEN name and extra with overflow THEN returns padded logo with padded details', () => {
			expect(createBanner({ logo: ['Hello', 'Foo'], name: ['Skyra'], extra: ['Moderation: ON', 'Analytics : ON'] })).toBe(
				'Hello Skyra\nFoo   Moderation: ON\n      Analytics : ON'
			);
		});
	});
});

import {
	ApplicationCommandOptionType,
	type APIApplicationCommandInteractionDataBasicOption,
	type APIApplicationCommandInteractionDataSubcommandGroupOption,
	type APIApplicationCommandInteractionDataSubcommandOption
} from 'discord-api-types/v10';
import { extractTopLevelOptions, transformAutocompleteInteraction, transformInteraction } from '../../src';

describe('InteractionOptions', () => {
	describe('transformInteraction', () => {
		test('GIVEN top-level options THEN returns all data correctly', () => {
			const options: APIApplicationCommandInteractionDataBasicOption[] = [
				{ type: ApplicationCommandOptionType.String, name: 'name', value: 'Hello World' },
				{ type: ApplicationCommandOptionType.Integer, name: 'times', value: 5 }
			];
			const given = transformInteraction({}, options);

			expect(given).toStrictEqual({
				subCommandGroup: null,
				subCommand: null,
				name: 'Hello World',
				times: 5
			});
		});

		test('GIVEN subcommand options THEN returns all data correctly', () => {
			const options: APIApplicationCommandInteractionDataBasicOption[] = [
				{ type: ApplicationCommandOptionType.String, name: 'name', value: 'Hello World' },
				{ type: ApplicationCommandOptionType.Integer, name: 'times', value: 5 }
			];
			const subCommand: APIApplicationCommandInteractionDataSubcommandOption = {
				type: ApplicationCommandOptionType.Subcommand,
				name: 'repeat',
				options
			};
			const given = transformInteraction({}, [subCommand]);

			expect(given).toStrictEqual({
				subCommandGroup: null,
				subCommand: 'repeat',
				name: 'Hello World',
				times: 5
			});
		});

		test('GIVEN subcommand group options THEN returns all data correctly', () => {
			const options: APIApplicationCommandInteractionDataBasicOption[] = [
				{ type: ApplicationCommandOptionType.String, name: 'name', value: 'Hello World' },
				{ type: ApplicationCommandOptionType.Integer, name: 'times', value: 5 }
			];
			const subCommand: APIApplicationCommandInteractionDataSubcommandOption = {
				type: ApplicationCommandOptionType.Subcommand,
				name: 'repeat',
				options
			};
			const subCommandGroup: APIApplicationCommandInteractionDataSubcommandGroupOption = {
				type: ApplicationCommandOptionType.SubcommandGroup,
				name: 'utilities',
				options: [subCommand]
			};
			const given = transformInteraction({}, [subCommandGroup]);

			expect(given).toStrictEqual({
				subCommandGroup: 'utilities',
				subCommand: 'repeat',
				name: 'Hello World',
				times: 5
			});
		});
	});

	describe('transformAutocompleteInteraction', () => {
		test('GIVEN top-level options THEN returns all data correctly', () => {
			const options: APIApplicationCommandInteractionDataBasicOption[] = [
				{ type: ApplicationCommandOptionType.String, name: 'name', value: 'Hello World', focused: true },
				{ type: ApplicationCommandOptionType.Integer, name: 'times', value: 5 }
			];
			const given = transformAutocompleteInteraction({}, options);

			expect(given).toStrictEqual({
				subCommandGroup: null,
				subCommand: null,
				focused: 'Hello World',
				name: 'Hello World',
				times: 5
			});
		});

		test('GIVEN subcommand options THEN returns all data correctly', () => {
			const options: APIApplicationCommandInteractionDataBasicOption[] = [
				{ type: ApplicationCommandOptionType.String, name: 'name', value: 'Hello World' },
				{ type: ApplicationCommandOptionType.Integer, name: 'times', value: 5, focused: true }
			];
			const subCommand: APIApplicationCommandInteractionDataSubcommandOption = {
				type: ApplicationCommandOptionType.Subcommand,
				name: 'repeat',
				options
			};
			const given = transformAutocompleteInteraction({}, [subCommand]);

			expect(given).toStrictEqual({
				subCommandGroup: null,
				subCommand: 'repeat',
				focused: 5,
				name: 'Hello World',
				times: 5
			});
		});

		test('GIVEN subcommand group options THEN returns all data correctly', () => {
			const options: APIApplicationCommandInteractionDataBasicOption[] = [
				{ type: ApplicationCommandOptionType.String, name: 'name', value: 'Hello World' },
				{ type: ApplicationCommandOptionType.Integer, name: 'times', value: 5, focused: true }
			];
			const subCommand: APIApplicationCommandInteractionDataSubcommandOption = {
				type: ApplicationCommandOptionType.Subcommand,
				name: 'repeat',
				options
			};
			const subCommandGroup: APIApplicationCommandInteractionDataSubcommandGroupOption = {
				type: ApplicationCommandOptionType.SubcommandGroup,
				name: 'utilities',
				options: [subCommand]
			};
			const given = transformAutocompleteInteraction({}, [subCommandGroup]);

			expect(given).toStrictEqual({
				subCommandGroup: 'utilities',
				subCommand: 'repeat',
				focused: 5,
				name: 'Hello World',
				times: 5
			});
		});
	});

	describe('extractTopLevelOptions', () => {
		test('GIVEN top-level options THEN returns SCG and SC null', () => {
			const options: APIApplicationCommandInteractionDataBasicOption[] = [
				{ type: ApplicationCommandOptionType.String, name: 'name', value: 'Hello World' },
				{ type: ApplicationCommandOptionType.Integer, name: 'times', value: 5 }
			];
			const given = extractTopLevelOptions(options);

			expect(given).toStrictEqual({
				subCommandGroup: null,
				subCommand: null,
				options
			});
		});

		test('GIVEN subcommand options THEN returns SCG null', () => {
			const options: APIApplicationCommandInteractionDataBasicOption[] = [
				{ type: ApplicationCommandOptionType.String, name: 'name', value: 'Hello World' },
				{ type: ApplicationCommandOptionType.Integer, name: 'times', value: 5 }
			];
			const subCommand: APIApplicationCommandInteractionDataSubcommandOption = {
				type: ApplicationCommandOptionType.Subcommand,
				name: 'repeat',
				options
			};
			const given = extractTopLevelOptions([subCommand]);

			expect(given).toStrictEqual({
				subCommandGroup: null,
				subCommand,
				options
			});
		});

		test('GIVEN subcommand group options THEN returns all data', () => {
			const options: APIApplicationCommandInteractionDataBasicOption[] = [
				{ type: ApplicationCommandOptionType.String, name: 'name', value: 'Hello World' },
				{ type: ApplicationCommandOptionType.Integer, name: 'times', value: 5 }
			];
			const subCommand: APIApplicationCommandInteractionDataSubcommandOption = {
				type: ApplicationCommandOptionType.Subcommand,
				name: 'repeat',
				options
			};
			const subCommandGroup: APIApplicationCommandInteractionDataSubcommandGroupOption = {
				type: ApplicationCommandOptionType.SubcommandGroup,
				name: 'utilities',
				options: [subCommand]
			};
			const given = extractTopLevelOptions([subCommandGroup]);

			expect(given).toStrictEqual({
				subCommandGroup,
				subCommand,
				options
			});
		});
	});
});

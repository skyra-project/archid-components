import type { APIChannel, APIInteractionGuildMember, APIUser, InteractionType, LocaleString, Permissions, Snowflake } from 'discord-api-types/v10';
import { ChatInputCommandInteraction, type BaseInteractionType, type InGuild } from '../../../../../src';
import { ChatInputApplicationCommandInteractionData, makeResponse } from '../../../../shared';

describe('BaseInteraction', () => {
	const instance = new ChatInputCommandInteraction(makeResponse(), ChatInputApplicationCommandInteractionData);

	test('GIVEN replied THEN returns the raw data', () => {
		expect<boolean>(instance.replied).toBe(false);
	});

	test('GIVEN id THEN returns the raw data', () => {
		expect<Snowflake>(instance.id).toBe(ChatInputApplicationCommandInteractionData.id);
	});

	test('GIVEN type THEN returns the raw data', () => {
		expect<InteractionType>(instance.type).toBe(ChatInputApplicationCommandInteractionData.type);
	});

	test('GIVEN app_permissions THEN returns the raw data', () => {
		expect<Permissions | undefined>(instance.app_permissions).toBe(ChatInputApplicationCommandInteractionData.app_permissions);
	});

	test('GIVEN applicationPermissions THEN returns the mapped data', () => {
		expect<bigint | undefined>(instance.applicationPermissions).toBe(8n);
	});

	test('GIVEN application_id THEN returns the raw data', () => {
		expect<Snowflake>(instance.application_id).toBe(ChatInputApplicationCommandInteractionData.application_id);
	});

	test('GIVEN applicationId THEN returns the raw data', () => {
		expect<Snowflake>(instance.applicationId).toBe(ChatInputApplicationCommandInteractionData.application_id);
	});

	test('GIVEN channel THEN returns the raw data', () => {
		type Channel = Partial<APIChannel> & Pick<APIChannel, 'id' | 'type'>;
		expect<Channel | undefined>(instance.channel).toBe(ChatInputApplicationCommandInteractionData.channel);
	});

	test('GIVEN channel_id THEN returns the raw data', () => {
		expect<Snowflake | undefined>(instance.channel_id).toBe(ChatInputApplicationCommandInteractionData.channel_id);
	});

	test('GIVEN channelId THEN returns the raw data', () => {
		expect<Snowflake | undefined>(instance.channelId).toBe(ChatInputApplicationCommandInteractionData.channel_id);
	});

	test('GIVEN data THEN returns the raw data', () => {
		expect<BaseInteractionType['data']>(instance.data).toBe(ChatInputApplicationCommandInteractionData.data);
	});

	test('GIVEN guild_id THEN returns the raw data', () => {
		expect<Snowflake | undefined>(instance.guild_id).toBe(ChatInputApplicationCommandInteractionData.guild_id);
	});

	test('GIVEN guildId THEN returns the raw data', () => {
		expect<Snowflake | undefined>(instance.guildId).toBe(ChatInputApplicationCommandInteractionData.guild_id);
	});

	test('GIVEN guild_locale THEN returns the raw data', () => {
		expect<LocaleString | undefined>(instance.guild_locale).toBe(ChatInputApplicationCommandInteractionData.guild_locale);
	});

	test('GIVEN guildLocale THEN returns the raw data', () => {
		expect<LocaleString | undefined>(instance.guildLocale).toBe(ChatInputApplicationCommandInteractionData.guild_locale);
	});

	test('GIVEN locale THEN returns the raw data', () => {
		expect<LocaleString>(instance.locale).toBe(ChatInputApplicationCommandInteractionData.locale);
	});

	test('GIVEN member THEN returns the raw data', () => {
		expect<APIInteractionGuildMember | undefined>(instance.member).toBe(ChatInputApplicationCommandInteractionData.member);
	});

	test('GIVEN token THEN returns the raw data', () => {
		expect<string>(instance.token).toBe(ChatInputApplicationCommandInteractionData.token);
	});

	test('GIVEN user THEN returns the raw data', () => {
		expect<APIUser>(instance.user).toBe(ChatInputApplicationCommandInteractionData.member!.user);
	});

	test('GIVEN version THEN returns the raw data', () => {
		expect<1>(instance.version).toBe(ChatInputApplicationCommandInteractionData.version);
	});

	test('GIVEN inGuild in a guild interaction THEN returns true', () => {
		const value = instance.inGuild();

		expect<boolean>(value).toBe(true);
		if (value) {
			expect<InGuild<typeof instance>>(instance);
			expect<Snowflake>(instance.guild_id);
			expect<Snowflake>(instance.guildId);
			expect<LocaleString>(instance.guild_locale);
			expect<LocaleString>(instance.guildLocale);
			expect<APIInteractionGuildMember>(instance.member);
		} else {
			expect<Snowflake | undefined>(instance.guild_id);
			expect<Snowflake | undefined>(instance.guildId);
			expect<LocaleString | undefined>(instance.guild_locale);
			expect<LocaleString | undefined>(instance.guildLocale);
			expect<APIInteractionGuildMember | undefined>(instance.member);
		}
	});

	describe.todo('fetchChannel');
	describe.todo('fetchGuild');
});

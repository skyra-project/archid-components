import {
	APIActionRowComponent,
	APIEmbed,
	ComponentType,
	InteractionResponseType,
	MessageFlags,
	type APIInteractionResponse,
	type APIInteractionResponseChannelMessageWithSource,
	type APIInteractionResponseUpdateMessage,
	type APISelectMenuOption,
	type Snowflake
} from 'discord-api-types/v9';

export function channelMessageWithSourceResponse({
	content,
	ephemeral = false,
	users = [],
	components = [],
	embeds = [],
	extraData
}: ResponseParameters): APIInteractionResponseChannelMessageWithSource {
	return {
		type: InteractionResponseType.ChannelMessageWithSource,
		data: {
			content,
			flags: ephemeral ? MessageFlags.Ephemeral : 0,
			allowed_mentions: { users },
			embeds,
			components,
			...extraData
		}
	};
}

export function updateMessageResponse({
	content,
	ephemeral = false,
	users = [],
	components = [],
	embeds = [],
	extraData
}: ResponseParameters): APIInteractionResponseUpdateMessage {
	return {
		type: InteractionResponseType.UpdateMessage,
		data: {
			content,
			flags: ephemeral ? MessageFlags.Ephemeral : 0,
			allowed_mentions: { users },
			embeds,
			components,
			...extraData
		}
	};
}

export function selectMenuResponse({ customId, selectMenuOptions, ...parameters }: SelectMenuParameters): APIInteractionResponse {
	return channelMessageWithSourceResponse({
		...parameters,
		ephemeral: true,
		components: [
			{
				type: ComponentType.ActionRow,
				components: [
					{
						type: ComponentType.SelectMenu,
						custom_id: customId,
						options: selectMenuOptions
					}
				]
			}
		]
	});
}

interface ResponseParameters {
	/**
	 * The message contents (up to 2000 characters)
	 */
	content?: string;
	/**
	 * Embedded `rich` content
	 *
	 * See https://discord.com/developers/docs/resources/channel#embed-object
	 */
	embeds?: APIEmbed[];
	/**
	 * The components to include with the message
	 *
	 * Requires an application-owned webhook
	 *
	 * See https://discord.com/developers/docs/interactions/message-components#component-object
	 */
	components?: APIActionRowComponent[];
	ephemeral?: boolean;
	users?: Snowflake[];
	extraData?: APIInteractionResponseChannelMessageWithSource['data'];
}

interface SelectMenuParameters extends Omit<ResponseParameters, 'ephemeral' | 'extraData'> {
	selectMenuOptions: APISelectMenuOption[];
	customId: string;
}

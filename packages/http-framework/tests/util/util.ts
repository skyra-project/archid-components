import { SlashCommandSubcommandBuilder } from '@discordjs/builders';

export function buildSubcommand(name: string, description: string) {
	return new SlashCommandSubcommandBuilder() //
		.setName(name)
		.setDescription(description);
}

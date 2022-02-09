import { bold, hyperlink } from '@discordjs/builders';
import { Command, RegisterCommand } from '@skyra/http-framework';
import { MessageFlags } from 'discord-api-types/v9';

@RegisterCommand({ name: 'support', description: 'Get an invite link to my support server.' })
export class UserCommand extends Command {
	private readonly url = bold(hyperlink('Skyra Lounge', 'https://discord.gg/6gakFR2'));

	public chatInputRun(): Command.Response {
		const content = `Ran into a problem? Need some help? Want to meet my creators? You can join ${this.url}!`;
		return this.message({ content, flags: MessageFlags.Ephemeral });
	}
}

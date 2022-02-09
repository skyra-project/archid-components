import { bold, hyperlink } from '@discordjs/builders';
import { Command, RegisterCommand } from '@skyra/http-framework';
import { MessageFlags } from 'discord-api-types/v9';

@RegisterCommand({ name: 'invite', description: 'Check how you can invite me.' })
export class UserCommand extends Command {
	private readonly urls = [
		bold(hyperlink('Patreon', 'https://donate.skyra.pw/patreon')),
		bold(hyperlink('Ko-Fi', 'https://donate.skyra.pw/kofi')),
		bold(hyperlink('Paypal', 'https://donate.skyra.pw/paypal'))
	].join(' •  ');

	public chatInputRun(): Command.Response {
		const content = `Here you have the links to help with my development!\n\n${this.urls}`;
		return this.message({ content, flags: MessageFlags.Ephemeral });
	}
}

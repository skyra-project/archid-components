import { bold, hyperlink } from '@discordjs/builders';
import { Command, RegisterCommand } from '@skyra/http-framework';
import { MessageFlags } from 'discord-api-types/v9';

@RegisterCommand({ name: 'invite', description: 'Check how you can invite me.' })
export class UserCommand extends Command {
	private readonly urls = [
		bold(hyperlink('Acrysel (Notifications)', '')),
		bold(hyperlink('Aelia (Music)', this.makeUrl('338249781594030090', '37030144'))),
		bold(hyperlink('Artiel (Fun)', '')),
		bold(hyperlink('Dragonite (Pokémon)', '')),
		bold(hyperlink('Iris (Suggestions)', '')),
		bold(hyperlink('Nayre (RPG)', '')),
		bold(hyperlink('Nekokai (Anime)', '')),
		bold(hyperlink('Skyra (Moderation)', this.makeUrl('266624760782258186', '534149196918'))),
		bold(hyperlink('Teryl (Tools)', ''))
	].join(' • ');

	public override chatInputRun(): Command.Response {
		const content = `You can invite me anytime by opening my user card. You can also invite my teammates clicking the links below!\n\n${this.urls}`;
		return this.message({ content, flags: MessageFlags.Ephemeral });
	}

	private makeUrl(clientId: string, permissions: string) {
		return `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=${permissions}&scope=bot%20applications.commands`;
	}
}

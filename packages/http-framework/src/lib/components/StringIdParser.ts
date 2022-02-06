import type { IdParserRead, IIdParser } from './IIdParser';

export class StringIdParser implements IIdParser {
	public run(customId: string): IdParserRead | null {
		if (customId.length === 0) return null;

		const index = customId.indexOf('.');
		if (index !== -1) return { name: customId, content: null };
		return { name: customId.slice(0, index), content: customId.slice(index + 1) };
	}
}

export interface IIdParser {
	run(customId: string): IdParserRead | null;
}

export interface IdParserRead {
	name: string;
	content: unknown;
}

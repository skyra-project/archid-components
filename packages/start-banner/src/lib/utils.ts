export const ansiRegExp = new RegExp(
	[
		String.raw`[\u001B\u009B][[\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\d\/#&.:=?%@~_]+)*`,
		String.raw`[a-zA-Z\d]+(?:;[-a-zA-Z\d\/#&.:=?%@~_]*)*)?\u0007)`,
		String.raw`(?:(?:\d{1,4}(?:;\d{0,4})*)?[\dA-PR-TZcf-nq-uy=><~]))`
	].join('|'),
	'g'
);

export function escapedLength(line: string) {
	return line.replaceAll(ansiRegExp, '').length;
}

export function generateLineData(lines: readonly string[]): readonly LineData[] {
	return lines.map((line) => ({ line, length: escapedLength(line) }));
}

export interface LineData {
	line: string;
	length: number;
}

export function generateFrameData(lines?: readonly string[]): FrameData {
	if (!lines?.length) return { length: 0, lines: [] };

	const entries = generateLineData(lines);
	const length = entries.reduce((prev, entry) => Math.max(prev, entry.length), 0);
	return {
		length,
		lines: entries.map((entry) => `${entry.line}${' '.repeat(length - entry.length)}`)
	};
}

export interface FrameData {
	length: number;
	lines: readonly string[];
}

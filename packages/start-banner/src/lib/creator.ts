import { generateFrameData } from './utils.js';

export function createBanner(options: BannerOptions) {
	const logoHeight = options.logo?.length ?? 0;
	const nameHeight = options.name?.length ?? 0;
	const extraHeight = options.extra?.length ?? 0;
	const detailsHeight = nameHeight + extraHeight;

	const fullHeight = Math.max(logoHeight, detailsHeight);

	// If there's no content at all, throw an error
	if (fullHeight === 0) throw new Error('Expected any of the options to be passed');

	// If there's no logo, display details only:
	if (logoHeight === 0) return [...(options.name ?? []), ...(options.extra ?? [])].join('\n');

	// If there are no details, display logo only:
	if (detailsHeight === 0) return options.logo!.join('\n');

	const logoFrame = generateFrameData(options.logo);
	if (logoFrame.length === 0) return [...(options.name ?? []), ...(options.extra ?? [])].join('\n');

	const logoPadding = ' '.repeat(logoFrame.length);

	const lines: string[] = [];
	for (let i = 0, nl = 0, el = 0; i < fullHeight; ++i) {
		const left = i < logoHeight ? logoFrame.lines[i] : logoPadding;
		const right = nl < nameHeight ? options.name![nl++] : el < extraHeight ? options.extra![el++] : '';
		lines.push(right.length === 0 ? left.trimEnd() : `${left} ${right}`);
	}

	return lines.join('\n');
}

export interface BannerOptions {
	logo?: readonly string[];
	name?: readonly string[];
	extra?: readonly string[];
}

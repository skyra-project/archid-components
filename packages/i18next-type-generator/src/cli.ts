#!/usr/bin/env node

import { Command, InvalidArgumentError } from 'commander';
import { readFile } from 'node:fs/promises';
import { generate } from './generate.js';

const cli = new Command();

const packageFile = new URL('../package.json', import.meta.url);
const packageJson = JSON.parse(await readFile(packageFile, 'utf-8'));

const indentationParser = (value: string) => {
	if (value === 'tabs') return '\t';

	const parsed = Number(value);
	if (Number.isNaN(parsed)) throw new InvalidArgumentError('The indentation must be a number or "tabs"');
	return ' '.repeat(parsed);
};

cli.name('i18next-type-generator') //
	.version(packageJson.version)
	.argument('[source]', 'The directory to generate types from', './src/locales/en-US/')
	.argument('[destination]', 'The directory to generate types to', './src/@types/i18next.d.ts')
	.option('-i, --indentation <value>', 'The indentation to use', indentationParser, '\t')
	.option('-v, --verbose', 'Verbose output')
	.option('--no-prettier', 'Disable prettier')
	.action((...args) => generate(args, cli.opts()));

cli.parse(process.argv);

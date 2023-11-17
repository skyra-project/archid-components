import { blue, gray, magenta, red, redBright, yellow, type Color } from 'colorette';
import { format, inspect } from 'node:util';

export class Logger {
	/**
	 * The depth of the inspect.
	 */
	public readonly level: Logger.Level;

	/**
	 * The inspect depth when logging objects.
	 */
	public readonly depth: number;

	/**
	 * The context for each logging level.
	 */
	public readonly levels: Readonly<Record<Logger.Level, Readonly<Logger.LevelContext>>>;

	public constructor(options: Logger.Options = {}) {
		this.level = options.level ?? Logger.Level.Info;
		this.depth = options.depth ?? 0;
		this.levels = {
			[Logger.Level.Trace]: { color: gray, method: 'trace', name: 'TRACE' },
			[Logger.Level.Debug]: { color: magenta, method: 'debug', name: 'DEBUG' },
			[Logger.Level.Info]: { color: blue, method: 'info', name: 'INFO' },
			[Logger.Level.Warn]: { color: yellow, method: 'warn', name: 'WARN' },
			[Logger.Level.Error]: { color: red, method: 'error', name: 'ERROR' },
			[Logger.Level.Fatal]: { color: redBright, method: 'error', name: 'FATAL' },
			...options.levels
		};
	}

	public enabled(level: Logger.Level): boolean {
		return level >= this.level;
	}

	public disabled(level: Logger.Level): boolean {
		return level < this.level;
	}

	public trace(value: unknown, ...args: readonly unknown[]): void {
		if (this.enabled(Logger.Level.Trace)) this.write(this.levels[Logger.Level.Trace], value, args);
	}

	public debug(value: unknown, ...args: readonly unknown[]): void {
		if (this.enabled(Logger.Level.Debug)) this.write(this.levels[Logger.Level.Debug], value, args);
	}

	public info(value: unknown, ...args: readonly unknown[]): void {
		if (this.enabled(Logger.Level.Info)) this.write(this.levels[Logger.Level.Info], value, args);
	}

	public warn(value: unknown, ...args: readonly unknown[]): void {
		if (this.enabled(Logger.Level.Warn)) this.write(this.levels[Logger.Level.Warn], value, args);
	}

	public error(value: unknown, ...args: readonly unknown[]): void {
		if (this.enabled(Logger.Level.Error)) this.write(this.levels[Logger.Level.Error], value, args);
	}

	public fatal(value: unknown, ...args: readonly unknown[]): void {
		if (this.enabled(Logger.Level.Fatal)) this.write(this.levels[Logger.Level.Fatal], value, args);
	}

	private write(context: Logger.LevelContext, value: unknown, args: readonly unknown[]): void {
		const header = `[${context.color(this.time)}] ${context.color(context.name)} (${process.pid}): `;
		const formatted = typeof value === 'string' ? format(value, ...args) : inspect(value, { colors: true });

		console[context.method](`${header}${formatted.replaceAll('\n', `\n${header}`)}`);
	}

	private get time() {
		const date = new Date();
		const YYYY = String(date.getUTCFullYear());
		const MM = String(date.getUTCMonth() + 1).padStart(2, '0');
		const DD = String(date.getUTCDate()).padStart(2, '0');

		const hh = String(date.getUTCHours()).padStart(2, '0');
		const mm = String(date.getUTCMinutes()).padStart(2, '0');
		const ss = String(date.getUTCSeconds()).padStart(2, '0');

		return `${YYYY}/${MM}/${DD}-${hh}:${mm}:${ss}`;
	}
}

export namespace Logger {
	export interface Options {
		level?: Level;
		depth?: number;
		levels?: Partial<Record<Level, LevelContext>>;
	}

	export enum Level {
		Trace,
		Debug,
		Info,
		Warn,
		Error,
		Fatal
	}

	export interface LevelContext {
		color: Color;
		name: string;
		method: Method;
	}

	export interface Format {
		(value: string): string;
	}

	export type Method = 'debug' | 'error' | 'info' | 'trace' | 'warn';
}

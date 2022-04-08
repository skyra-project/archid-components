export type BooleanString = 'true' | 'false';
export type IntegerString = `${bigint}`;
export type NumberString = `${number}`;

export type EnvAny = keyof Env;
export type EnvString = { [K in EnvAny]: Env[K] extends BooleanString | IntegerString | NumberString ? never : K }[EnvAny];
export type EnvBoolean = { [K in EnvAny]: Env[K] extends BooleanString | undefined ? K : never }[EnvAny];
export type EnvInteger = { [K in EnvAny]: Env[K] extends IntegerString | undefined ? K : never }[EnvAny];
export type EnvNumber = { [K in EnvAny]: Env[K] extends NumberString | undefined ? K : never }[EnvAny];

export interface Env {
	NODE_ENV: 'test' | 'development' | 'production';
	DOTENV_DEBUG?: BooleanString;
	DOTENV_ENCODING?: string;
	DOTENV_ENV?: string;
	DOTENV_PATH?: string;
	DOTENV_PREFIX?: string;
}

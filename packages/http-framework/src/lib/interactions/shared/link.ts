import type { NonNullObject } from '@sapphire/utilities';

const linkSymbol = Symbol('decorated-command.method.link');

export function link<T extends NonNullObject>(object: T, name: string): T {
	Object.defineProperty(object, linkSymbol, { value: name });
	return object;
}

export function getMethod(object: NonNullObject): string | null {
	return Reflect.get(object, linkSymbol) ?? null;
}

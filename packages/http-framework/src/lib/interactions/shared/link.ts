const linkSymbol = Symbol('decorated-command.method.link');

/**
 * Links the specified object with a name.
 *
 * @template T - The type of the object.
 * @param object - The object to link.
 * @param name - The name to link the object with.
 * @returns The linked object.
 * @internal
 */
export function linkMethod<T extends object>(object: T, name: string): T {
	Object.defineProperty(object, linkSymbol, { value: name });
	return object;
}

/**
 * Retrieves the linked method from the given object.
 *
 * @param object - The object from which to retrieve the method.
 * @returns The name of the linked method as a string, or `null` if not found.
 * @internal
 */
export function getLinkedMethod(object: object): string | null {
	return Reflect.get(object, linkSymbol) ?? null;
}

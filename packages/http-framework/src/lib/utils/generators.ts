export function* flattenIterableOfArrays<T>(iterable: IterableIterator<T[]>): Generator<T, void, undefined> {
	for (const values of iterable) yield* values;
}

export function* filterUndefined<T>(...values: (T | undefined)[]): Generator<T, void, undefined> {
	for (const value of values) {
		if (value !== undefined) yield value;
	}
}

export function* guardUndefined<T>(iterable: Iterable<T> | undefined): Generator<T, void, undefined> {
	if (iterable) yield* iterable;
}

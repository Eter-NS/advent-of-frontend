type GenericFunction = (...args: any[]) => any;

type ReturningFunction<T extends GenericFunction> = (
	...args: Parameters<T>
) => ReturnType<T>;

interface MemoizationCache<T extends GenericFunction> {
	[key: string]: ReturnType<T>;
}

export function memoize<T extends GenericFunction>(
	callback: T
): ReturningFunction<T> {
	if (typeof callback !== "function") {
		throw new Error("Function to be memoized must be a function.");
	}

	const cache: MemoizationCache<T> = {};

	return (...args) => {
		const key = args.toString();
		if (key in cache) {
			return cache[key];
		} else {
			cache[key] = callback(args);
			return cache[key];
		}
	};
}

const xyz = (x: number) => x * x;
memoize(xyz);

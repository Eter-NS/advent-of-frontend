export function memoize<T extends (...args: any[]) => any>(
	callback: T
): (...args: Parameters<T>) => ReturnType<T> {
	if (typeof callback !== "function") {
		throw new Error("Function to be memoized must be a function.");
	}

	const cache: Record<string, ReturnType<T>> = {};

	return (...args: Parameters<T>): ReturnType<T> => {
		const key = args.toString();
		if (key in cache) {
			return cache[key];
		} else {
			cache[key] = callback(...args);
			return cache[key];
		}
	};
}
const xyz = (x: number) => x * x;
memoize(xyz);

type GenericFunction = (...args: any[]) => any;
interface PersonalObserver<T> {
	[key: string]: Array<T> | undefined;
}
export class ChristmasEmitter<T extends GenericFunction> {
	private topics: PersonalObserver<T> = {};
	public on(type: string, callback: T): boolean {
		if (!callback.name.length) {
			throw new Error("Anonymous functions are not allowed");
		}
		const topic = this.topics[type];
		if (this.#isTypedArray(topic)) {
			topic!.push(callback);
			return true;
		} else {
			this.topics[type] = [callback];
			return false;
		}
	}
	public off(type: string, callback: T): boolean {
		const topic = this.topics[type];
		if (!topic) return false;
		const index = topic.indexOf(callback);
		if (index === -1) return false;
		topic.splice(index, 1);
		return true;
	}
	public emit(type: string, ...args: any[]) {
		const topic = this.topics[type];
		if (typeof topic === "undefined") return false;
		topic.forEach((cb) => cb(args));
	}
	#isTypedArray(unknownArray: unknown): unknownArray is Array<T> {
		return (
			Array.isArray(unknownArray) &&
			unknownArray.every((el) => typeof el === "function")
		);
	}
}

type Letter = { [key: string]: number };

export function createTrackedLetter(
	letter: Letter,
	changeTracker: (property: string, newValue: number) => void
): Letter {
	const trackedLetter = new Proxy(letter, {
		set: (target, prop, newValue) => {
			if (typeof newValue !== "number") return false;
			if (
				typeof prop === "string" &&
				target[prop as keyof typeof target] !== newValue
			) {
				changeTracker(prop, newValue);
			}
			target[prop as keyof typeof target] = newValue;
			return true;
		},
	});
	return trackedLetter;
}

import { Country, countries } from "./countries";

type Priority = "high" | "medium" | "low";

export interface Letter {
	content: string;
	country: "pl" | "de" | "us";
	priority: Priority;
}

type LetterSort = {
	sort(letters: Letter[]): Letter[];
};

type SortingStrategy = PriorityStrategy | LengthStrategy | CountryStrategy;

export class LetterSorter {
	#sortingModule: SortingStrategy;

	constructor(sorter: SortingStrategy) {
		this.#sortingModule = sorter;
	}

	sortLetters(letters: Letter[]): Letter[] {
		return this.#sortingModule.sort(letters);
	}
}

export class PriorityStrategy implements LetterSort {
	public sort(letters: Letter[]): Letter[] {
		return letters.sort(
			(a, b) =>
				this.#convertPriorityToNumber(b.priority) -
				this.#convertPriorityToNumber(a.priority)
		);
	}

	#convertPriorityToNumber(priority: Priority): number {
		const priorityToNumberTable: { [key in Priority]: number } = {
			high: 2,
			medium: 1,
			low: 0,
		};
		switch (priority) {
			case "high":
				return priorityToNumberTable.high;
			case "medium":
				return priorityToNumberTable.medium;
			case "low":
				return priorityToNumberTable.low;
			default:
				throw new Error("Unexpected object: " + priority);
		}
	}
}

export class LengthStrategy implements LetterSort {
	public sort(letters: Letter[]): Letter[] {
		return letters.sort((a, b) => a.content.length - b.content.length);
	}
}

interface CountryIndex {
	[key: string]: Country;
}

export class CountryStrategy implements LetterSort {
	#countryEastPositionRegistry: CountryIndex = {};

	constructor() {
		countries.forEach((country) => {
			this.#countryEastPositionRegistry[country.countryCode] = country;
		});
	}

	public sort(letters: Letter[]): Letter[] {
		return letters.sort(
			(a, b) =>
				this.#convertCountryNameIntoEastPosition(b.country) -
				this.#convertCountryNameIntoEastPosition(a.country)
		);
	}

	#convertCountryNameIntoEastPosition(countryName: string): number {
		return this.#countryEastPositionRegistry[countryName.toUpperCase()]
			.east;
	}
}

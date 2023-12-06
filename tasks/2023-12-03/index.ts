export interface Lokalizacja {
	x: number;
	y: number;
	z: number;
	czas: number;
}

export type MapaCzasoprzestrzenna = (
	x: number,
	y: number,
	z: number,
	czas: number
) => number;

export function znajdzWorek(
	lokalizacje: Lokalizacja[],
	mapa: MapaCzasoprzestrzenna
): Lokalizacja | null {
	function lokalizacjeIsInvalid() {
		return lokalizacje.some((location) => {
			return Object.values(location).some((position) => position < 1);
		});
	}
	function mapaHasNaN() {
		return countedLocations.some((number) => isNaN(number));
	}
	function returnHighestMapaValueIndex() {
		const highestValue = Math.max(...countedLocations);
		return countedLocations.indexOf(highestValue);
	}

	if (!lokalizacje.length) return null;
	if (lokalizacjeIsInvalid()) return null;

	const countedLocations = lokalizacje.map(({ x, y, z, czas }) =>
		mapa(x, y, z, czas)
	);

	if (mapaHasNaN()) return null;

	return lokalizacje[returnHighestMapaValueIndex()];
}

// export const mapaCzasoprzestrzenna: MapaCzasoprzestrzenna = (
// 	x,
// 	y,
// 	z,
// 	czas
// ) => x + y + z + czas;

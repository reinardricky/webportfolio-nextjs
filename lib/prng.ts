/**
 * Seeded LCG. Geometry built during render must be pure — Math.random
 * would make server and client disagree, and React's compiler rejects it.
 * Stays inside exact-integer range for every 32-bit seed.
 */
export function makeRandom(seed: number): () => number {
	let state = seed >>> 0;
	return () => {
		state = (state * 1664525 + 1013904223) % 4294967296;
		return state / 4294967296;
	};
}

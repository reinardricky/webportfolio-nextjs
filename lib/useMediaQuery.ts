'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Reads a media query without a setState-in-effect round trip.
 * `serverValue` is what renders before hydration — pick the safe side.
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
	const subscribe = useCallback(
		(onChange: () => void) => {
			const mq = window.matchMedia(query);
			mq.addEventListener('change', onChange);
			return () => mq.removeEventListener('change', onChange);
		},
		[query],
	);

	return useSyncExternalStore(
		subscribe,
		() => window.matchMedia(query).matches,
		() => serverValue,
	);
}

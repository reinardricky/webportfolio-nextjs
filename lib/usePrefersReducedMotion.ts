'use client';

import { useMediaQuery } from './useMediaQuery';

/**
 * Defaults to `true` before hydration so motion is opt-in — a visitor who
 * asked for less of it never sees a frame of animation first.
 */
export function usePrefersReducedMotion(): boolean {
	return useMediaQuery('(prefers-reduced-motion: reduce)', true);
}

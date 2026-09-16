'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';
import SceneBoundary from './SceneBoundary';
import StaticShell from './StaticShell';

// WebGL never runs on the server, and three is heavy — keep it out of the
// first payload entirely and let the SVG shell hold the space meanwhile.
const HeroScene = dynamic(() => import('./HeroScene'), {
	ssr: false,
	loading: () => <StaticShell />,
});

// Probed once per page load, then cached — creating throwaway canvases on
// every render would be its own performance bug.
let webglSupport: boolean | null = null;

function supportsWebGL(): boolean {
	if (webglSupport !== null) return webglSupport;
	try {
		const canvas = document.createElement('canvas');
		webglSupport = Boolean(
			canvas.getContext('webgl2') ??
				canvas.getContext('webgl') ??
				canvas.getContext('experimental-webgl'),
		);
	} catch {
		webglSupport = false;
	}
	return webglSupport;
}

/** Support never changes mid-session, so there is nothing to subscribe to. */
const noSubscribe = () => () => {};

export default function HeroVisual() {
	const host = useRef<HTMLDivElement>(null);
	const reducedMotion = usePrefersReducedMotion();
	const [inView, setInView] = useState(true);
	const [lost, setLost] = useState(false);

	// Server and first paint render the SVG shell; WebGL takes over after.
	const webgl = useSyncExternalStore(noSubscribe, supportsWebGL, () => false);

	// Stop drawing the moment the hero leaves the viewport.
	useEffect(() => {
		const el = host.current;
		if (!el || typeof IntersectionObserver === 'undefined') return;

		const io = new IntersectionObserver(
			([entry]) => setInView(entry.isIntersecting),
			{ rootMargin: '120px' },
		);
		io.observe(el);
		return () => io.disconnect();
	}, []);

	const frameloop = reducedMotion ? 'demand' : inView ? 'always' : 'never';

	return (
		<div
			ref={host}
			// Decorative: the hero's meaning lives in the headline beside it.
			aria-hidden="true"
			className="h-full w-full [mask-image:radial-gradient(88%_88%_at_50%_50%,#000_72%,transparent_100%)]"
		>
			{webgl && !lost ? (
				<SceneBoundary fallback={<StaticShell />}>
					<HeroScene
						frameloop={frameloop}
						still={reducedMotion}
						onContextLost={() => setLost(true)}
					/>
				</SceneBoundary>
			) : (
				<StaticShell />
			)}
		</div>
	);
}

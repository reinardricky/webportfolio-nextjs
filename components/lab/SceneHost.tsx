'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';

import SceneBoundary from '@/components/three/SceneBoundary';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

export type SceneState = {
	frameloop: 'always' | 'never' | 'demand';
	still: boolean;
	scrollRef: React.RefObject<number>;
	pointerRef: React.RefObject<{ x: number; y: number; active: number }>;
};

let webglSupport: boolean | null = null;

function supportsWebGL(): boolean {
	if (webglSupport !== null) return webglSupport;
	try {
		const canvas = document.createElement('canvas');
		webglSupport = Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'));
	} catch {
		webglSupport = false;
	}
	return webglSupport;
}

const noSubscribe = () => () => {};

/**
 * Everything the three candidate scenes need in common: capability
 * detection, a static fallback, pausing when off-screen, reduced motion,
 * and shared pointer/scroll refs.
 *
 * It deliberately does NOT import anything from three — each design
 * dynamic-imports its own Canvas, so the 3D stays out of the first load.
 */
export default function SceneHost({
	children,
	fallback,
	className = '',
}: {
	children: (state: SceneState) => ReactNode;
	fallback: ReactNode;
	className?: string;
}) {
	const host = useRef<HTMLDivElement>(null);
	const scrollRef = useRef(0);
	const pointerRef = useRef({ x: 0, y: 0, active: 0 });
	const [inView, setInView] = useState(true);

	const reducedMotion = usePrefersReducedMotion();
	const webgl = useSyncExternalStore(noSubscribe, supportsWebGL, () => false);

	useEffect(() => {
		const el = host.current;
		if (!el || typeof IntersectionObserver === 'undefined') return;
		const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
			rootMargin: '120px',
		});
		io.observe(el);
		return () => io.disconnect();
	}, []);

	useEffect(() => {
		const onScroll = () => {
			scrollRef.current = Math.min(
				Math.max(window.scrollY / Math.max(window.innerHeight, 1), 0),
				1,
			);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	// Tracked on window, not the canvas: copy sits above the canvas, so a
	// canvas-local listener would go dead wherever the text is.
	useEffect(() => {
		if (reducedMotion) return;
		if (!window.matchMedia('(pointer: fine)').matches) return;

		const onMove = (e: PointerEvent) => {
			const box = host.current?.getBoundingClientRect();
			if (!box || box.width === 0 || box.height === 0) return;
			pointerRef.current.x = ((e.clientX - box.left) / box.width) * 2 - 1;
			pointerRef.current.y = -((e.clientY - box.top) / box.height) * 2 + 1;
			pointerRef.current.active = 1;
		};
		const onLeave = () => {
			pointerRef.current.active = 0;
		};

		window.addEventListener('pointermove', onMove, { passive: true });
		document.addEventListener('pointerleave', onLeave);
		return () => {
			window.removeEventListener('pointermove', onMove);
			document.removeEventListener('pointerleave', onLeave);
		};
	}, [reducedMotion]);

	const frameloop = reducedMotion ? 'demand' : inView ? 'always' : 'never';

	return (
		<div ref={host} aria-hidden="true" className={className}>
			{webgl ? (
				<SceneBoundary fallback={fallback}>
					{children({ frameloop, still: reducedMotion, scrollRef, pointerRef })}
				</SceneBoundary>
			) : (
				fallback
			)}
		</div>
	);
}

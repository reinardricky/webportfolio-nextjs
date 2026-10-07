'use client';

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';

import SceneBoundary from '@/components/three/SceneBoundary';
import { usePrefersReducedMotion } from '@/lib/usePrefersReducedMotion';

export type SceneState = {
	frameloop: 'always' | 'never' | 'demand';
	still: boolean;
	scrollRef: React.RefObject<number>;
	pointerRef: React.RefObject<{ x: number; y: number; active: number }>;
	dragRef: React.RefObject<DragState>;
};

/**
 * Raw grab input, in fractions of the host's width. The scene drains
 * `dx`/`dy` every frame and owns the physics; `taps` only ever counts up.
 */
export type DragState = { dx: number; dy: number; held: boolean; taps: number };

/** Below this travel (px) and duration (ms) a press counts as a tap. */
const TAP_SLOP = 6;
const TAP_MS = 350;

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
	style,
	interactive = false,
}: {
	children: (state: SceneState) => ReactNode;
	fallback: ReactNode;
	className?: string;
	style?: React.CSSProperties;
	/** Let the visitor grab the scene: drag or swipe sideways, tap to strike. */
	interactive?: boolean;
}) {
	const host = useRef<HTMLDivElement>(null);
	const scrollRef = useRef(0);
	const pointerRef = useRef({ x: 0, y: 0, active: 0 });
	const dragRef = useRef<DragState>({ dx: 0, dy: 0, held: false, taps: 0 });
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

	// Grabbing. Listened for on the host itself, unlike hover: a drag has to
	// start on the stone. `touch-action: pan-y` leaves vertical swipes to the
	// page, so a phone still scrolls; the browser fires pointercancel when it
	// takes one over, which releases the grab.
	const grabbable = interactive && !reducedMotion && webgl;
	useEffect(() => {
		const el = host.current;
		if (!el || !grabbable) return;
		const drag = dragRef.current;

		let press: { id: number; x: number; y: number; t: number; moved: boolean } | null = null;
		let last = { x: 0, y: 0 };

		const onDown = (e: PointerEvent) => {
			if (press || (e.pointerType === 'mouse' && e.button !== 0)) return;
			press = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), moved: false };
			last = { x: e.clientX, y: e.clientY };
			drag.held = true;
			el.setPointerCapture(e.pointerId);
			el.style.cursor = 'grabbing';
		};
		const onMove = (e: PointerEvent) => {
			if (!press || e.pointerId !== press.id) return;
			const w = Math.max(el.clientWidth, 1);
			drag.dx += (e.clientX - last.x) / w;
			drag.dy += (e.clientY - last.y) / w;
			last = { x: e.clientX, y: e.clientY };
			if (Math.hypot(e.clientX - press.x, e.clientY - press.y) > TAP_SLOP) press.moved = true;
		};
		const onUp = (e: PointerEvent) => {
			if (!press || e.pointerId !== press.id) return;
			if (e.type === 'pointerup' && !press.moved && performance.now() - press.t < TAP_MS) {
				drag.taps++;
			}
			press = null;
			drag.held = false;
			el.style.cursor = '';
		};

		el.addEventListener('pointerdown', onDown);
		el.addEventListener('pointermove', onMove);
		el.addEventListener('pointerup', onUp);
		el.addEventListener('pointercancel', onUp);
		return () => {
			el.removeEventListener('pointerdown', onDown);
			el.removeEventListener('pointermove', onMove);
			el.removeEventListener('pointerup', onUp);
			el.removeEventListener('pointercancel', onUp);
			drag.held = false;
		};
	}, [grabbable]);

	const frameloop = reducedMotion ? 'demand' : inView ? 'always' : 'never';

	return (
		<div
			ref={host}
			aria-hidden="true"
			className={className}
			style={grabbable ? { cursor: 'grab', touchAction: 'pan-y pinch-zoom', userSelect: 'none', ...style } : style}
		>
			{webgl ? (
				<SceneBoundary fallback={fallback}>
					{children({ frameloop, still: reducedMotion, scrollRef, pointerRef, dragRef })}
				</SceneBoundary>
			) : (
				fallback
			)}
		</div>
	);
}

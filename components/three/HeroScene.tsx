'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';

import { useMediaQuery } from '@/lib/useMediaQuery';

import Embers from './Embers';
import RuneGate from './RuneGate';

/**
 * In `demand` mode nothing draws unless something asks it to. Reduced-motion
 * visitors get exactly one posed frame, then the GPU goes quiet.
 */
function PaintOnce() {
	const invalidate = useThree((s) => s.invalidate);
	useEffect(() => {
		// Two frames: one to run useFrame's posing pass, one to show it.
		invalidate();
		const id = requestAnimationFrame(() => invalidate());
		return () => cancelAnimationFrame(id);
	}, [invalidate]);
	return null;
}

type Props = {
	/** 'always' in view, 'never' scrolled away, 'demand' for reduced motion. */
	frameloop: 'always' | 'never' | 'demand';
	still: boolean;
	onContextLost: () => void;
};

export default function HeroScene({ frameloop, still, onContextLost }: Props) {
	const wrap = useRef<HTMLDivElement>(null);
	const scrollRef = useRef(0);
	const pointerRef = useRef({ x: 0, y: 0, active: 0 });
	// Fewer embers on small screens: mobile GPUs are fill-rate bound.
	const narrow = useMediaQuery('(max-width: 768px)', true);
	const emberCount = narrow ? 90 : 260;

	// Hero scroll progress, tracked passively rather than read every frame.
	useEffect(() => {
		const onScroll = () => {
			const progress = window.scrollY / Math.max(window.innerHeight, 1);
			scrollRef.current = Math.min(Math.max(progress, 0), 1);
		};
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	/*
	 * Tracked on `window`, not on the canvas: the hero copy sits above the
	 * canvas, so canvas-local listeners would go dead over the headline.
	 * Coarse pointers (touch) never activate the repulsion at all.
	 */
	useEffect(() => {
		if (still) return;
		if (!window.matchMedia('(pointer: fine)').matches) return;

		const onMove = (e: PointerEvent) => {
			const box = wrap.current?.getBoundingClientRect();
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
	}, [still]);

	return (
		<div ref={wrap} className="h-full w-full">
			<Canvas
				frameloop={frameloop}
				dpr={[1, 1.75]}
				camera={{ position: [0, 0, 7.4], fov: 42 }}
				gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
				style={{ pointerEvents: 'none' }}
				onCreated={({ gl }) => {
					// A lost context would otherwise leave a blank canvas behind.
					gl.domElement.addEventListener('webglcontextlost', (e) => {
						e.preventDefault();
						onContextLost();
					});
				}}
			>
				{frameloop === 'demand' && <PaintOnce />}
				<RuneGate scrollRef={scrollRef} pointerRef={pointerRef} still={still} />
				<Embers count={emberCount} scrollRef={scrollRef} still={still} />
			</Canvas>
		</div>
	);
}

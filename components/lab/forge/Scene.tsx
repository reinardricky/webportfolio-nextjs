'use client';

import { Canvas } from '@react-three/fiber';

import type { SceneState } from '@/components/lab/SceneHost';
import Ingot from './Ingot';
import Sparks from './Sparks';

export default function Scene({ frameloop, still, scrollRef, pointerRef }: SceneState) {
	return (
		<Canvas
			frameloop={frameloop}
			dpr={[1, 1.75]}
			camera={{ position: [0, 0, 5.2], fov: 45 }}
			gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
			style={{ pointerEvents: 'none' }}
		>
			<Ingot scrollRef={scrollRef} pointerRef={pointerRef} still={still} />
			<Sparks count={200} scrollRef={scrollRef} still={still} />
		</Canvas>
	);
}

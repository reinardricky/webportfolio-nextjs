'use client';

import { Canvas } from '@react-three/fiber';

import type { SceneState } from '@/components/lab/SceneHost';
import Tree from './Tree';

export default function Scene({ frameloop, still, scrollRef, pointerRef }: SceneState) {
	return (
		<Canvas
			frameloop={frameloop}
			dpr={[1, 1.75]}
			camera={{ position: [0, 0.6, 7], fov: 45 }}
			gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
			style={{ pointerEvents: 'none' }}
		>
			<Tree scrollRef={scrollRef} pointerRef={pointerRef} still={still} />
		</Canvas>
	);
}

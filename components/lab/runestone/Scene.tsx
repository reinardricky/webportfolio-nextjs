'use client';

import { Canvas } from '@react-three/fiber';

import type { SceneState } from '@/components/lab/SceneHost';
import Motes from './Motes';
import Stone from './Stone';

export default function Scene({ frameloop, still, scrollRef, pointerRef }: SceneState) {
	return (
		<Canvas
			frameloop={frameloop}
			dpr={[1, 1.75]}
			camera={{ position: [0, 0, 5 ], fov: 44 }}
			gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
			style={{ pointerEvents: 'none' }}
		>
			<Stone scrollRef={scrollRef} pointerRef={pointerRef} still={still} />
			<Motes still={still} />
		</Canvas>
	);
}

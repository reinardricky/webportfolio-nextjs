'use client';

import { Canvas } from '@react-three/fiber';

import type { SceneState } from '@/components/three/SceneHost';
import { useMediaQuery } from '@/lib/useMediaQuery';
import Terrain from './Terrain';

export default function Scene(state: SceneState) {
	const narrow = useMediaQuery('(max-width: 768px)', true);

	return (
		<Canvas
			frameloop={state.frameloop}
			dpr={[1, 1.75]}
			camera={{ position: [0, 0, 5 ], fov: 45 }}
			gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
			style={{ pointerEvents: 'none' }}
		>
			<Terrain {...state} segments={narrow ? 128 : 220} />
		</Canvas>
	);
}

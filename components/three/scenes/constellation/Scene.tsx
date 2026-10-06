'use client';

import { Canvas } from '@react-three/fiber';

import type { SceneState } from '@/components/three/SceneHost';
import { useMediaQuery } from '@/lib/useMediaQuery';
import Stars from './Stars';

export default function Scene(state: SceneState) {
	const narrow = useMediaQuery('(max-width: 768px)', true);

	return (
		<Canvas
			frameloop={state.frameloop}
			dpr={[1, 1.75]}
			camera={{ position: [0, 0, 5.6], fov: 44 }}
			gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
			style={{ pointerEvents: 'none' }}
		>
			<Stars {...state} count={narrow ? 420 : 1100} />
		</Canvas>
	);
}

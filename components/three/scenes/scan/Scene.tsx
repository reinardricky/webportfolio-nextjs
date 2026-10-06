'use client';

import { Canvas } from '@react-three/fiber';

import type { SceneState } from '@/components/three/SceneHost';
import { useMediaQuery } from '@/lib/useMediaQuery';
import ScanPoints from './Points';

export default function Scene(state: SceneState) {
	const narrow = useMediaQuery('(max-width: 768px)', true);

	return (
		<Canvas
			frameloop={state.frameloop}
			dpr={[1, 1.75]}
			camera={{ position: [0, 0, 4.6], fov: 44 }}
			gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
			style={{ pointerEvents: 'none' }}
		>
			<ScanPoints {...state} count={narrow ? 2200 : 6000} />
		</Canvas>
	);
}

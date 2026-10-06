'use client';

import { Canvas } from '@react-three/fiber';

import type { SceneState } from '@/components/three/SceneHost';
import Sigil from './Sigil';

export default function Scene(state: SceneState) {
	return (
		<Canvas
			frameloop={state.frameloop}
			dpr={[1, 1.75]}
			camera={{ position: [0, 0, 4.4], fov: 45 }}
			gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
			style={{ pointerEvents: 'none' }}
		>
			<Sigil {...state} />
		</Canvas>
	);
}

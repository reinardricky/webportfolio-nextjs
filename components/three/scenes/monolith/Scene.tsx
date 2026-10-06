'use client';

import { Canvas } from '@react-three/fiber';

import type { SceneState } from '@/components/three/SceneHost';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { site } from '@/lib/site';
import Monolith from './Monolith';
import Motes from './Motes';

/** Name down the face; surname and role run round the serpent band. */
const INSCRIPTION = {
	name: site.firstName,
	band: `${site.name.split(' ').at(-1)} ${site.role}`,
};

export default function Scene(state: SceneState) {
	const narrow = useMediaQuery('(max-width: 768px)', true);

	return (
		<Canvas
			frameloop={state.frameloop}
			dpr={[1, 1.75]}
			camera={{ position: [0, -0.18, 5.6], fov: 40 }}
			gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
			style={{ pointerEvents: 'none' }}
		>
			<Monolith {...state} inscription={INSCRIPTION} />
			<Motes count={narrow ? 50 : 110} still={state.still} />
		</Canvas>
	);
}

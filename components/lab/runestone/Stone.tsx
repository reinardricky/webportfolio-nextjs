'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { makeRandom } from '@/lib/prng';
import { createStoneAlbedo, createStoneBump } from './stoneTexture';

type Props = {
	scrollRef: React.RefObject<number>;
	pointerRef: React.RefObject<{ x: number; y: number; active: number }>;
	still?: boolean;
};

export default function Stone({ scrollRef, pointerRef, still = false }: Props) {
	const mesh = useRef<THREE.Mesh>(null);
	const group = useRef<THREE.Group>(null);

	const geometry = useMemo(() => {
		const geo = new THREE.BoxGeometry(1.55, 3.1, 0.42, 7, 14, 3);
		const position = geo.attributes.position;
		const rand = makeRandom(6_140_882);

		// Weather the slab: push every vertex around a little so no edge is
		// machine-straight, then let three recompute the lighting normals.
		for (let i = 0; i < position.count; i++) {
			const jitter = 0.035;
			position.setXYZ(
				i,
				position.getX(i) + (rand() - 0.5) * jitter * 2.2,
				position.getY(i) + (rand() - 0.5) * jitter,
				position.getZ(i) + (rand() - 0.5) * jitter * 2.4,
			);
		}
		position.needsUpdate = true;
		geo.computeVertexNormals();
		return geo;
	}, []);

	const albedo = useMemo(() => createStoneAlbedo(), []);
	const bump = useMemo(() => createStoneBump(), []);

	useEffect(
		() => () => {
			geometry.dispose();
			albedo.dispose();
			bump.dispose();
		},
		[geometry, albedo, bump],
	);

	useFrame((state, delta) => {
		if (!group.current) return;

		if (still) {
			group.current.rotation.set(0.05, -0.42, 0.02);
			return;
		}

		const ptr = pointerRef.current;
		const damp = 1 - Math.pow(0.004, delta);

		// Turns slowly on its own; the cursor steers it so you can read
		// the far faces without the carving ever sitting flat to the light.
		group.current.rotation.y += delta * 0.16;
		group.current.rotation.y = THREE.MathUtils.lerp(
			group.current.rotation.y,
			group.current.rotation.y + ptr.x * ptr.active * 0.6,
			damp * 0.35,
		);
		group.current.rotation.x = THREE.MathUtils.lerp(
			group.current.rotation.x,
			ptr.y * ptr.active * 0.18,
			damp,
		);
		group.current.position.y = -scrollRef.current * 1.2;
	});

	return (
		<>
			{/* Low, raking key light — carving only reads when lit from the side. */}
			<directionalLight position={[-3.5, 4, 3]} intensity={2.6} color="#fff0d8" />
			<directionalLight position={[3, -1, -2]} intensity={0.5} color="#9aa87e" />
			<ambientLight intensity={0.34} color="#8ea0a8" />

			<group ref={group}>
				<mesh ref={mesh} geometry={geometry}>
					<meshStandardMaterial
						map={albedo}
						bumpMap={bump}
						bumpScale={2.4}
						roughness={0.92}
						metalness={0.02}
					/>
				</mesh>
			</group>
		</>
	);
}

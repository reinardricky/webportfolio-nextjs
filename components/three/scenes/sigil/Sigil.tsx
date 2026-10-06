'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import type { SceneState } from '@/components/three/SceneHost';
import { RUNES } from '@/lib/runes';

/**
 * A bind-rune: several runes sharing one vertical stave, the way carvers
 * combined them into a single mark. Each stroke becomes a real bar in 3D,
 * so raking light travels across the form as it turns.
 */
const COMPOSED = ['Ansuz', 'Raidho', 'Algiz', 'Kenaz', 'Isa', 'Tiwaz', 'Laguz'];

function buildBars() {
	const chosen = COMPOSED.map((name) => RUNES.find((r) => r.name === name)).filter(
		(r): r is (typeof RUNES)[number] => Boolean(r),
	);

	const bars: { position: THREE.Vector3; quaternion: THREE.Quaternion; length: number }[] = [];
	const seen = new Set<string>();
	const SCALE_X = 1.5;
	const SCALE_Y = 2.6;
	const up = new THREE.Vector3(0, 1, 0);

	for (const rune of chosen) {
		for (const [x1, y1, x2, y2] of rune.strokes) {
			// The stave is shared: keep only the first copy of each stroke.
			const key = [x1, y1, x2, y2].map((n) => n.toFixed(3)).join(',');
			if (seen.has(key)) continue;
			seen.add(key);

			const a = new THREE.Vector3((x1 - 0.5) * SCALE_X, (y1 - 0.5) * SCALE_Y, 0);
			const b = new THREE.Vector3((x2 - 0.5) * SCALE_X, (y2 - 0.5) * SCALE_Y, 0);
			const delta = new THREE.Vector3().subVectors(b, a);
			const length = delta.length();
			if (length < 0.01) continue;

			bars.push({
				position: new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5),
				// Cylinders point +Y by default; rotate that onto the stroke.
				quaternion: new THREE.Quaternion().setFromUnitVectors(up, delta.clone().normalize()),
				length,
			});
		}
	}

	return bars;
}

export default function Sigil({ scrollRef, pointerRef, still }: SceneState) {
	const group = useRef<THREE.Group>(null);
	const bars = useMemo(() => buildBars(), []);
	const barGeo = useMemo(() => new THREE.CylinderGeometry(0.036, 0.036, 1, 10), []);
	const capGeo = useMemo(() => new THREE.SphereGeometry(0.036, 10, 8), []);

	useEffect(
		() => () => {
			barGeo.dispose();
			capGeo.dispose();
		},
		[barGeo, capGeo],
	);

	useFrame((state, delta) => {
		if (!group.current) return;

		if (still) {
			group.current.rotation.set(0.1, -0.55, 0);
			return;
		}

		const ptr = pointerRef.current;
		const damp = 1 - Math.pow(0.004, delta);
		const t = state.clock.elapsedTime;

		// Rocks back and forth rather than spinning — a mark being examined.
		group.current.rotation.y = THREE.MathUtils.lerp(
			group.current.rotation.y,
			Math.sin(t * 0.22) * 0.55 + ptr.x * ptr.active * 0.5,
			damp,
		);
		group.current.rotation.x = THREE.MathUtils.lerp(
			group.current.rotation.x,
			Math.sin(t * 0.17) * 0.1 + ptr.y * ptr.active * 0.2,
			damp,
		);
		group.current.position.y = -scrollRef.current * 0.9;
	});

	return (
		<>
			<directionalLight position={[-3, 3.5, 3]} intensity={3} color="#fff1dc" />
			<directionalLight position={[3.5, -1.5, -2]} intensity={0.7} color="#9aa87e" />
			<ambientLight intensity={0.3} color="#8fa0a4" />

			<group ref={group}>
				{bars.map((bar, i) => (
					<group key={i} position={bar.position} quaternion={bar.quaternion}>
						<mesh geometry={barGeo} scale={[1, bar.length, 1]}>
							<meshStandardMaterial color="#c4543a" roughness={0.55} metalness={0.25} />
						</mesh>
						{/* Rounded ends, so joins read as one continuous cut. */}
						<mesh geometry={capGeo} position={[0, bar.length / 2, 0]}>
							<meshStandardMaterial color="#c4543a" roughness={0.55} metalness={0.25} />
						</mesh>
						<mesh geometry={capGeo} position={[0, -bar.length / 2, 0]}>
							<meshStandardMaterial color="#c4543a" roughness={0.55} metalness={0.25} />
						</mesh>
					</group>
				))}
			</group>
		</>
	);
}

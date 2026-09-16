'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { createRingGeometry, createRuneStrip } from './runeTexture';

/** Three rings, each with its own rune count, radius and drift. */
const RINGS = [
	{ inner: 1.02, outer: 1.42, count: 18, seed: 10_113, speed: 0.085, opacity: 0.95 },
	{ inner: 1.58, outer: 1.92, count: 26, seed: 77_431, speed: -0.055, opacity: 0.72 },
	{ inner: 2.06, outer: 2.34, count: 34, seed: 52_207, speed: 0.032, opacity: 0.5 },
];

type Props = {
	scrollRef: React.RefObject<number>;
	pointerRef: React.RefObject<{ x: number; y: number; active: number }>;
	still?: boolean;
};

export default function RuneGate({ scrollRef, pointerRef, still = false }: Props) {
	const group = useRef<THREE.Group>(null);
	const rings = useRef<(THREE.Mesh | null)[]>([]);
	const core = useRef<THREE.Mesh>(null);

	const built = useMemo(
		() =>
			RINGS.map((ring) => ({
				...ring,
				geometry: createRingGeometry(ring.inner, ring.outer),
				texture: createRuneStrip({ count: ring.count, seed: ring.seed }),
			})),
		[],
	);

	// Canvas textures and geometries are GPU resources; give them back.
	useEffect(
		() => () => {
			for (const ring of built) {
				ring.geometry.dispose();
				ring.texture.dispose();
			}
		},
		[built],
	);

	const coreUniforms = useMemo(
		() => ({
			uColor: { value: new THREE.Color('#e8a93f') },
			uIntensity: { value: 0.85 },
		}),
		[],
	);

	useFrame((state, delta) => {
		const t = state.clock.elapsedTime;
		const scroll = scrollRef.current;
		const ptr = pointerRef.current;

		if (group.current) {
			if (still) {
				group.current.rotation.set(-0.26, 0, 0);
			} else {
				// The gate leans toward the cursor, like a plate catching light.
				const damp = 1 - Math.pow(0.004, delta);
				group.current.rotation.x = THREE.MathUtils.lerp(
					group.current.rotation.x,
					-0.26 + ptr.y * ptr.active * 0.16,
					damp,
				);
				group.current.rotation.y = THREE.MathUtils.lerp(
					group.current.rotation.y,
					ptr.x * ptr.active * 0.2,
					damp,
				);
			}
			// Scrolling away opens the gate and lets it recede.
			group.current.scale.setScalar(1 + scroll * 0.35);
		}

		built.forEach((ring, i) => {
			const mesh = rings.current[i];
			if (!mesh) return;

			if (!still) mesh.rotation.z += delta * ring.speed;

			// Each ring breathes on its own offset, so the glow never pulses
			// in lockstep — that reads as mechanical rather than lit.
			const pulse = still ? 0.5 : 0.5 + Math.sin(t * 0.7 + i * 1.9) * 0.5;
			const material = mesh.material as THREE.MeshBasicMaterial;
			material.opacity = ring.opacity * (0.72 + pulse * 0.28) * (1 - scroll * 0.85);
		});

		if (core.current) {
			const breath = still ? 0.5 : 0.5 + Math.sin(t * 1.15) * 0.5;
			const material = core.current.material as THREE.ShaderMaterial;
			material.uniforms.uIntensity.value = (0.55 + breath * 0.5) * (1 - scroll);
			core.current.rotation.z = still ? 0 : t * 0.04;
		}
	});

	return (
		<group ref={group} rotation={[-0.26, 0, 0]}>
			{built.map((ring, i) => (
				<mesh
					key={ring.seed}
					ref={(el) => {
						rings.current[i] = el;
					}}
					geometry={ring.geometry}
				>
					<meshBasicMaterial
						map={ring.texture}
						transparent
						blending={THREE.AdditiveBlending}
						depthWrite={false}
						side={THREE.DoubleSide}
						toneMapped={false}
					/>
				</mesh>
			))}

			{/* The light behind the gate. */}
			<mesh ref={core}>
				<planeGeometry args={[3.2, 3.2]} />
				<shaderMaterial
					uniforms={coreUniforms}
					transparent
					blending={THREE.AdditiveBlending}
					depthWrite={false}
					toneMapped={false}
					vertexShader={/* glsl */ `
						varying vec2 vUv;
						void main() {
							vUv = uv;
							gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
						}
					`}
					fragmentShader={/* glsl */ `
						uniform vec3 uColor;
						uniform float uIntensity;
						varying vec2 vUv;
						void main() {
							float d = length(vUv - 0.5) * 2.0;
							float a = pow(max(0.0, 1.0 - d), 3.2);
							// AdditiveBlending already scales by alpha (srcAlpha, one),
							// so the colour must NOT be pre-multiplied here too.
							gl_FragColor = vec4(uColor * uIntensity, a);
						}
					`}
				/>
			</mesh>
		</group>
	);
}

'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { makeRandom } from '@/lib/prng';

/** Dust hanging in the light. Slow, sparse, barely there. */
export default function Motes({ count = 140, still = false }: { count?: number; still?: boolean }) {
	const points = useRef<THREE.Points>(null);

	const geometry = useMemo(() => {
		const rand = makeRandom(1_770_425);
		const position = new Float32Array(count * 3);
		const seed = new Float32Array(count);
		for (let i = 0; i < count; i++) {
			position[i * 3] = (rand() - 0.5) * 7;
			position[i * 3 + 1] = (rand() - 0.5) * 5;
			position[i * 3 + 2] = (rand() - 0.5) * 3.5;
			seed[i] = rand();
		}
		const geo = new THREE.BufferGeometry();
		geo.setAttribute('position', new THREE.BufferAttribute(position, 3));
		geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
		return geo;
	}, [count]);

	useEffect(() => () => geometry.dispose(), [geometry]);

	const uniforms = useMemo(
		() => ({
			uTime: { value: still ? 1.8 : 0 },
			uPixelRatio: { value: 1 },
			uColor: { value: new THREE.Color('#f0d9c4') },
		}),
		[still],
	);

	useFrame((state) => {
		const material = points.current?.material as THREE.ShaderMaterial | undefined;
		if (!material) return;
		material.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
		if (!still) material.uniforms.uTime.value = state.clock.elapsedTime;
	});

	return (
		<points ref={points} geometry={geometry} frustumCulled={false}>
			<shaderMaterial
				transparent
				depthWrite={false}
				toneMapped={false}
				uniforms={uniforms}
				vertexShader={/* glsl */ `
					uniform float uTime;
					uniform float uPixelRatio;
					attribute float aSeed;
					varying float vA;
					void main() {
						vec3 pos = position;
						pos.y += sin(uTime * 0.16 + aSeed * 30.0) * 0.5;
						pos.x += cos(uTime * 0.11 + aSeed * 22.0) * 0.4;
						vA = 0.2 + 0.5 * (0.5 + 0.5 * sin(uTime * 0.7 + aSeed * 50.0));
						vec4 mv = modelViewMatrix * vec4(pos, 1.0);
						gl_Position = projectionMatrix * mv;
						gl_PointSize = (1.0 + aSeed * 2.0) * uPixelRatio * (30.0 / max(-mv.z, 0.1));
					}
				`}
				fragmentShader={/* glsl */ `
					uniform vec3 uColor;
					varying float vA;
					void main() {
						float d = length(gl_PointCoord - 0.5) * 2.0;
						float a = pow(max(0.0, 1.0 - d), 2.0) * vA;
						if (a < 0.002) discard;
						gl_FragColor = vec4(uColor, a);
					}
				`}
			/>
		</points>
	);
}

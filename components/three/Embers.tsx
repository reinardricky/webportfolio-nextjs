'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

const VERTEX = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform float uSpan;
uniform float uFade;

attribute float aSpeed;
attribute float aSeed;
attribute float aScale;

varying float vAlpha;

void main() {
  vec3 pos = position;

  // Rise, wrap, and drift sideways like ash off a fire.
  float life = fract((uTime * aSpeed * 0.06) + aSeed);
  pos.y = mix(-uSpan, uSpan, life);
  pos.x += sin(uTime * 0.35 + aSeed * 28.0) * 0.28;
  pos.z += cos(uTime * 0.27 + aSeed * 19.0) * 0.22;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mv;

  // Fade in off the floor and out at the top, so nothing pops.
  vAlpha = smoothstep(0.0, 0.18, life) * (1.0 - smoothstep(0.55, 1.0, life)) * uFade;

  gl_PointSize = aScale * uPixelRatio * (34.0 / max(-mv.z, 0.1));
}
`;

const FRAGMENT = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = pow(max(0.0, 1.0 - d), 2.4) * vAlpha;
  if (a < 0.002) discard;
  // AdditiveBlending multiplies by alpha itself; don't pre-multiply.
  gl_FragColor = vec4(uColor, a);
}
`;

type Props = {
	count: number;
	scrollRef: React.RefObject<number>;
	still?: boolean;
};

/** Embers drifting up past the gate. Additive, so they read as light. */
export default function Embers({ count, scrollRef, still = false }: Props) {
	const points = useRef<THREE.Points>(null);

	const geometry = useMemo(() => {
		const positions = new Float32Array(count * 3);
		const speeds = new Float32Array(count);
		const seeds = new Float32Array(count);
		const scales = new Float32Array(count);

		let state = 8_812_733;
		const rand = () => {
			state = (state * 1664525 + 1013904223) % 4294967296;
			return state / 4294967296;
		};

		for (let i = 0; i < count; i++) {
			positions[i * 3] = (rand() - 0.5) * 9;
			positions[i * 3 + 1] = 0;
			positions[i * 3 + 2] = (rand() - 0.5) * 4 - 0.5;
			speeds[i] = 0.4 + rand() * 1.5;
			seeds[i] = rand();
			scales[i] = 0.5 + rand() * 1.6;
		}

		const geo = new THREE.BufferGeometry();
		geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geo.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
		geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
		geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
		return geo;
	}, [count]);

	useEffect(() => () => geometry.dispose(), [geometry]);

	const uniforms = useMemo(
		() => ({
			uTime: { value: still ? 6.2 : 0 },
			uPixelRatio: { value: 1 },
			uSpan: { value: 3.6 },
			uFade: { value: 1 },
			uColor: { value: new THREE.Color('#e08a38') },
		}),
		[still],
	);

	useFrame((state) => {
		const material = points.current?.material as THREE.ShaderMaterial | undefined;
		if (!material) return;

		material.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
		material.uniforms.uFade.value = 1 - scrollRef.current * 0.9;
		if (!still) material.uniforms.uTime.value = state.clock.elapsedTime;
	});

	return (
		<points ref={points} geometry={geometry} frustumCulled={false}>
			<shaderMaterial
				vertexShader={VERTEX}
				fragmentShader={FRAGMENT}
				uniforms={uniforms}
				transparent
				depthWrite={false}
				blending={THREE.AdditiveBlending}
				toneMapped={false}
			/>
		</points>
	);
}

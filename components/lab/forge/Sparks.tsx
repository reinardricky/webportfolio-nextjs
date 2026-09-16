'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { makeRandom } from '@/lib/prng';

type Props = {
	count: number;
	scrollRef: React.RefObject<number>;
	still?: boolean;
};

/** Sparks thrown off the mass — fast, short-lived, additive. */
export default function Sparks({ count, scrollRef, still = false }: Props) {
	const points = useRef<THREE.Points>(null);

	const geometry = useMemo(() => {
		const rand = makeRandom(3_301_977);
		const position = new Float32Array(count * 3);
		const seed = new Float32Array(count);
		const speed = new Float32Array(count);
		const drift = new Float32Array(count);

		for (let i = 0; i < count; i++) {
			const angle = rand() * Math.PI * 2;
			const radius = 0.6 + rand() * 2.4;
			position[i * 3] = Math.cos(angle) * radius;
			position[i * 3 + 1] = -1.4;
			position[i * 3 + 2] = Math.sin(angle) * radius * 0.5;
			seed[i] = rand();
			speed[i] = 0.5 + rand() * 1.8;
			drift[i] = (rand() - 0.5) * 1.6;
		}

		const geo = new THREE.BufferGeometry();
		geo.setAttribute('position', new THREE.BufferAttribute(position, 3));
		geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
		geo.setAttribute('aSpeed', new THREE.BufferAttribute(speed, 1));
		geo.setAttribute('aDrift', new THREE.BufferAttribute(drift, 1));
		return geo;
	}, [count]);

	useEffect(() => () => geometry.dispose(), [geometry]);

	const uniforms = useMemo(
		() => ({
			uTime: { value: still ? 4.7 : 0 },
			uPixelRatio: { value: 1 },
			uFade: { value: 1 },
			uHot: { value: new THREE.Color('#ff7a26') },
			uWhite: { value: new THREE.Color('#ffe9c4') },
		}),
		[still],
	);

	useFrame((state) => {
		const material = points.current?.material as THREE.ShaderMaterial | undefined;
		if (!material) return;
		if (!still) material.uniforms.uTime.value = state.clock.elapsedTime;
		material.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
		material.uniforms.uFade.value = 1 - scrollRef.current * 0.9;
	});

	return (
		<points ref={points} geometry={geometry} frustumCulled={false}>
			<shaderMaterial
				transparent
				depthWrite={false}
				blending={THREE.AdditiveBlending}
				toneMapped={false}
				uniforms={uniforms}
				vertexShader={/* glsl */ `
					uniform float uTime;
					uniform float uPixelRatio;
					attribute float aSeed;
					attribute float aSpeed;
					attribute float aDrift;
					varying float vLife;

					void main() {
						vec3 pos = position;
						float life = fract(uTime * aSpeed * 0.16 + aSeed);
						// Rise fast, then slow — sparks lose momentum.
						pos.y += pow(life, 0.62) * 5.2;
						pos.x += aDrift * life * 1.3;

						vLife = life;
						vec4 mv = modelViewMatrix * vec4(pos, 1.0);
						gl_Position = projectionMatrix * mv;
						gl_PointSize = (1.0 + aSeed * 2.4) * uPixelRatio * (46.0 / max(-mv.z, 0.1));
					}
				`}
				fragmentShader={/* glsl */ `
					uniform vec3 uHot;
					uniform vec3 uWhite;
					uniform float uFade;
					varying float vLife;

					void main() {
						float d = length(gl_PointCoord - 0.5) * 2.0;
						float shape = pow(max(0.0, 1.0 - d), 2.2);
						// Cool from white to orange, then die out.
						float a = shape * (1.0 - smoothstep(0.35, 1.0, vLife)) * uFade;
						if (a < 0.002) discard;
						gl_FragColor = vec4(mix(uWhite, uHot, smoothstep(0.0, 0.45, vLife)), a);
					}
				`}
			/>
		</points>
	);
}

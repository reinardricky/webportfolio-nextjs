'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { SIMPLEX_3D } from '@/components/three/glsl';
import type { SceneState } from '@/components/three/SceneHost';

const VERTEX = /* glsl */ `
uniform float uTime;
varying float vH;
varying vec2 vUv;

${SIMPLEX_3D}

void main() {
  vUv = uv;
  vec3 pos = position;
  // Terrain drifts very slowly, so contours crawl rather than sit still.
  float h = fbm(vec3(position.xy * 0.62, uTime * 0.03));
  pos.z += h * 0.72;
  vH = h;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
uniform vec3 uGround;
uniform vec3 uContour;
uniform vec3 uIndex;
uniform float uFade;
varying float vH;
varying vec2 vUv;

void main() {
  // Contours every 1/12 of elevation; every 4th is an index contour,
  // drawn heavier — the convention on a real survey sheet.
  float lines = 12.0;
  float band = vH * lines;
  float edge = abs(fract(band) - 0.5) * 2.0;

  float thin = 1.0 - smoothstep(0.80, 0.96, edge);
  float isIndex = step(0.75, abs(fract(band * 0.25) - 0.5) * 2.0);
  float thick = (1.0 - smoothstep(0.62, 0.9, edge)) * isIndex;

  vec3 col = uGround;
  col = mix(col, uContour, thin * 0.85);
  col = mix(col, uIndex, thick);

  // Fade the sheet out at its edges so it reads as a plate, not a plane.
  float vignette = smoothstep(0.02, 0.28, min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y)));
  float alpha = (thin * 0.5 + thick * 0.6 + 0.12) * vignette * uFade;

  gl_FragColor = vec4(col, alpha);
}
`;

export default function Terrain({ scrollRef, pointerRef, still, segments }: SceneState & { segments: number }) {
	const mesh = useRef<THREE.Mesh>(null);
	const geometry = useMemo(
		() => new THREE.PlaneGeometry(6.4, 6.4, segments, segments),
		[segments],
	);
	useEffect(() => () => geometry.dispose(), [geometry]);

	const uniforms = useMemo(
		() => ({
			uTime: { value: still ? 5.5 : 0 },
			uFade: { value: 1 },
			uGround: { value: new THREE.Color('#1c231b') },
			uContour: { value: new THREE.Color('#9aa87e') },
			uIndex: { value: new THREE.Color('#00ffff') },
		}),
		[still],
	);

	useFrame((state, delta) => {
		const material = mesh.current?.material as THREE.ShaderMaterial | undefined;
		if (!material || !mesh.current) return;

		material.uniforms.uFade.value = 1 - scrollRef.current * 0.85;
		if (!still) material.uniforms.uTime.value = state.clock.elapsedTime;

		if (still) {
			mesh.current.rotation.set(-1.02, 0, 0.3);
			return;
		}

		// Laid out like a survey table: tilted away, turning slowly.
		const ptr = pointerRef.current;
		const damp = 1 - Math.pow(0.005, delta);
		mesh.current.rotation.z += delta * 0.035;
		mesh.current.rotation.x = THREE.MathUtils.lerp(
			mesh.current.rotation.x,
			-1.02 + ptr.y * ptr.active * 0.18,
			damp,
		);
	});

	return (
		<mesh ref={mesh} geometry={geometry} rotation={[-1.02, 0, 0]}>
			<shaderMaterial
				vertexShader={VERTEX}
				fragmentShader={FRAGMENT}
				uniforms={uniforms}
				transparent
				depthWrite={false}
				side={THREE.DoubleSide}
				toneMapped={false}
			/>
		</mesh>
	);
}

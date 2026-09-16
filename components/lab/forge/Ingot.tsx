'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { SIMPLEX_3D } from '@/components/lab/glsl';

const VERTEX = /* glsl */ `
uniform float uTime;
varying vec3 vPos;
varying vec3 vNormal;
varying vec3 vView;

${SIMPLEX_3D}

void main() {
  vPos = position;
  // Rough-hewn: displace the sphere so it reads as forged, not moulded.
  float bump = fbm(position * 1.6) * 0.16 + snoise(position * 4.2) * 0.04;
  vec3 pos = position + normal * bump;

  vNormal = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vView = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

const FRAGMENT = /* glsl */ `
uniform float uTime;
uniform float uHeat;
uniform vec3 uIron;
uniform vec3 uIronLit;
uniform vec3 uMolten;
uniform vec3 uWhite;

varying vec3 vPos;
varying vec3 vNormal;
varying vec3 vView;

${SIMPLEX_3D}

void main() {
  // Ridged noise gives thin veins rather than blobs — cooling cracks.
  vec3 p = vPos * 2.4 + vec3(0.0, 0.0, uTime * 0.05);
  float ridge = 1.0 - abs(fbm(p));
  float crack = pow(clamp(ridge, 0.0, 1.0), 14.0);

  // The bellows: the whole mass brightens and dims, slightly out of phase
  // with a faster flicker so it never feels like a plain sine.
  float bellows = 0.55 + 0.45 * sin(uTime * 0.85);
  float flicker = 0.9 + 0.1 * sin(uTime * 7.3 + vPos.y * 4.0);
  float heat = uHeat * bellows * flicker;

  float fres = pow(1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0), 2.5);

  vec3 iron = mix(uIron, uIronLit, fres * 0.8);
  vec3 vein = mix(uMolten, uWhite, crack * heat);

  vec3 col = iron + vein * crack * (0.7 + heat * 1.6);
  col += uMolten * fres * heat * 0.45;

  gl_FragColor = vec4(col, 1.0);
}
`;

type Props = {
	scrollRef: React.RefObject<number>;
	pointerRef: React.RefObject<{ x: number; y: number; active: number }>;
	still?: boolean;
};

export default function Ingot({ scrollRef, pointerRef, still = false }: Props) {
	const mesh = useRef<THREE.Mesh>(null);
	const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.55, 48), []);
	useEffect(() => () => geometry.dispose(), [geometry]);

	const uniforms = useMemo(
		() => ({
			uTime: { value: still ? 2.1 : 0 },
			uHeat: { value: 0.75 },
			uIron: { value: new THREE.Color('#15120f') },
			uIronLit: { value: new THREE.Color('#4a4038') },
			uMolten: { value: new THREE.Color('#ff5a0a') },
			uWhite: { value: new THREE.Color('#ffe3b0') },
		}),
		[still],
	);

	useFrame((state, delta) => {
		const material = mesh.current?.material as THREE.ShaderMaterial | undefined;
		if (!material || !mesh.current) return;

		if (!still) material.uniforms.uTime.value = state.clock.elapsedTime;

		// The cursor works the bellows: closer to the mass, hotter it runs.
		const ptr = pointerRef.current;
		const proximity = ptr.active
			? 1 - Math.min(1, Math.hypot(ptr.x, ptr.y) / 1.2)
			: 0;
		const target = (0.55 + proximity * 0.85) * (1 - scrollRef.current * 0.6);
		material.uniforms.uHeat.value = THREE.MathUtils.lerp(
			material.uniforms.uHeat.value,
			still ? 0.8 : target,
			still ? 1 : 1 - Math.pow(0.05, delta),
		);

		if (still) {
			mesh.current.rotation.set(0.3, 0.6, 0);
		} else {
			mesh.current.rotation.y += delta * 0.12;
			mesh.current.rotation.x = 0.28 + ptr.y * ptr.active * 0.15;
		}
	});

	return <mesh ref={mesh} geometry={geometry}>
		<shaderMaterial vertexShader={VERTEX} fragmentShader={FRAGMENT} uniforms={uniforms} toneMapped={false} />
	</mesh>;
}

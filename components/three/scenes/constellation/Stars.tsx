'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import type { SceneState } from '@/components/three/SceneHost';
import { makeRandom } from '@/lib/prng';

const R = 2.3;

/**
 * A star chart. Background stars fill the sphere; a handful of them are
 * promoted into named figures and joined with ochre rule lines, the way a
 * chart is drawn rather than the way a sky actually looks.
 */
function build(starCount: number) {
	const rand = makeRandom(9_004_411);

	const pos: number[] = [];
	const seed: number[] = [];
	const bright: number[] = [];

	// Background field on a shell.
	for (let i = 0; i < starCount; i++) {
		const u = rand() * 2 - 1;
		const theta = rand() * Math.PI * 2;
		const ring = Math.sqrt(Math.max(0, 1 - u * u));
		const r = R * (0.94 + rand() * 0.1);
		pos.push(Math.cos(theta) * ring * r, u * r, Math.sin(theta) * ring * r);
		seed.push(rand());
		bright.push(0);
	}

	// Figures: pick a seed direction, then walk a short chain near it.
	const lines: number[] = [];
	const nodes: number[] = [];
	const figures = 7;

	for (let f = 0; f < figures; f++) {
		const baseU = rand() * 1.5 - 0.75;
		const baseTheta = rand() * Math.PI * 2;
		const chain = 4 + Math.floor(rand() * 3);

		let prev: [number, number, number] | null = null;
		for (let n = 0; n < chain; n++) {
			const u = THREE.MathUtils.clamp(baseU + (rand() - 0.5) * 0.42, -0.95, 0.95);
			const theta = baseTheta + (rand() - 0.5) * 0.85;
			const ring = Math.sqrt(Math.max(0, 1 - u * u));
			const p: [number, number, number] = [
				Math.cos(theta) * ring * R,
				u * R,
				Math.sin(theta) * ring * R,
			];

			nodes.push(...p);
			if (prev) lines.push(...prev, ...p);
			prev = p;
		}
	}

	const field = new THREE.BufferGeometry();
	field.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
	field.setAttribute('aSeed', new THREE.Float32BufferAttribute(seed, 1));
	field.setAttribute('aBright', new THREE.Float32BufferAttribute(bright, 1));

	const figure = new THREE.BufferGeometry();
	figure.setAttribute('position', new THREE.Float32BufferAttribute(lines, 3));

	const nodeGeo = new THREE.BufferGeometry();
	nodeGeo.setAttribute('position', new THREE.Float32BufferAttribute(nodes, 3));
	nodeGeo.setAttribute(
		'aSeed',
		new THREE.Float32BufferAttribute(nodes.map((_, i) => ((i * 37) % 100) / 100).slice(0, nodes.length / 3), 1),
	);
	nodeGeo.setAttribute(
		'aBright',
		new THREE.Float32BufferAttribute(new Array(nodes.length / 3).fill(1), 1),
	);

	// One great circle, for the chart's horizon rule.
	const ringPts: number[] = [];
	const segments = 128;
	for (let i = 0; i <= segments; i++) {
		const a = (i / segments) * Math.PI * 2;
		ringPts.push(Math.cos(a) * R * 1.06, 0, Math.sin(a) * R * 1.06);
	}
	const ringGeo = new THREE.BufferGeometry();
	ringGeo.setAttribute('position', new THREE.Float32BufferAttribute(ringPts, 3));

	return { field, figure, nodeGeo, ringGeo };
}

const STAR_VERT = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
attribute float aSeed;
attribute float aBright;
varying float vTwinkle;
varying float vBright;

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  vTwinkle = 0.45 + 0.55 * sin(uTime * 0.9 + aSeed * 42.0);
  vBright = aBright;
  gl_PointSize = (1.2 + aSeed * 1.8 + aBright * 3.2) * uPixelRatio * (40.0 / max(-mv.z, 0.1));
}
`;

const STAR_FRAG = /* glsl */ `
uniform vec3 uStar;
uniform vec3 uNode;
uniform float uFade;
varying float vTwinkle;
varying float vBright;

void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float shape = pow(max(0.0, 1.0 - d), 2.3);
  float a = shape * (0.25 + vTwinkle * 0.5 + vBright * 0.5) * uFade;
  if (a < 0.002) discard;
  gl_FragColor = vec4(mix(uStar, uNode, vBright), a);
}
`;

export default function Stars({ scrollRef, pointerRef, still, count }: SceneState & { count: number }) {
	const group = useRef<THREE.Group>(null);
	const field = useRef<THREE.Points>(null);
	const nodes = useRef<THREE.Points>(null);

	const geo = useMemo(() => build(count), [count]);
	useEffect(
		() => () => {
			geo.field.dispose();
			geo.figure.dispose();
			geo.nodeGeo.dispose();
			geo.ringGeo.dispose();
		},
		[geo],
	);

	const starUniforms = useMemo(
		() => ({
			uTime: { value: still ? 2.4 : 0 },
			uPixelRatio: { value: 1 },
			uFade: { value: 1 },
			uStar: { value: new THREE.Color('#ece9dd') },
			uNode: { value: new THREE.Color('#80ffff') },
		}),
		[still],
	);

	const nodeUniforms = useMemo(
		() => ({
			uTime: { value: still ? 2.4 : 0 },
			uPixelRatio: { value: 1 },
			uFade: { value: 1 },
			uStar: { value: new THREE.Color('#ece9dd') },
			uNode: { value: new THREE.Color('#80ffff') },
		}),
		[still],
	);

	useFrame((state, delta) => {
		const fade = 1 - scrollRef.current * 0.8;

		for (const ref of [field, nodes]) {
			const material = ref.current?.material as THREE.ShaderMaterial | undefined;
			if (!material) continue;
			material.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
			material.uniforms.uFade.value = fade;
			if (!still) material.uniforms.uTime.value = state.clock.elapsedTime;
		}

		if (!group.current) return;
		if (still) {
			group.current.rotation.set(0.3, 0.6, 0.12);
			return;
		}

		const ptr = pointerRef.current;
		group.current.rotation.y += delta * 0.045;
		group.current.rotation.x = THREE.MathUtils.lerp(
			group.current.rotation.x,
			0.24 + ptr.y * ptr.active * 0.22,
			1 - Math.pow(0.005, delta),
		);
		group.current.rotation.z = 0.12;
	});

	return (
		<group ref={group} rotation={[0.24, 0, 0.12]}>
			<points ref={field} geometry={geo.field} frustumCulled={false}>
				<shaderMaterial
					vertexShader={STAR_VERT}
					fragmentShader={STAR_FRAG}
					uniforms={starUniforms}
					transparent
					depthWrite={false}
					toneMapped={false}
				/>
			</points>

			<lineSegments geometry={geo.figure}>
				<lineBasicMaterial color="#00ffff" transparent opacity={0.4} depthWrite={false} toneMapped={false} />
			</lineSegments>

			<points ref={nodes} geometry={geo.nodeGeo} frustumCulled={false}>
				<shaderMaterial
					vertexShader={STAR_VERT}
					fragmentShader={STAR_FRAG}
					uniforms={nodeUniforms}
					transparent
					depthWrite={false}
					toneMapped={false}
				/>
			</points>

			<line>
				<primitive object={geo.ringGeo} attach="geometry" />
				<lineBasicMaterial color="#9aa87e" transparent opacity={0.22} depthWrite={false} toneMapped={false} />
			</line>
		</group>
	);
}

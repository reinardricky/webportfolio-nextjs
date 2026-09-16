'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import { makeRandom } from '@/lib/prng';

type Segment = {
	a: THREE.Vector3;
	b: THREE.Vector3;
	/** Path distance from the root, normalised — drives the sap pulse. */
	d0: number;
	d1: number;
	depth: number;
};

/** Recursive branching. Crown grows up, roots mirror it downward. */
function grow(
	rand: () => number,
	out: Segment[],
	tips: THREE.Vector3[],
	start: THREE.Vector3,
	dir: THREE.Vector3,
	length: number,
	depth: number,
	maxDepth: number,
	travelled: number,
) {
	const end = start.clone().addScaledVector(dir, length);
	out.push({ a: start, b: end, d0: travelled, d1: travelled + length, depth });

	if (depth >= maxDepth) {
		tips.push(end);
		return;
	}

	const children = depth < 2 ? 3 : 2;
	for (let i = 0; i < children; i++) {
		// A perpendicular axis, then a spread that narrows with depth.
		const axis = new THREE.Vector3(rand() - 0.5, rand() - 0.5, rand() - 0.5)
			.cross(dir)
			.normalize();
		const spread = THREE.MathUtils.lerp(0.62, 0.3, depth / maxDepth);
		const next = dir
			.clone()
			.applyAxisAngle(axis, (rand() - 0.5) * 2 * spread)
			.normalize();

		grow(
			rand,
			out,
			tips,
			end,
			next,
			length * (0.68 + rand() * 0.12),
			depth + 1,
			maxDepth,
			travelled + length,
		);
	}
}

const VERTEX = /* glsl */ `
uniform float uTime;
uniform float uSway;
attribute float aDist;
attribute float aDepth;
varying float vDist;
varying float vDepth;

void main() {
  vec3 pos = position;
  // Thinner, higher branches sway more — the trunk barely moves.
  float amp = uSway * pow(aDepth, 1.6) * 0.05;
  pos.x += sin(uTime * 0.6 + pos.y * 1.4 + aDepth * 2.0) * amp;
  pos.z += cos(uTime * 0.45 + pos.y * 1.1 + aDepth * 3.0) * amp * 0.7;

  vDist = aDist;
  vDepth = aDepth;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const FRAGMENT = /* glsl */ `
uniform float uTime;
uniform vec3 uBark;
uniform vec3 uSap;
uniform float uFade;
varying float vDist;
varying float vDepth;

void main() {
  // Sap: a narrow bright band travelling outward along every path.
  float flow = fract(vDist * 1.6 - uTime * 0.22);
  float pulse = smoothstep(0.80, 0.99, flow) * (0.35 + vDepth * 0.65);

  vec3 col = mix(uBark, uSap, pulse);
  float alpha = (0.28 + vDepth * 0.5 + pulse * 0.55) * uFade;

  gl_FragColor = vec4(col, alpha);
}
`;

type Props = {
	scrollRef: React.RefObject<number>;
	pointerRef: React.RefObject<{ x: number; y: number; active: number }>;
	still?: boolean;
};

export default function Tree({ scrollRef, pointerRef, still = false }: Props) {
	const group = useRef<THREE.Group>(null);
	const lines = useRef<THREE.LineSegments>(null);
	const leaves = useRef<THREE.Points>(null);

	const { lineGeo, leafGeo } = useMemo(() => {
		const rand = makeRandom(4_812_255);
		const segments: Segment[] = [];
		const tips: THREE.Vector3[] = [];

		// Crown.
		grow(rand, segments, tips, new THREE.Vector3(0, -1.5, 0), new THREE.Vector3(0, 1, 0), 1.15, 0, 6, 0);
		// Roots: shorter, wider, reaching down.
		grow(rand, segments, tips, new THREE.Vector3(0, -1.5, 0), new THREE.Vector3(0, -1, 0), 0.72, 0, 4, 0);

		const maxDist = segments.reduce((m, s) => Math.max(m, s.d1), 1);
		const maxDepth = segments.reduce((m, s) => Math.max(m, s.depth), 1);

		const positions: number[] = [];
		const dists: number[] = [];
		const depths: number[] = [];

		for (const seg of segments) {
			positions.push(seg.a.x, seg.a.y, seg.a.z, seg.b.x, seg.b.y, seg.b.z);
			dists.push(seg.d0 / maxDist, seg.d1 / maxDist);
			const d = seg.depth / maxDepth;
			depths.push(d, d);
		}

		const lineGeo = new THREE.BufferGeometry();
		lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
		lineGeo.setAttribute('aDist', new THREE.Float32BufferAttribute(dists, 1));
		lineGeo.setAttribute('aDepth', new THREE.Float32BufferAttribute(depths, 1));

		const leafPos: number[] = [];
		const leafSeed: number[] = [];
		for (const tip of tips) {
			leafPos.push(tip.x, tip.y, tip.z);
			leafSeed.push(rand());
		}
		const leafGeo = new THREE.BufferGeometry();
		leafGeo.setAttribute('position', new THREE.Float32BufferAttribute(leafPos, 3));
		leafGeo.setAttribute('aSeed', new THREE.Float32BufferAttribute(leafSeed, 1));

		return { lineGeo, leafGeo };
	}, []);

	useEffect(
		() => () => {
			lineGeo.dispose();
			leafGeo.dispose();
		},
		[lineGeo, leafGeo],
	);

	const lineUniforms = useMemo(
		() => ({
			uTime: { value: still ? 3.4 : 0 },
			uSway: { value: still ? 0 : 1 },
			uFade: { value: 1 },
			uBark: { value: new THREE.Color('#8a6a34') },
			uSap: { value: new THREE.Color('#7fe3b4') },
		}),
		[still],
	);

	const leafUniforms = useMemo(
		() => ({
			uTime: { value: still ? 3.4 : 0 },
			uPixelRatio: { value: 1 },
			uFade: { value: 1 },
			uColor: { value: new THREE.Color('#9dffcf') },
		}),
		[still],
	);

	useFrame((state, delta) => {
		const t = state.clock.elapsedTime;
		const scroll = scrollRef.current;
		const fade = 1 - scroll * 0.75;

		const lineMat = lines.current?.material as THREE.ShaderMaterial | undefined;
		if (lineMat) {
			if (!still) lineMat.uniforms.uTime.value = t;
			lineMat.uniforms.uFade.value = fade;
		}

		const leafMat = leaves.current?.material as THREE.ShaderMaterial | undefined;
		if (leafMat) {
			if (!still) leafMat.uniforms.uTime.value = t;
			leafMat.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
			leafMat.uniforms.uFade.value = fade;
		}

		if (group.current) {
			if (still) {
				group.current.rotation.set(0, 0.35, 0);
			} else {
				const ptr = pointerRef.current;
				const damp = 1 - Math.pow(0.006, delta);
				group.current.rotation.y = THREE.MathUtils.lerp(
					group.current.rotation.y,
					0.35 + ptr.x * ptr.active * 0.4,
					damp,
				);
				group.current.rotation.x = THREE.MathUtils.lerp(
					group.current.rotation.x,
					ptr.y * ptr.active * 0.12,
					damp,
				);
			}
			// Scrolling sinks the view toward the roots.
			group.current.position.y = scroll * 1.6;
		}
	});

	return (
		<group ref={group}>
			<lineSegments ref={lines} geometry={lineGeo} frustumCulled={false}>
				<shaderMaterial
					vertexShader={VERTEX}
					fragmentShader={FRAGMENT}
					uniforms={lineUniforms}
					transparent
					depthWrite={false}
					blending={THREE.AdditiveBlending}
					toneMapped={false}
				/>
			</lineSegments>

			<points ref={leaves} geometry={leafGeo} frustumCulled={false}>
				<shaderMaterial
					transparent
					depthWrite={false}
					blending={THREE.AdditiveBlending}
					toneMapped={false}
					uniforms={leafUniforms}
					vertexShader={/* glsl */ `
						uniform float uTime;
						uniform float uPixelRatio;
						attribute float aSeed;
						varying float vTwinkle;
						void main() {
							vTwinkle = 0.45 + 0.55 * sin(uTime * 1.4 + aSeed * 40.0);
							vec4 mv = modelViewMatrix * vec4(position, 1.0);
							gl_Position = projectionMatrix * mv;
							gl_PointSize = (7.0 + aSeed * 9.0) * uPixelRatio * (1.0 / max(-mv.z, 0.1)) * 6.0;
						}
					`}
					fragmentShader={/* glsl */ `
						uniform vec3 uColor;
						uniform float uFade;
						varying float vTwinkle;
						void main() {
							float d = length(gl_PointCoord - 0.5) * 2.0;
							float a = pow(max(0.0, 1.0 - d), 2.6) * vTwinkle * uFade;
							if (a < 0.002) discard;
							gl_FragColor = vec4(uColor, a);
						}
					`}
				/>
			</points>
		</group>
	);
}

'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import type { SceneState } from '@/components/three/SceneHost';
import { makeRandom } from '@/lib/prng';
import { RUNES } from '@/lib/runes';

const W = 1.35;
const H = 2.85;
const D = 0.4;

/**
 * A photogrammetry-style scan of the stone: surface samples rather than a
 * solid. The runes are sampled too, so the inscription resolves out of the
 * cloud as the scan plane passes over it.
 */
function build(count: number) {
	const rand = makeRandom(5_512_009);
	const pos: number[] = [];
	const seed: number[] = [];
	const isRune: number[] = [];

	const push = (x: number, y: number, z: number, rune: number) => {
		// Weathering jitter so no face is perfectly flat.
		pos.push(x + (rand() - 0.5) * 0.035, y + (rand() - 0.5) * 0.035, z + (rand() - 0.5) * 0.035);
		seed.push(rand());
		isRune.push(rune);
	};

	// Shell samples, weighted to the two broad faces.
	for (let i = 0; i < count; i++) {
		const face = rand();
		const u = rand() - 0.5;
		const v = rand() - 0.5;
		if (face < 0.38) push(u * W, v * H, D / 2, 0);
		else if (face < 0.76) push(u * W, v * H, -D / 2, 0);
		else if (face < 0.88) push((rand() < 0.5 ? -1 : 1) * (W / 2), v * H, u * D, 0);
		else push(u * W, (rand() < 0.5 ? -1 : 1) * (H / 2), v * D, 0);
	}

	// The inscription: three vertical bands, densely sampled along strokes.
	const columns = 3;
	const perColumn = 9;
	const colW = W / (columns + 0.6);
	const glyphH = (H * 0.76) / perColumn;
	const glyphW = colW * 0.46;

	for (let c = 0; c < columns; c++) {
		const cx = -W / 2 + colW * (c + 0.8);
		for (let r = 0; r < perColumn; r++) {
			const rune = RUNES[Math.floor(rand() * RUNES.length) % RUNES.length];
			const cy = H * 0.38 - r * glyphH;

			for (const [x1, y1, x2, y2] of rune.strokes) {
				const ax = cx + (x1 - 0.5) * glyphW;
				const ay = cy + (y1 - 0.5) * glyphH * 0.62;
				const bx = cx + (x2 - 0.5) * glyphW;
				const by = cy + (y2 - 0.5) * glyphH * 0.62;
				const steps = 9;
				for (let s = 0; s <= steps; s++) {
					const t = s / steps;
					// Slightly recessed — these are cut into the face.
					push(ax + (bx - ax) * t, ay + (by - ay) * t, D / 2 - 0.03, 1);
				}
			}
		}
	}

	const geo = new THREE.BufferGeometry();
	geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
	geo.setAttribute('aSeed', new THREE.Float32BufferAttribute(seed, 1));
	geo.setAttribute('aRune', new THREE.Float32BufferAttribute(isRune, 1));
	return geo;
}

const VERTEX = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform float uScanY;
attribute float aSeed;
attribute float aRune;
varying float vScan;
varying float vRune;
varying float vDepth;

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;

  // Bright band where the scan plane is currently passing.
  vScan = 1.0 - smoothstep(0.0, 0.26, abs(position.y - uScanY));
  vRune = aRune;
  vDepth = clamp((-mv.z - 3.2) / 3.2, 0.0, 1.0);

  float size = mix(1.5, 2.6, aRune) + vScan * 3.4 + aSeed * 0.8;
  gl_PointSize = size * uPixelRatio * (34.0 / max(-mv.z, 0.1));
}
`;

const FRAGMENT = /* glsl */ `
uniform vec3 uStone;
uniform vec3 uOchre;
uniform vec3 uFlash;
uniform float uFade;
varying float vScan;
varying float vRune;
varying float vDepth;

void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float shape = 1.0 - smoothstep(0.55, 1.0, d);
  if (shape < 0.01) discard;

  vec3 col = mix(uStone, uOchre, vRune);
  col = mix(col, uFlash, vScan * 0.85);

  float alpha = shape * (0.3 + vRune * 0.35 + vScan * 0.55);
  alpha *= (1.0 - vDepth * 0.55) * uFade;

  gl_FragColor = vec4(col, alpha);
}
`;

export default function ScanPoints({ scrollRef, pointerRef, still, count }: SceneState & { count: number }) {
	const points = useRef<THREE.Points>(null);
	const geometry = useMemo(() => build(count), [count]);
	useEffect(() => () => geometry.dispose(), [geometry]);

	const uniforms = useMemo(
		() => ({
			uTime: { value: 0 },
			uPixelRatio: { value: 1 },
			uScanY: { value: still ? 0.35 : -H / 2 },
			uFade: { value: 1 },
			uStone: { value: new THREE.Color('#cdcbba') },
			uOchre: { value: new THREE.Color('#00ffff') },
			uFlash: { value: new THREE.Color('#fff4e2') },
		}),
		[still],
	);

	useFrame((state, delta) => {
		const material = points.current?.material as THREE.ShaderMaterial | undefined;
		if (!material || !points.current) return;

		material.uniforms.uPixelRatio.value = state.gl.getPixelRatio();
		material.uniforms.uFade.value = 1 - scrollRef.current * 0.8;

		if (still) {
			points.current.rotation.set(0, -0.5, 0);
			return;
		}

		const t = state.clock.elapsedTime;
		material.uniforms.uTime.value = t;
		// Scan sweeps bottom to top on a 6s cycle, then repeats.
		material.uniforms.uScanY.value = (((t * 0.17) % 1) - 0.5) * (H + 0.5);

		const ptr = pointerRef.current;
		points.current.rotation.y += delta * 0.18;
		points.current.rotation.x = THREE.MathUtils.lerp(
			points.current.rotation.x,
			ptr.y * ptr.active * 0.2,
			1 - Math.pow(0.005, delta),
		);
	});

	return (
		<points ref={points} geometry={geometry} frustumCulled={false}>
			<shaderMaterial
				vertexShader={VERTEX}
				fragmentShader={FRAGMENT}
				uniforms={uniforms}
				transparent
				depthWrite={false}
				toneMapped={false}
			/>
		</points>
	);
}

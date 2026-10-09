'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

import type { SceneState } from '@/components/three/SceneHost';
import { makeRandom } from '@/lib/prng';
import { createAlbedo, createBump, createGlow, type Inscription } from './stoneTexture';

const W = 1.36;
const H = 2.9;
const D = 0.5;

/** Smooth undulation plus ridged chips — weathered granite, not a pebble. */
function weather(x: number, y: number, z: number) {
	const swell = Math.sin(x * 3.1 + y * 1.7) * Math.sin(y * 2.3 - z * 4.1) * 0.6;
	const chips = (1 - Math.abs(Math.sin(x * 6.1 - y * 4.3 + z * 2.2))) * 0.35;
	const grain = Math.sin(x * 13.0 + y * 9.0) * Math.sin(y * 11.0 - z * 7.0) * 0.12;
	return swell + chips + grain;
}

/**
 * A raised stone in the Viking-age manner: no arch, no parallel sides.
 * The head slants up to a peak right of centre, the left flank tapers
 * more than the right, and the foot flares where it goes into the
 * ground. Every displacement is a pure function of the original
 * position, so the box's duplicated edge vertices move together and
 * the faces stay sealed.
 */
function buildGeometry() {
	const geo = new THREE.BoxGeometry(W, H, D, 30, 56, 8);
	const p = geo.attributes.position;

	for (let i = 0; i < p.count; i++) {
		const x0 = p.getX(i);
		const y0 = p.getY(i);
		const z0 = p.getZ(i);
		// Clamped: float error can land a hair below 0, and pow() of that is NaN.
		const t = THREE.MathUtils.clamp(y0 / H + 0.5, 0, 1); // 0 at the foot, 1 at the head
		const u = x0 / W + 0.5; // 0 on the left flank, 1 on the right
		const nx = x0 / (W / 2);

		// Each flank has its own profile; the foot flares on both.
		const flare = 0.16 * Math.pow(Math.max(0, 1 - t / 0.22), 2);
		const leftEdge = -(0.5 + 0.07 * Math.sin(t * Math.PI * 0.9 + 0.3) - 0.2 * Math.pow(t, 2.4) + flare);
		const rightEdge = 0.52 + 0.05 * Math.sin(t * Math.PI * 1.15) - 0.1 * Math.pow(t, 3) + flare * 0.8;
		let x = (leftEdge + (rightEdge - leftEdge) * u) * W;

		// Slanted head peaking right of centre, with a chipped notch on the left shoulder.
		const head = THREE.MathUtils.smoothstep(t, 0.5, 1);
		const slope = -1.05 * Math.pow(u - 0.64, 2) - 0.07 * Math.exp(-Math.pow((u - 0.24) / 0.07, 2));
		// Uneven foot, so it never sits on a ruled line.
		const foot = Math.pow(1 - t, 5) * Math.sin(u * 9.0 + 1.3) * 0.05;
		let y = y0 + slope * head + foot;

		// Thicker at the foot, thinner toward the head, faces bowed outward.
		const swell = (1 + 0.2 * (1 - nx * nx)) * (1.18 - 0.42 * t);
		let z = z0 * swell;

		const n = weather(x0, y0, z0) * 0.03;
		x += Math.sign(x0) * n;
		y += n * 0.35;
		z += Math.sign(z0) * n * 1.5;

		p.setXYZ(i, x, y, z);
	}

	p.needsUpdate = true;
	geo.computeVertexNormals();
	return geo;
}

/** Loose stones heaped round the foot, the way a raised stone is packed in. */
function buildRubble() {
	const rand = makeRandom(8_120_447);
	const count = 12;
	return Array.from({ length: count }, (_, i) => {
		const geo = new THREE.IcosahedronGeometry(1, 3);
		const p = geo.attributes.position;
		for (let k = 0; k < p.count; k++) {
			const f = 1 + (weather(p.getX(k) * 2, p.getY(k) * 2, p.getZ(k) * 2) - 0.2) * 0.32;
			p.setXYZ(k, p.getX(k) * f, p.getY(k) * f * 0.6, p.getZ(k) * f);
		}
		geo.computeVertexNormals();

		// Spread along the foot; most sit in front, so the base never shows a clean edge.
		const r = 0.06 + rand() * 0.11;
		const x = -0.8 + (1.6 * (i + rand() * 0.6)) / count;
		const front = i % 3 !== 0;
		return {
			geo,
			scale: r,
			position: [x, -H / 2 + r * 0.2, front ? 0.22 + rand() * 0.3 : -0.25 - rand() * 0.2] as [
				number,
				number,
				number,
			],
			rotation: [rand() * 3, rand() * 3, rand() * 3] as [number, number, number],
		};
	});
}

const easeOut = (x: number) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);

/** Seconds: the stone rises, then the inscription lights head to foot. */
const RISE = 1.8;
const IGNITE_AT = 1.1;
const IGNITE = 2.2;

/** Radians per full host-width of drag: one sweep across turns it ~290°. */
const DRAG_TURN = Math.PI * 1.6;
/** Fraction of fling speed left after one second of coasting. */
const FRICTION = 0.06;
const MAX_SPIN = 16;
/** Seconds untouched before the stone eases its face back to the front. */
const SETTLE_AFTER = 1.4;
const TAU = Math.PI * 2;

export default function Monolith({
	scrollRef,
	pointerRef,
	dragRef,
	still,
	inscription,
}: SceneState & { inscription: Inscription }) {
	const group = useRef<THREE.Group>(null);
	const front = useRef<THREE.MeshStandardMaterial>(null);
	const wash = useRef<THREE.PointLight>(null);
	const born = useRef<number | null>(null);
	// Shared with the face shader: how far down the face the glow has reached.
	const reveal = useRef({ value: 0 });
	// The ambient pose, eased; the visitor's spin and tilt ride on top undamped.
	const pose = useRef({ x: 0, y: -0.28 });
	const spin = useRef({ angle: 0, vel: 0, tilt: 0, idle: SETTLE_AFTER, flare: 0, taps: 0 });

	const geometry = useMemo(() => buildGeometry(), []);
	const rubble = useMemo(() => buildRubble(), []);
	const textures = useMemo(
		() => ({
			faceMap: createAlbedo(inscription),
			faceBump: createBump(inscription),
			glow: createGlow(inscription),
			plainMap: createAlbedo(),
			plainBump: createBump(),
		}),
		[inscription],
	);

	useEffect(
		() => () => {
			geometry.dispose();
			rubble.forEach((r) => r.geo.dispose());
			Object.values(textures).forEach((t) => t.dispose());
		},
		[geometry, rubble, textures],
	);

	useFrame((state, delta) => {
		const g = group.current;
		if (!g) return;

		if (still) {
			g.rotation.set(0.02, -0.32, 0);
			g.position.y = 0;
			reveal.current.value = 1.2;
			if (wash.current) wash.current.intensity = 1.4;
			return;
		}

		const t = state.clock.elapsedTime;
		born.current ??= t;
		const age = t - born.current;
		const rise = easeOut(age / RISE);
		const lit = easeOut((age - IGNITE_AT) / IGNITE);
		reveal.current.value = lit * 1.15;

		const ptr = pointerRef.current;
		const damp = 1 - Math.pow(0.02, delta);
		const s = spin.current;
		const drag = dragRef.current;
		const dt = Math.max(delta, 1 / 240);

		if (drag.held) {
			// Grabbed: the stone follows the hand exactly, and the hand's speed
			// is remembered (smoothed — pointer events don't land every frame).
			const step = drag.dx * DRAG_TURN;
			s.angle += step;
			s.vel = THREE.MathUtils.lerp(s.vel, step / dt, 0.5);
			s.tilt = THREE.MathUtils.clamp(s.tilt + drag.dy * 1.4, -0.3, 0.3);
			s.idle = 0;
		} else {
			// Released: coast on the fling, then come round to the nearest
			// full turn so the inscription faces front again.
			s.angle += s.vel * dt;
			s.vel *= Math.pow(FRICTION, dt);
			s.idle += dt;
			if (s.idle > SETTLE_AFTER && Math.abs(s.vel) < 0.8) {
				const home = Math.round(s.angle / TAU) * TAU;
				s.angle = THREE.MathUtils.lerp(s.angle, home, 1 - Math.pow(0.2, dt));
				s.vel *= Math.pow(0.02, dt);
			}
			s.tilt = THREE.MathUtils.lerp(s.tilt, 0, 1 - Math.pow(0.04, dt));
		}
		s.vel = THREE.MathUtils.clamp(s.vel, -MAX_SPIN, MAX_SPIN);
		drag.dx = 0;
		drag.dy = 0;

		// A tap strikes the stone: the runes flare and it gives a little.
		if (drag.taps !== s.taps) {
			s.taps = drag.taps;
			s.flare = 1;
			s.vel += (s.vel >= 0 ? 1 : -1) * 1.4;
		}
		s.flare = Math.max(0, s.flare - dt * 0.9);

		// A slow sway rather than a spin, so the inscription stays readable.
		pose.current.y = THREE.MathUtils.lerp(
			pose.current.y,
			-0.28 + Math.sin(t * 0.22) * 0.32 + ptr.x * ptr.active * 0.3,
			damp,
		);
		pose.current.x = THREE.MathUtils.lerp(pose.current.x, -ptr.y * ptr.active * 0.1, damp);
		g.rotation.y = pose.current.y + s.angle;
		g.rotation.x = pose.current.x + s.tilt;
		// Rises out of the ground on arrival, then settles into a slow bob; a strike jolts it.
		const jolt = Math.sin(s.flare * Math.PI) * s.flare * 0.05;
		g.position.y = (1 - rise) * -1.6 + Math.sin(t * 0.5) * 0.035 * rise + jolt - scrollRef.current * 0.6;

		// The pigment breathes, very slightly, once it has lit — and burns
		// hotter while the stone is spun or struck.
		const breath = 0.85 + Math.sin(t * 0.9) * 0.15;
		const charge = Math.min(Math.abs(s.vel) / 10, 1) * 0.7 + s.flare * s.flare * 1.8;
		if (front.current) front.current.emissiveIntensity = breath + charge;
		if (wash.current) wash.current.intensity = lit * 1.4 * (breath + charge);
	});

	return (
		<>
			{/* Warm raking key from the upper left — carving only reads lit from the side. */}
			<directionalLight position={[-4.2, 2.4, 2.2]} intensity={3.1} color="#fff0dc" />
			{/* Ochre rim from behind, separating the silhouette from the dark ground. */}
			<directionalLight position={[2.4, 1.8, -3.4]} intensity={2.6} color="#7fe0e0" />
			<directionalLight position={[2, -2, 3]} intensity={0.25} color="#9aa87e" />
			<ambientLight intensity={0.1} color="#a7b0a4" />

			<group ref={group}>
				{/* A slight lean, as raised stones settle over the centuries. */}
				<group rotation={[0.03, 0, -0.05]}>
					{/* Ochre spill from the lit grooves, washing the face around them. */}
					<pointLight ref={wash} position={[0, 0.3, 0.9]} distance={2.6} decay={1.6} color="#4dffff" intensity={0} />
					<mesh geometry={geometry}>
						{/* BoxGeometry groups: +x, -x, +y, -y, +z (face), -z */}
						<meshStandardMaterial attach="material-0" {...plainProps(textures)} />
						<meshStandardMaterial attach="material-1" {...plainProps(textures)} />
						<meshStandardMaterial attach="material-2" {...plainProps(textures)} />
						<meshStandardMaterial attach="material-3" {...plainProps(textures)} />
						<meshStandardMaterial
							ref={front}
							attach="material-4"
							map={textures.faceMap}
							bumpMap={textures.faceBump}
							bumpScale={3}
							emissiveMap={textures.glow}
							emissive="#ffffff"
							emissiveIntensity={0.85}
							roughness={0.93}
							metalness={0}
							onBeforeCompile={(shader) => {
								shader.uniforms.uReveal = reveal.current;
								shader.fragmentShader = shader.fragmentShader
									.replace('void main() {', 'uniform float uReveal;\nvoid main() {')
									.replace(
										'#include <emissivemap_fragment>',
										/* glsl */ `#include <emissivemap_fragment>
										// Light the grooves from the head down; v is 1 at the head.
										totalEmissiveRadiance *= 1.0 - smoothstep(uReveal - 0.07, uReveal, 1.0 - vEmissiveMapUv.y);`,
									);
							}}
						/>
						<meshStandardMaterial attach="material-5" {...plainProps(textures)} />
					</mesh>
				</group>

				{rubble.map((r, i) => (
					<mesh key={i} geometry={r.geo} position={r.position} rotation={r.rotation} scale={r.scale}>
						<meshStandardMaterial map={textures.plainMap} color="#8a877d" roughness={1} metalness={0} />
					</mesh>
				))}
			</group>
		</>
	);
}

function plainProps(textures: { plainMap: THREE.Texture; plainBump: THREE.Texture }) {
	return { map: textures.plainMap, bumpMap: textures.plainBump, bumpScale: 1.6, roughness: 0.95, metalness: 0 };
}

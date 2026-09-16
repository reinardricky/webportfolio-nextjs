import * as THREE from 'three';

import { RUNES } from '@/lib/runes';

/**
 * Draws a horizontal strip of Elder Futhark that gets wrapped around a
 * ring, so the strip's x becomes circumference and its y becomes radius.
 * Runes therefore stand upright, pointing out from the centre.
 *
 * The glow is baked here with canvas `shadowBlur` rather than a
 * post-processing bloom pass — one texture upload instead of an extra
 * full-screen render target every frame.
 */
export function createRuneStrip(opts: {
	/** How many runes around the ring. */
	count: number;
	/** Picks which runes appear; same seed always gives the same ring. */
	seed: number;
	/** Hairline rails at the strip edges become concentric circles. */
	rails?: boolean;
	width?: number;
	height?: number;
}): THREE.CanvasTexture {
	const { count, seed, rails = true, width = 2048, height = 256 } = opts;

	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;

	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('2D canvas unavailable');

	ctx.clearRect(0, 0, width, height);
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';

	// Deterministic rune choice — no Math.random, so rings are stable.
	let state = seed;
	const next = () => {
		state = (state * 1664525 + 1013904223) % 4294967296;
		return state / 4294967296;
	};

	const cell = width / count;
	const glyphW = cell * 0.46;
	const glyphH = height * 0.46;
	const top = height * 0.27;
	const stroke = Math.max(2, height * 0.024);

	const paint = (blur: number, alpha: number, lineWidth: number) => {
		ctx.save();
		ctx.globalAlpha = alpha;
		ctx.strokeStyle = '#ffd98a';
		ctx.shadowColor = '#ffb545';
		ctx.shadowBlur = blur;
		ctx.lineWidth = lineWidth;

		// Replay the same PRNG sequence for every pass so passes align.
		state = seed;

		for (let i = 0; i < count; i++) {
			const rune = RUNES[Math.floor(next() * RUNES.length) % RUNES.length];
			const cx = i * cell + cell / 2;

			ctx.beginPath();
			for (const [x1, y1, x2, y2] of rune.strokes) {
				// Rune space has y up; canvas has y down.
				ctx.moveTo(cx + (x1 - 0.5) * glyphW, top + (1 - y1) * glyphH);
				ctx.lineTo(cx + (x2 - 0.5) * glyphW, top + (1 - y2) * glyphH);
			}
			ctx.stroke();
		}

		if (rails) {
			for (const y of [height * 0.07, height * 0.93]) {
				ctx.beginPath();
				ctx.moveTo(0, y);
				ctx.lineTo(width, y);
				ctx.lineWidth = lineWidth * 0.4;
				ctx.stroke();
			}
		}

		ctx.restore();
	};

	// Wide soft halo, then the crisp carve on top.
	paint(height * 0.12, 0.34, stroke * 2.1);
	paint(height * 0.05, 0.75, stroke);

	const texture = new THREE.CanvasTexture(canvas);
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.ClampToEdgeWrapping;
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.needsUpdate = true;
	return texture;
}

/**
 * An annulus whose UVs run around the circumference (u) and outward (v),
 * which is what lets a flat strip texture wrap onto it.
 * THREE.RingGeometry cannot do this — its UVs are planar.
 */
export function createRingGeometry(
	inner: number,
	outer: number,
	segments = 256,
): THREE.BufferGeometry {
	const positions: number[] = [];
	const uvs: number[] = [];
	const indices: number[] = [];

	for (let i = 0; i <= segments; i++) {
		const t = i / segments;
		const angle = t * Math.PI * 2;
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);

		positions.push(cos * inner, sin * inner, 0);
		uvs.push(t, 0);
		positions.push(cos * outer, sin * outer, 0);
		uvs.push(t, 1);
	}

	for (let i = 0; i < segments; i++) {
		const a = i * 2;
		const b = i * 2 + 1;
		const c = i * 2 + 2;
		const d = i * 2 + 3;
		indices.push(a, b, c, b, d, c);
	}

	const geo = new THREE.BufferGeometry();
	geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
	geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
	geo.setIndex(indices);
	return geo;
}

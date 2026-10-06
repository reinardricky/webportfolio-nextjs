import * as THREE from 'three';

import { makeRandom } from '@/lib/prng';
import { RUNES, toRunic } from '@/lib/runes';

const W = 768;
const H = 1536;
/** Scale for sizes tuned at 512px wide, so detail stays the same at any resolution. */
const S = W / 512;

type Stroke = [number, number, number, number];
type Vec = [number, number];

/** What is cut into the face: the name down the middle, more text in the serpent band. */
export type Inscription = { name: string; band: string };

/** Rune strokes for each character; the word divider comes back as null. */
function glyphs(text: string): (Stroke[] | null)[] {
	return [...toRunic(text)].map((char) =>
		char === '·' ? null : (RUNES.find((r) => r.char === char)?.strokes ?? null),
	);
}

/* ------------------------------------------------------------------
   The serpent band. Viking-age stones run their text inside a beast's
   body that follows the outline of the stone: up one side, over the
   head, down the other, with the head at the start and the tail at
   the end. The face UVs follow the deformed outline, so a band laid
   along the texture's edges hugs the real silhouette.
------------------------------------------------------------------ */

const BAND_W = W * 0.092;
const INSET_X = W * 0.1;
const INSET_TOP = H * 0.055;
const BAND_FOOT = H * 0.8;
const CORNER = W * 0.3;

/** Midline of the band as a dense polyline, from the head (bottom left) round to the tail. */
function bandPath(): Vec[] {
	const pts: Vec[] = [];
	const left = INSET_X;
	const right = W - INSET_X;
	const top = INSET_TOP;
	const steps = 40;

	for (let i = 0; i <= steps; i++) pts.push([left, BAND_FOOT - ((BAND_FOOT - top - CORNER) * i) / steps]);
	for (let i = 1; i <= steps; i++) {
		const a = Math.PI + (Math.PI / 2) * (i / steps);
		pts.push([left + CORNER + Math.cos(a) * CORNER, top + CORNER + Math.sin(a) * CORNER]);
	}
	for (let i = 1; i <= steps; i++) pts.push([left + CORNER + ((right - left - 2 * CORNER) * i) / steps, top]);
	for (let i = 1; i <= steps; i++) {
		const a = -Math.PI / 2 + (Math.PI / 2) * (i / steps);
		pts.push([right - CORNER + Math.cos(a) * CORNER, top + CORNER + Math.sin(a) * CORNER]);
	}
	for (let i = 1; i <= steps; i++) pts.push([right, top + CORNER + ((BAND_FOOT - top - CORNER) * i) / steps]);

	// A slight hand-cut wobble so the band never looks drawn with a ruler.
	const rand = makeRandom(71_203);
	const phase = rand() * 6;
	return pts.map(([x, y], i) => {
		const w = Math.sin(i * 0.09 + phase) * W * 0.006;
		return [x + w, y + w * 0.6];
	});
}

/** Point, unit tangent and outward normal at distance `d` along a polyline. */
function sampler(pts: Vec[]) {
	const lengths = [0];
	for (let i = 1; i < pts.length; i++) {
		lengths.push(lengths[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
	}
	const total = lengths[lengths.length - 1];

	const at = (d: number) => {
		const target = Math.min(Math.max(d, 0), total);
		let i = 1;
		while (i < lengths.length - 1 && lengths[i] < target) i++;
		const [ax, ay] = pts[i - 1];
		const [bx, by] = pts[i];
		const seg = lengths[i] - lengths[i - 1] || 1;
		const k = (target - lengths[i - 1]) / seg;
		const tx = (bx - ax) / seg;
		const ty = (by - ay) / seg;
		// Travelling clockwise, outward is to the left of the direction of travel.
		return { p: [ax + (bx - ax) * k, ay + (by - ay) * k] as Vec, t: [tx, ty] as Vec, n: [ty, -tx] as Vec };
	};

	return { at, total };
}

function strokeOffset(ctx: CanvasRenderingContext2D, pts: Vec[], offset: number) {
	const s = sampler(pts);
	ctx.beginPath();
	for (let d = 0; d <= s.total; d += 6) {
		const { p, n } = s.at(d);
		const x = p[0] + n[0] * offset;
		const y = p[1] + n[1] * offset;
		if (d === 0) ctx.moveTo(x, y);
		else ctx.lineTo(x, y);
	}
	ctx.stroke();
}

/** Band outline, beast head and tail, and the runes running along the body. */
function drawBand(ctx: CanvasRenderingContext2D, text: string) {
	const pts = bandPath();
	const s = sampler(pts);
	const half = BAND_W / 2;

	// The body: two lines following the outline.
	strokeOffset(ctx, pts, half);
	strokeOffset(ctx, pts, -half);

	// Head at the start, pointing down and out of the band.
	const start = s.at(0);
	const hd: Vec = [-start.t[0], -start.t[1]];
	const hn = start.n;
	const len = BAND_W * 1.9;
	const tip: Vec = [
		start.p[0] + hd[0] * len + hn[0] * BAND_W * 0.35,
		start.p[1] + hd[1] * len + hn[1] * BAND_W * 0.35,
	];
	ctx.beginPath();
	ctx.moveTo(start.p[0] + hn[0] * half, start.p[1] + hn[1] * half);
	ctx.quadraticCurveTo(
		start.p[0] + hd[0] * len * 0.55 + hn[0] * BAND_W * 1.05,
		start.p[1] + hd[1] * len * 0.55 + hn[1] * BAND_W * 1.05,
		tip[0],
		tip[1],
	);
	ctx.quadraticCurveTo(
		start.p[0] + hd[0] * len * 0.6 - hn[0] * BAND_W * 0.55,
		start.p[1] + hd[1] * len * 0.6 - hn[1] * BAND_W * 0.55,
		start.p[0] - hn[0] * half,
		start.p[1] - hn[1] * half,
	);
	ctx.stroke();

	// The eye.
	ctx.beginPath();
	ctx.arc(
		start.p[0] + hd[0] * len * 0.42 + hn[0] * BAND_W * 0.3,
		start.p[1] + hd[1] * len * 0.42 + hn[1] * BAND_W * 0.3,
		BAND_W * 0.11,
		0,
		Math.PI * 2,
	);
	ctx.stroke();

	// Tail: both lines taper to one point, with a slight curl inward.
	const end = s.at(s.total);
	const tailTip: Vec = [
		end.p[0] + end.t[0] * BAND_W * 2.2 - end.n[0] * BAND_W * 0.5,
		end.p[1] + end.t[1] * BAND_W * 2.2 - end.n[1] * BAND_W * 0.5,
	];
	ctx.beginPath();
	ctx.moveTo(end.p[0] + end.n[0] * half, end.p[1] + end.n[1] * half);
	ctx.quadraticCurveTo(end.p[0] + end.t[0] * BAND_W * 1.3, end.p[1] + end.t[1] * BAND_W * 1.3, tailTip[0], tailTip[1]);
	ctx.moveTo(end.p[0] - end.n[0] * half, end.p[1] - end.n[1] * half);
	ctx.quadraticCurveTo(end.p[0] + end.t[0] * BAND_W, end.p[1] + end.t[1] * BAND_W, tailTip[0], tailTip[1]);
	ctx.stroke();

	// Runes along the body, reading head to tail, tops toward the stone's edge.
	const list = glyphs(text);
	const margin = BAND_W * 0.6;
	const cell = (s.total - margin * 2) / list.length;
	const gh = BAND_W * 0.68;
	const gw = Math.min(cell * 0.62, gh * 0.8);

	ctx.beginPath();
	list.forEach((strokes, i) => {
		const { p, t, n } = s.at(margin + cell * (i + 0.5));
		const map = (x: number, y: number): Vec => [
			p[0] + (x - 0.5) * gw * t[0] + (y - 0.5) * gh * n[0],
			p[1] + (x - 0.5) * gw * t[1] + (y - 0.5) * gh * n[1],
		];
		if (!strokes) {
			// Word divider: a short cut across the band.
			const [ax, ay] = map(0.5, 0.36);
			const [bx, by] = map(0.5, 0.64);
			ctx.moveTo(ax, ay);
			ctx.lineTo(bx, by);
			return;
		}
		for (const [x1, y1, x2, y2] of strokes) {
			const [ax, ay] = map(x1, y1);
			const [bx, by] = map(x2, y2);
			ctx.moveTo(ax, ay);
			ctx.lineTo(bx, by);
		}
	});
	ctx.stroke();
}

/** The name: one column of large runes down the middle of the face. */
function drawName(ctx: CanvasRenderingContext2D, name: string) {
	const list = glyphs(name).filter((g): g is Stroke[] => g !== null);
	const top = H * 0.16;
	const bottom = H * 0.74;
	const cell = (bottom - top) / list.length;
	const glyphH = cell * 0.82;
	// The face is wider per pixel than it is tall, so widen to keep runes upright.
	const glyphW = glyphH * 0.78;
	const cx = W * 0.5;

	ctx.beginPath();
	list.forEach((strokes, i) => {
		const cy = top + cell * (i + 0.5);
		for (const [x1, y1, x2, y2] of strokes) {
			ctx.moveTo(cx + (x1 - 0.5) * glyphW, cy + (0.5 - y1) * glyphH);
			ctx.lineTo(cx + (x2 - 0.5) * glyphW, cy + (0.5 - y2) * glyphH);
		}
	});
	ctx.stroke();
}

/** Weathering: overlapping translucent blobs, deterministic. */
function mottle(ctx: CanvasRenderingContext2D, seed: number, colors: string[], count: number) {
	const rand = makeRandom(seed);
	ctx.save();
	for (let i = 0; i < count; i++) {
		ctx.beginPath();
		ctx.fillStyle = colors[Math.floor(rand() * colors.length) % colors.length];
		ctx.globalAlpha = 0.05 + rand() * 0.12;
		ctx.ellipse(rand() * W, rand() * H, (10 + rand() * 80) * S, (8 + rand() * 60) * S, rand() * Math.PI, 0, Math.PI * 2);
		ctx.fill();
	}
	ctx.restore();
}

/** Fine speckle so the face reads as grain, not paint. */
function speckle(ctx: CanvasRenderingContext2D, seed: number, count: number) {
	const rand = makeRandom(seed);
	ctx.save();
	for (let i = 0; i < count; i++) {
		ctx.fillStyle = rand() < 0.5 ? 'rgba(20,22,18,0.35)' : 'rgba(210,206,190,0.25)';
		ctx.fillRect(rand() * W, rand() * H, (1 + rand() * 1.5) * S, (1 + rand() * 1.5) * S);
	}
	ctx.restore();
}

/** Hairline fractures, the kind frost leaves in granite. */
function cracks(ctx: CanvasRenderingContext2D, seed: number, color: string, width: number) {
	const rand = makeRandom(seed);
	ctx.save();
	ctx.strokeStyle = color;
	ctx.lineWidth = width;
	for (let c = 0; c < 7; c++) {
		let x = rand() * W;
		let y = rand() * H;
		let a = rand() * Math.PI * 2;
		ctx.beginPath();
		ctx.moveTo(x, y);
		for (let i = 0; i < 14; i++) {
			a += (rand() - 0.5) * 0.9;
			x += Math.cos(a) * 14 * S;
			y += Math.sin(a) * 14 * S;
			ctx.lineTo(x, y);
		}
		ctx.stroke();
	}
	ctx.restore();
}

function canvas2d() {
	const canvas = document.createElement('canvas');
	canvas.width = W;
	canvas.height = H;
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('2D canvas unavailable');
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';
	return { canvas, ctx };
}

function toTexture(canvas: HTMLCanvasElement, color: boolean) {
	const texture = new THREE.CanvasTexture(canvas);
	if (color) texture.colorSpace = THREE.SRGBColorSpace;
	texture.anisotropy = 8;
	return texture;
}

/** Carve both parts with the current stroke style, each at its own width. */
function carve(ctx: CanvasRenderingContext2D, ins: Inscription, nameWidth: number, bandWidth: number) {
	ctx.lineWidth = bandWidth;
	drawBand(ctx, ins.band);
	ctx.lineWidth = nameWidth;
	drawName(ctx, ins.name);
}

/** Weathered granite for every face. With an inscription, the grooves are cut in. */
export function createAlbedo(ins?: Inscription): THREE.CanvasTexture {
	const { canvas, ctx } = canvas2d();
	ctx.fillStyle = '#76746c';
	ctx.fillRect(0, 0, W, H);
	mottle(ctx, 909_121, ['#8c8a82', '#5a5852', '#83817a', '#67655e', '#4f4d48'], 300);
	mottle(ctx, 414_003, ['#7f8c66', '#6b7656', '#8a9470'], 46); // lichen
	speckle(ctx, 33_019, 22000);
	cracks(ctx, 61_877, 'rgba(30,30,26,0.45)', 2.2 * S);

	if (ins) {
		// The cut: a dark floor with pigment worked into it.
		ctx.strokeStyle = '#2a211b';
		carve(ctx, ins, 34, 17);
		ctx.strokeStyle = '#9b3f28';
		carve(ctx, ins, 22, 10);
	}
	return toTexture(canvas, true);
}

/** Bump: mottled ground and fractures, grooves cut deep so light rakes across them. */
export function createBump(ins?: Inscription): THREE.CanvasTexture {
	const { canvas, ctx } = canvas2d();
	ctx.fillStyle = '#808080';
	ctx.fillRect(0, 0, W, H);
	mottle(ctx, 909_121, ['#626262', '#9c9c9c'], 300);
	speckle(ctx, 33_019, 22000);
	cracks(ctx, 61_877, '#3a3a3a', 3 * S);
	if (ins) {
		// Soft shoulder then a deep floor, so each groove has a bevel to catch light.
		ctx.strokeStyle = '#4a4a4a';
		carve(ctx, ins, 38, 19);
		ctx.strokeStyle = '#141414';
		carve(ctx, ins, 24, 11);
	}
	return toTexture(canvas, false);
}

/** Emissive: the grooves only, with a halo. The name burns brightest, the band lower. */
export function createGlow(ins: Inscription): THREE.CanvasTexture {
	const { canvas, ctx } = canvas2d();
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, W, H);

	ctx.save();
	ctx.shadowColor = '#d9694d';
	ctx.shadowBlur = 40;
	ctx.strokeStyle = 'rgba(196,84,58,0.5)';
	ctx.lineWidth = 26;
	drawName(ctx, ins.name);
	ctx.shadowBlur = 18;
	ctx.strokeStyle = 'rgba(196,84,58,0.3)';
	ctx.lineWidth = 12;
	drawBand(ctx, ins.band);
	ctx.restore();

	ctx.strokeStyle = '#e07a5c';
	ctx.lineWidth = 11;
	drawName(ctx, ins.name);
	ctx.strokeStyle = 'rgba(224,122,92,0.6)';
	ctx.lineWidth = 5;
	drawBand(ctx, ins.band);
	return toTexture(canvas, true);
}

import * as THREE from 'three';

import { makeRandom } from '@/lib/prng';
import { RUNES } from '@/lib/runes';

const W = 512;
const H = 1024;

/** Vertical rune bands, the way inscriptions actually run on a standing stone. */
function drawRunes(
	ctx: CanvasRenderingContext2D,
	seed: number,
	stroke: string,
	lineWidth: number,
	offsetX = 0,
	offsetY = 0,
) {
	const rand = makeRandom(seed);
	const columns = 3;
	const perColumn = 11;
	const colWidth = W / (columns + 1);
	const glyphH = (H * 0.78) / perColumn;
	const glyphW = colWidth * 0.42;

	ctx.save();
	ctx.strokeStyle = stroke;
	ctx.lineWidth = lineWidth;
	ctx.lineCap = 'round';
	ctx.lineJoin = 'round';

	for (let c = 0; c < columns; c++) {
		const cx = colWidth * (c + 1) + offsetX;
		for (let r = 0; r < perColumn; r++) {
			const rune = RUNES[Math.floor(rand() * RUNES.length) % RUNES.length];
			const cy = H * 0.11 + r * glyphH + glyphH / 2 + offsetY;

			ctx.beginPath();
			for (const [x1, y1, x2, y2] of rune.strokes) {
				ctx.moveTo(cx + (x1 - 0.5) * glyphW, cy + (0.5 - y1) * glyphH * 0.66);
				ctx.lineTo(cx + (x2 - 0.5) * glyphW, cy + (0.5 - y2) * glyphH * 0.66);
			}
			ctx.stroke();
		}
	}
	ctx.restore();
}

/** Weathering: overlapping translucent blobs, deterministic. */
function mottle(ctx: CanvasRenderingContext2D, seed: number, colors: string[], count: number) {
	const rand = makeRandom(seed);
	ctx.save();
	for (let i = 0; i < count; i++) {
		ctx.beginPath();
		ctx.fillStyle = colors[Math.floor(rand() * colors.length) % colors.length];
		ctx.globalAlpha = 0.04 + rand() * 0.1;
		ctx.ellipse(
			rand() * W,
			rand() * H,
			14 + rand() * 90,
			10 + rand() * 70,
			rand() * Math.PI,
			0,
			Math.PI * 2,
		);
		ctx.fill();
	}
	ctx.restore();
}

function canvas2d() {
	const canvas = document.createElement('canvas');
	canvas.width = W;
	canvas.height = H;
	const ctx = canvas.getContext('2d');
	if (!ctx) throw new Error('2D canvas unavailable');
	return { canvas, ctx };
}

/** Albedo: weathered limestone with red ochre worked into the grooves. */
export function createStoneAlbedo(): THREE.CanvasTexture {
	const { canvas, ctx } = canvas2d();

	ctx.fillStyle = '#9d9a8a';
	ctx.fillRect(0, 0, W, H);
	mottle(ctx, 909_121, ['#b6b3a2', '#7e7c6e', '#8f9382', '#a8a89e'], 180);
	// Lichen.
	mottle(ctx, 414_003, ['#9aa87e', '#7f8c66'], 60);

	// A dark shadow pass under the pigment sells the depth of the cut.
	drawRunes(ctx, 777_001, 'rgba(38,34,28,0.75)', 11, 1.5, 2);
	drawRunes(ctx, 777_001, '#b8482c', 8);

	const texture = new THREE.CanvasTexture(canvas);
	texture.colorSpace = THREE.SRGBColorSpace;
	texture.anisotropy = 4;
	return texture;
}

/**
 * Bump: mid-grey ground with the runes cut dark, so the lighting actually
 * moves across the carving as the stone turns.
 */
export function createStoneBump(): THREE.CanvasTexture {
	const { canvas, ctx } = canvas2d();

	ctx.fillStyle = '#808080';
	ctx.fillRect(0, 0, W, H);
	mottle(ctx, 909_121, ['#6d6d6d', '#949494'], 180);
	drawRunes(ctx, 777_001, '#1c1c1c', 9);

	const texture = new THREE.CanvasTexture(canvas);
	texture.anisotropy = 4;
	return texture;
}

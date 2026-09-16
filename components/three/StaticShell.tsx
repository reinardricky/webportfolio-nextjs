import { RUNES } from '@/lib/runes';

/**
 * The no-WebGL / reduced-motion fallback: the same rune gate, drawn once
 * as plain SVG. This is also what the server renders, so the hero is
 * never empty.
 *
 * Placement uses SVG `rotate()` transforms rather than trig in JS — the
 * only numbers in the markup are whole degrees and constants, so there is
 * nothing for two JS engines to round differently.
 */
const RINGS = [
	{ radius: 74, count: 18, seed: 10_113, glyph: 20, opacity: 0.95 },
	{ radius: 112, count: 26, seed: 77_431, glyph: 17, opacity: 0.7 },
	{ radius: 146, count: 34, seed: 52_207, glyph: 14, opacity: 0.48 },
];

function runesFor(count: number, seed: number) {
	let state = seed;
	const next = () => {
		state = (state * 1664525 + 1013904223) % 4294967296;
		return state / 4294967296;
	};
	return Array.from(
		{ length: count },
		() => RUNES[Math.floor(next() * RUNES.length) % RUNES.length],
	);
}

export default function StaticShell() {
	return (
		<svg
			viewBox="-200 -200 400 400"
			className="h-full w-full"
			aria-hidden="true"
			focusable="false"
		>
			<defs>
				<radialGradient id="gate-core">
					<stop offset="0%" stopColor="#e8a93f" stopOpacity="0.55" />
					<stop offset="45%" stopColor="#c4632a" stopOpacity="0.14" />
					<stop offset="100%" stopColor="#c4632a" stopOpacity="0" />
				</radialGradient>
			</defs>

			{/* The light behind the gate. */}
			<circle r="150" fill="url(#gate-core)" />

			<g fill="none" stroke="#d9a441" strokeLinecap="round" strokeLinejoin="round">
				{RINGS.map((ring) => {
					const glyphs = runesFor(ring.count, ring.seed);
					const w = ring.glyph * 0.8;
					const h = ring.glyph;

					return (
						<g key={ring.seed} opacity={ring.opacity}>
							<circle r={ring.radius - h * 0.85} strokeWidth="0.5" opacity="0.4" />
							<circle r={ring.radius + h * 0.85} strokeWidth="0.5" opacity="0.4" />

							{glyphs.map((rune, i) => (
								<g
									key={i}
									transform={`rotate(${Math.round((i / ring.count) * 3600) / 10}) translate(0 ${-ring.radius})`}
								>
									{rune.strokes.map(([x1, y1, x2, y2], j) => {
										const coords = {
											x1: (x1 - 0.5) * w,
											y1: (0.5 - y1) * h,
											x2: (x2 - 0.5) * w,
											y2: (0.5 - y2) * h,
										};
										return (
											// Wide faint pass under a crisp one: glow without a filter.
											<g key={j}>
												<line {...coords} strokeWidth="2.6" opacity="0.18" />
												<line {...coords} strokeWidth="1" />
											</g>
										);
									})}
								</g>
							))}
						</g>
					);
				})}
			</g>
		</svg>
	);
}

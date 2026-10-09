import { makeRandom } from '@/lib/prng';
import { RUNES, toRunic } from '@/lib/runes';
import { site } from '@/lib/site';

/*
 * Static stand-ins, server-rendered and shown when WebGL is unavailable.
 * Coordinates are constants and whole-degree rotations only, so there is
 * no float maths for two JS engines to round differently.
 */

export function ScanFallback() {
	const dots = Array.from({ length: 13 }, (_, r) =>
		Array.from({ length: 7 }, (_, c) => [46 + c * 18, 34 + r * 18] as const),
	).flat();

	return (
		<svg viewBox="0 0 200 290" className="h-full w-full" aria-hidden focusable="false">
			<g fill="#cdcbba">
				{dots.map(([cx, cy], i) => (
					<circle key={i} cx={cx} cy={cy} r="1.1" opacity={0.28} />
				))}
			</g>
			<rect x="30" y="126" width="140" height="16" fill="#fff4e2" opacity="0.1" />
			<g fill="#00ffff">
				{dots
					.filter((_, i) => i % 3 === 0)
					.map(([cx, cy], i) => (
						<circle key={i} cx={cx} cy={cy} r="1.5" opacity={0.75} />
					))}
			</g>
		</svg>
	);
}

const STARS = (() => {
	const rand = makeRandom(9_004_411);
	return Array.from({ length: 90 }, () => [
		Math.round(rand() * 2000) / 10,
		Math.round(rand() * 2000) / 10,
		Math.round(rand() * 15) / 10 + 0.4,
	]);
})();

export function ConstellationFallback() {
	const stars = STARS;

	return (
		<svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden focusable="false">
			<circle cx="100" cy="100" r="86" fill="none" stroke="#9aa87e" strokeWidth="0.5" opacity="0.22" />
			<g fill="#ece9dd">
				{stars.map(([cx, cy, r], i) => (
					<circle key={i} cx={cx} cy={cy} r={r} opacity={0.45} />
				))}
			</g>
			<g stroke="#00ffff" strokeWidth="0.7" fill="none" opacity="0.5">
				<path d="M58 62 78 54l16 20 24-6" />
				<path d="M120 112l18 14-6 22-26 4" />
				<path d="M48 128l14 18 26-6" />
			</g>
			<g fill="#80ffff">
				{[[58, 62], [78, 54], [94, 74], [118, 68], [120, 112], [138, 126], [132, 148], [106, 152], [48, 128], [62, 146], [88, 140]].map(
					([cx, cy], i) => (
						<circle key={i} cx={cx} cy={cy} r="1.8" />
					),
				)}
			</g>
		</svg>
	);
}

export function SurveyFallback() {
	return (
		<svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden focusable="false">
			<g fill="none" strokeLinecap="round">
				{[70, 58, 46, 34, 22].map((r, i) => (
					<ellipse
						key={r}
						cx="100"
						cy="106"
						rx={r + 26}
						ry={r * 0.44}
						stroke={i % 2 === 0 ? '#00ffff' : '#9aa87e'}
						strokeWidth={i % 2 === 0 ? 1 : 0.6}
						opacity={0.55 - i * 0.06}
						transform="rotate(-8 100 106)"
					/>
				))}
				{[84, 66, 48].map((r, i) => (
					<ellipse
						key={`b-${r}`}
						cx="70"
						cy="132"
						rx={r * 0.62}
						ry={r * 0.24}
						stroke="#9aa87e"
						strokeWidth="0.6"
						opacity={0.34 - i * 0.07}
						transform="rotate(-8 70 132)"
					/>
				))}
			</g>
		</svg>
	);
}

const SIGIL_STROKES = (() => {
	const names = ['Ansuz', 'Raidho', 'Algiz', 'Kenaz', 'Isa', 'Tiwaz', 'Laguz'];
	const seen = new Set<string>();
	const strokes: [number, number, number, number][] = [];

	for (const name of names) {
		const rune = RUNES.find((r) => r.name === name);
		if (!rune) continue;
		for (const stroke of rune.strokes) {
			// The shared stave appears in several runes — keep one copy.
			const key = stroke.map((n) => n.toFixed(3)).join(',');
			if (seen.has(key)) continue;
			seen.add(key);
			strokes.push(stroke);
		}
	}

	return strokes;
})();

export function SigilFallback() {
	const strokes = SIGIL_STROKES;

	return (
		<svg viewBox="0 0 200 260" className="h-full w-full" aria-hidden focusable="false">
			<g stroke="#00ffff" strokeWidth="7" strokeLinecap="round" fill="none">
				{strokes.map(([x1, y1, x2, y2], i) => (
					<line
						key={i}
						x1={40 + x1 * 120}
						y1={230 - y1 * 200}
						x2={40 + x2 * 120}
						y2={230 - y2 * 200}
					/>
				))}
			</g>
		</svg>
	);
}

const MONOLITH_GLYPHS = [...toRunic(site.firstName)]
	.map((char) => RUNES.find((r) => r.char === char)?.strokes ?? [])
	.filter((s) => s.length > 0);

/** The standing stone in flat silhouette, with the inscription in ochre. */
export function MonolithFallback() {
	const cell = 172 / MONOLITH_GLYPHS.length;

	return (
		<svg viewBox="0 0 200 300" className="h-full w-full" aria-hidden focusable="false">
			{/* Uneven raised stone: slanted head peaking right, flared foot. */}
			<path
				d="M44 270 Q50 236 56 196 L64 110 Q70 72 92 50 L104 40 Q118 30 130 34 Q146 40 150 70 L154 150 Q156 214 160 248 Q164 262 158 270 Z"
				fill="#3b3f37"
				stroke="#00ffff"
				strokeOpacity="0.35"
				strokeWidth="0.8"
			/>
			<g stroke="#66ffff" strokeWidth="2.2" strokeLinecap="round" fill="none">
				{/* Serpent band hugging the outline: drawn wide, then cut through the middle. */}
				<path
					d="M66 246 L74 118 Q80 84 98 64 L108 56 Q120 48 130 52 Q140 58 142 82 L146 152 Q148 210 150 246"
					strokeOpacity="0.55"
					strokeWidth="11"
				/>
				<path
					d="M66 246 L74 118 Q80 84 98 64 L108 56 Q120 48 130 52 Q140 58 142 82 L146 152 Q148 210 150 246"
					stroke="#3b3f37"
					strokeWidth="8"
				/>
				<path d="M61 246 Q60 262 66 266 Q72 262 71 246" strokeOpacity="0.55" strokeWidth="1.2" />
				{MONOLITH_GLYPHS.map((strokes, i) =>
					strokes.map(([x1, y1, x2, y2], j) => (
						<line
							key={`${i}-${j}`}
							x1={100 + (x1 - 0.5) * 14}
							y1={74 + cell * i + (1 - y1) * 18}
							x2={100 + (x2 - 0.5) * 14}
							y2={74 + cell * i + (1 - y2) * 18}
						/>
					)),
				)}
			</g>
		</svg>
	);
}

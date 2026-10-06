import { makeRandom } from '@/lib/prng';
import { RUNES } from '@/lib/runes';

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
			<g fill="#c4543a">
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
			<g stroke="#c4543a" strokeWidth="0.7" fill="none" opacity="0.5">
				<path d="M58 62 78 54l16 20 24-6" />
				<path d="M120 112l18 14-6 22-26 4" />
				<path d="M48 128l14 18 26-6" />
			</g>
			<g fill="#e08a6a">
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
						stroke={i % 2 === 0 ? '#c4543a' : '#9aa87e'}
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
			<g stroke="#c4543a" strokeWidth="7" strokeLinecap="round" fill="none">
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

import { RUNES } from '@/lib/runes';

export default function Fallback() {
	// Deterministic column of runes, matching the carving on the 3D slab.
	let seed = 777_001;
	const rand = () => {
		seed = (seed * 1664525 + 1013904223) % 4294967296;
		return seed / 4294967296;
	};
	const columns = [0, 1, 2].map(() =>
		Array.from({ length: 9 }, () => RUNES[Math.floor(rand() * RUNES.length) % RUNES.length]),
	);

	return (
		<svg viewBox="0 0 200 300" className="h-full w-full" aria-hidden focusable="false">
			<defs>
				<linearGradient id="stone-face" x1="0" y1="0" x2="1" y2="1">
					<stop offset="0%" stopColor="#b2af9e" />
					<stop offset="55%" stopColor="#918e80" />
					<stop offset="100%" stopColor="#6e6c61" />
				</linearGradient>
			</defs>
			<rect x="52" y="26" width="96" height="248" rx="6" fill="url(#stone-face)" />
			<g stroke="#b8482c" fill="none" strokeWidth="1.5" strokeLinecap="round">
				{columns.map((column, c) =>
					column.map((rune, r) => (
						<g key={`${c}-${r}`} transform={`translate(${74 + c * 26} ${48 + r * 26})`}>
							{rune.strokes.map(([x1, y1, x2, y2], j) => (
								<line
									key={j}
									x1={(x1 - 0.5) * 11}
									y1={(0.5 - y1) * 17}
									x2={(x2 - 0.5) * 11}
									y2={(0.5 - y2) * 17}
								/>
							))}
						</g>
					)),
				)}
			</g>
		</svg>
	);
}

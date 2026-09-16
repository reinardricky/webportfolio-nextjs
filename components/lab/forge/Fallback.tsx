export default function Fallback() {
	return (
		<svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden focusable="false">
			<defs>
				<radialGradient id="forge-heat">
					<stop offset="0%" stopColor="#ff7a26" stopOpacity="0.45" />
					<stop offset="60%" stopColor="#ff5a0a" stopOpacity="0.1" />
					<stop offset="100%" stopColor="#ff5a0a" stopOpacity="0" />
				</radialGradient>
				<radialGradient id="forge-mass" cx="38%" cy="32%">
					<stop offset="0%" stopColor="#5a4a3c" />
					<stop offset="70%" stopColor="#1d1813" />
					<stop offset="100%" stopColor="#100d0a" />
				</radialGradient>
			</defs>
			<circle cx="100" cy="100" r="92" fill="url(#forge-heat)" />
			<circle cx="100" cy="100" r="54" fill="url(#forge-mass)" />
			<g stroke="#ff5a0a" fill="none" strokeLinecap="round" opacity="0.85">
				<path d="M64 84c14 6 22 2 32 10s10 18 24 20" strokeWidth="1.4" />
				<path d="M72 126c10-10 12-22 26-24s16-12 28-10" strokeWidth="1.1" opacity="0.7" />
				<path d="M100 54c-4 14 4 22 0 34s-10 16-4 28" strokeWidth="1" opacity="0.55" />
			</g>
			<g fill="#ffe9c4">
				{[[70, 48], [128, 40], [92, 28], [146, 70], [54, 66]].map(([cx, cy], i) => (
					<circle key={i} cx={cx} cy={cy} r={1.6 - i * 0.15} opacity={0.8 - i * 0.12} />
				))}
			</g>
		</svg>
	);
}

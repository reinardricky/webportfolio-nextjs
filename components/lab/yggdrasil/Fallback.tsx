/** Static stand-in when WebGL is unavailable or motion is reduced. */
export default function Fallback() {
	return (
		<svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden focusable="false">
			<defs>
				<radialGradient id="ygg-glow">
					<stop offset="0%" stopColor="#57c99a" stopOpacity="0.28" />
					<stop offset="100%" stopColor="#57c99a" stopOpacity="0" />
				</radialGradient>
			</defs>
			<circle cx="100" cy="92" r="76" fill="url(#ygg-glow)" />
			<g stroke="#8a6a34" fill="none" strokeLinecap="round">
				<path d="M100 172V96" strokeWidth="3" />
				<path d="M100 120 74 92M100 120l26-28M100 96 78 66M100 96l22-30M100 140 80 126M100 140l20-14" strokeWidth="1.6" />
				<path d="M78 66 66 48M78 66 86 44M122 66l12-18M122 66l-8-22M74 92 58 78M126 92l16-14" strokeWidth="1" opacity="0.8" />
				<path d="M100 172 84 186M100 172l16 14M100 172 70 180M100 172l30 8" strokeWidth="1.2" opacity="0.55" />
			</g>
			<g fill="#9dffcf">
				{[
					[66, 48], [86, 44], [134, 48], [114, 44], [58, 78], [142, 78], [80, 126], [120, 126],
				].map(([cx, cy], i) => (
					<circle key={i} cx={cx} cy={cy} r="2.2" opacity="0.75" />
				))}
			</g>
		</svg>
	);
}

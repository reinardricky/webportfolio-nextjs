import { site } from '@/lib/site';

const builtWith = [
	{ label: 'Next.js', href: 'https://nextjs.org' },
	{ label: 'Three.js', href: 'https://threejs.org' },
	{ label: 'Tailwind', href: 'https://tailwindcss.com' },
	{ label: 'Vercel', href: 'https://vercel.com' },
];

export default function Footer() {
	return (
		<footer className="pad py-8">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<p className="label">
					© {new Date().getFullYear()} {site.name} — RR-2026-001
				</p>

				<p className="label flex flex-wrap items-center gap-x-2 gap-y-1">
					<span>Recorded with</span>
					{builtWith.map((tool, i) => (
						<span key={tool.href}>
							<a
								href={tool.href}
								target="_blank"
								rel="noreferrer"
								className="text-dim transition-colors hover:text-hot"
							>
								{tool.label}
							</a>
							{i < builtWith.length - 1 ? <span className="ml-2 text-line-lit">·</span> : null}
						</span>
					))}
				</p>

				<a href="#top" className="label text-dim transition-colors hover:text-hot">
					Return to head ↑
				</a>
			</div>
		</footer>
	);
}

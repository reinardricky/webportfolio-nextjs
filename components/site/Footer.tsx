import { site } from '@/lib/site';

const builtWith = [
	{ label: 'Next.js', href: 'https://nextjs.org' },
	{ label: 'Three.js', href: 'https://threejs.org' },
	{ label: 'Tailwind', href: 'https://tailwindcss.com' },
	{ label: 'Vercel', href: 'https://vercel.com' },
];

export default function Footer() {
	return (
		<footer className="pad pt-8 pb-10">
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<p className="label">
					© {new Date().getFullYear()} {site.name} — {site.specimen}
				</p>

				<p className="label flex flex-wrap items-center gap-x-2 gap-y-1">
					<span>Built with</span>
					{builtWith.map((tool, i) => (
						<span key={tool.href}>
							<a
								href={tool.href}
								target="_blank"
								rel="noreferrer"
								className="press text-dim hover:text-hot-ink"
							>
								{tool.label}
							</a>
							{i < builtWith.length - 1 ? <span className="ml-2 text-line-lit">·</span> : null}
						</span>
					))}
				</p>

				<a href="#top" className="label press text-dim hover:text-hot-ink">
					Back to top ↑
				</a>
			</div>
		</footer>
	);
}

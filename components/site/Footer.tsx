import { site } from '@/lib/site';

const builtWith = [
	{ label: 'Next.js', href: 'https://nextjs.org' },
	{ label: 'Three.js', href: 'https://threejs.org' },
	{ label: 'Tailwind', href: 'https://tailwindcss.com' },
	{ label: 'Vercel', href: 'https://vercel.com' },
];

export default function Footer() {
	return (
		<footer className="border-t border-edge bg-abyss">
			<div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
				<p className="label">
					© {new Date().getFullYear()} {site.name}
				</p>

				<p className="label flex flex-wrap items-center gap-x-2 gap-y-1">
					<span>Forged with</span>
					{builtWith.map((tool, i) => (
						<span key={tool.href}>
							<a
								href={tool.href}
								target="_blank"
								rel="noreferrer"
								className="text-frost-dim transition-colors hover:text-rune"
							>
								{tool.label}
							</a>
							{i < builtWith.length - 1 ? <span className="ml-2 text-edge-lit">·</span> : null}
						</span>
					))}
				</p>

				<a href="#top" className="label text-frost-dim transition-colors hover:text-rune">
					Back to top ↑
				</a>
			</div>
		</footer>
	);
}

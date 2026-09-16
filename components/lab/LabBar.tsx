import Link from 'next/link';

export const DESIGNS = [
	{ slug: 'yggdrasil', numeral: 'I', name: 'Yggdrasil', gist: 'The world tree' },
	{ slug: 'forge', numeral: 'II', name: 'Muspelheim', gist: 'The forge' },
	{ slug: 'runestone', numeral: 'III', name: 'Runestone', gist: 'The carved record' },
] as const;

/** Fixed switcher so the three directions can be compared back to back. */
export default function LabBar({ current }: { current: string }) {
	return (
		<div className="fixed inset-x-0 bottom-0 z-200 border-t border-line bg-bg/90 backdrop-blur-md">
			<div className="mx-auto flex max-w-5xl items-center gap-1 overflow-x-auto px-4 py-2.5 sm:gap-2">
				<span className="mr-2 hidden font-mono text-[10px] tracking-[0.2em] text-mute uppercase sm:block">
					Design
				</span>

				{DESIGNS.map((design) => {
					const active = design.slug === current;
					return (
						<Link
							key={design.slug}
							href={`/lab/${design.slug}`}
							aria-current={active ? 'page' : undefined}
							className={`flex shrink-0 items-baseline gap-2 border px-3 py-2 transition-colors ${
								active
									? 'border-hot text-hot'
									: 'border-line text-dim hover:border-line-lit hover:text-ink'
							}`}
						>
							<span className="font-mono text-[10px] tracking-widest">{design.numeral}</span>
							<span className="text-sm whitespace-nowrap">{design.name}</span>
						</Link>
					);
				})}

				<Link
					href="/"
					className="ml-auto shrink-0 px-3 py-2 font-mono text-[10px] tracking-[0.2em] text-mute uppercase transition-colors hover:text-ink"
				>
					Live site ↗
				</Link>
			</div>
		</div>
	);
}

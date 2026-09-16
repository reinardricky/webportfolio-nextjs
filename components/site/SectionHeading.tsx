import type { ReactNode } from 'react';

import { toRunic } from '@/lib/runes';

type Props = {
	index: string;
	label: string;
	title: ReactNode;
};

export default function SectionHeading({ index, label, title }: Props) {
	return (
		<header className="border-t border-edge pt-8">
			<div className="flex items-baseline gap-4">
				<span className="label text-rune">{index}</span>
				<span className="h-px flex-1 bg-edge" aria-hidden />
				{/* The section name, spelled out in Elder Futhark. */}
				<span className="runic text-sm opacity-70" aria-hidden>
					{toRunic(label)}
				</span>
			</div>

			<p className="label mt-5 text-frost-dim">{label}</p>

			<h2 className="mt-3 font-display text-headline font-semibold text-balance text-frost uppercase">
				{title}
			</h2>
		</header>
	);
}

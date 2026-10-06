import type { ReactNode } from 'react';

import { toRunic } from '@/lib/runes';

type Props = {
	index: string;
	label: string;
	title?: ReactNode;
};

export default function SectionHeading({ index, label, title }: Props) {
	return (
		<header>
			<div className="flex items-baseline gap-4">
				<p className="label text-hot">
					§ {index} — {label}
				</p>
				<span className="h-px flex-1 bg-line" aria-hidden />
				<span className="runic text-xs opacity-55" aria-hidden>
					{toRunic(label)}
				</span>
			</div>

			{title ? (
				<h2 className="mt-6 max-w-3xl font-display text-headline font-light text-balance text-ink">
					{title}
				</h2>
			) : null}
		</header>
	);
}

'use client';

import { useState, type CSSProperties, type ReactNode } from 'react';

import type { Pairing } from './fonts';

/**
 * Swaps the three theme font tokens on a wrapper, so the real sections
 * below re-render in each pairing. The choice lives in ?type= so a pairing
 * can be linked to directly.
 */
export default function TypePicker({
	pairings,
	initial,
	children,
}: {
	pairings: Pairing[];
	initial?: string;
	children: ReactNode;
}) {
	const [id, setId] = useState(initial ?? pairings[0].id);

	const choose = (next: string) => {
		setId(next);
		const url = new URL(window.location.href);
		url.searchParams.set('type', next);
		window.history.replaceState(null, '', url);
	};

	const active = pairings.find((p) => p.id === id) ?? pairings[0];

	// The theme's --font-* tokens resolve on :root, so override them here
	// and set font-family again for the text that inherits from <body>.
	const style = {
		...(active.display && { '--font-display': `${active.display}, Georgia, serif` }),
		...(active.sans && { '--font-sans': `${active.sans}, ui-sans-serif, system-ui, sans-serif` }),
		...(active.mono && { '--font-mono': `${active.mono}, ui-monospace, monospace` }),
		fontFamily: 'var(--font-sans)',
	} as CSSProperties;

	return (
		<div style={style}>
			<div className="pad sticky top-0 z-(--z-header) border-b border-line bg-bg/95 py-4 backdrop-blur">
				<div className="flex flex-wrap gap-2">
					{pairings.map((p, i) => {
						const on = p.id === active.id;
						return (
							<button
								key={p.id}
								type="button"
								onClick={() => choose(p.id)}
								aria-pressed={on}
								className={`label press border px-3 py-2 transition-colors ${
									on
										? 'border-hot bg-hot text-bg'
										: 'border-line-lit text-dim hover:border-ink hover:text-ink'
								}`}
							>
								{i} · {p.name}
							</button>
						);
					})}
				</div>
				<p className="label mt-3 leading-relaxed">
					<span className="text-hot-ink">{active.faces.join(' / ')}</span>
					<span className="ml-3 hidden normal-case tracking-normal text-mute md:inline">{active.note}</span>
				</p>
			</div>

			{children}
		</div>
	);
}

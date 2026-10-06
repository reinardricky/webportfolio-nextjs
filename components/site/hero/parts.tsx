import type { CSSProperties, ReactNode } from 'react';

import HeroVisual from '@/components/three/HeroVisual';
import { site } from '@/lib/site';

/** Per-element stagger for the `.rise` / `.line-up` load-in. */
export const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

/** The copy every layout shares, so the variants differ only in composition. */
export const INTRO = 'I build responsive websites and mobile apps with React, Next.js, and React Native.';

export function Eyebrow({ className = '' }: { className?: string }) {
	return (
		<p className={`label rise text-hot ${className}`} style={delay(0)}>
			{site.role} — {site.location || 'Indonesia'}
			{site.availability ? <span className="ml-3 text-cool">· {site.availability}</span> : null}
		</p>
	);
}

/** One display line that slides up out of its own mask. */
export function Line({
	children,
	ms,
	className = '',
	inner = '',
}: {
	children: ReactNode;
	ms: number;
	className?: string;
	inner?: string;
}) {
	return (
		<span className={`block overflow-hidden ${className}`}>
			<span className={`line-up block ${inner}`} style={delay(ms)}>
				{children}
			</span>
		</span>
	);
}

export function Intro({ className = '', ms = 420 }: { className?: string; ms?: number }) {
	return (
		<p className={`rise text-lg leading-relaxed text-dim ${className}`} style={delay(ms)}>
			{INTRO}
		</p>
	);
}

export function Actions({ className = '', ms = 520 }: { className?: string; ms?: number }) {
	return (
		<div className={`rise flex flex-wrap items-center gap-3 ${className}`} style={delay(ms)}>
			<a href="#contact" className="btn btn-primary label">
				Get in touch <span className="arrow" aria-hidden>→</span>
			</a>
			<a href="#experience" className="btn label">
				See my experience
			</a>
			{site.resumeUrl ? (
				<a
					href={site.resumeUrl}
					target="_blank"
					rel="noreferrer"
					className="label press px-2 py-2.5 text-dim underline decoration-line-lit underline-offset-4 hover:text-hot"
				>
					Résumé ↗
				</a>
			) : null}
		</div>
	);
}

/**
 * The runestone with its ground light, sized entirely by the wrapper the
 * layout gives it. `fade` is where the foot starts dissolving (percent).
 */
export function Stone({ className = '', fade = 78 }: { className?: string; fade?: number }) {
	return (
		<div className={className}>
			<div
				aria-hidden
				className="absolute inset-x-[10%] bottom-[5%] h-[20%] rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-hot)_16%,transparent),transparent)]"
			/>
			<HeroVisual
				scene={site.heroScene}
				className="absolute inset-0"
				style={{
					maskImage: `linear-gradient(to bottom, black ${fade}%, transparent ${Math.min(fade + 19, 100)}%)`,
				}}
			/>
		</div>
	);
}

/** Low ochre light behind wherever the stone stands; position per layout. */
export function Glow({ className }: { className: string }) {
	return <div aria-hidden className={`absolute inset-0 -z-10 ${className}`} />;
}

import type { Metadata } from 'next';
import Link from 'next/link';

import Hero from '@/components/site/Hero';
import type { HeroLayout } from '@/lib/site';

// Internal design tool — reachable by URL, kept out of search results.
export const metadata: Metadata = {
	title: 'Hero layouts',
	robots: { index: false, follow: false },
};

const OPTIONS: { layout: HeroLayout; name: string; note: string }[] = [
	{ layout: 'straddle', name: '1 — Straddle', note: 'Name split around the stone in depth' },
	{ layout: 'monument', name: '2 — Monument', note: 'Film poster: giant name, stone rising in front' },
	{ layout: 'plate', name: '3 — Specimen plate', note: 'Catalogued in a plate, with callouts' },
	{ layout: 'title', name: '4 — Title screen', note: 'Game start screen with a menu' },
];

/**
 * Every hero layout at full size, exactly as it renders on the site.
 * Choose one by setting `heroLayout` in lib/site.ts.
 */
export default function Lab() {
	return (
		<main>
			<nav aria-label="Layouts" className="pad flex flex-wrap gap-x-6 gap-y-2 border-b border-line py-4">
				{OPTIONS.map((o) => (
					<a key={o.layout} href={`#${o.layout}`} className="label press text-dim hover:text-hot-ink">
						{o.name}
					</a>
				))}
			</nav>

			{OPTIONS.map(({ layout, name, note }) => (
				<div key={layout} id={layout}>
					<div className="pad relative z-10 flex h-14 items-center justify-between gap-6 border-y border-line bg-bg">
						<p className="label text-hot-ink">
							{name} <span className="ml-2 hidden text-mute md:inline">{note}</span>
						</p>
						<p className="label hidden sm:block">heroLayout: &apos;{layout}&apos;</p>
					</div>
					{/* The hero reserves room for the site nav; the bar above stands in for it. */}
					<div className="-mt-14">
						<Hero layout={layout} id={`hero-${layout}`} />
					</div>
				</div>
			))}

			<div className="pad py-10">
				<Link href="/" className="label press text-mute hover:text-hot-ink">
					← Back to the site
				</Link>
			</div>
		</main>
	);
}

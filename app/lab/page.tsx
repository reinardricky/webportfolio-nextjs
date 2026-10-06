import type { Metadata } from 'next';
import Link from 'next/link';

import Hero from '@/components/site/Hero';
import type { HeroVariant } from '@/lib/site';

// Internal design tool — reachable by URL, kept out of search results.
export const metadata: Metadata = {
	title: 'Hero options',
	robots: { index: false, follow: false },
};

const OPTIONS: { variant: HeroVariant; name: string }[] = [
	{ variant: 'portrait', name: 'Option 1 — Portrait plate' },
	{ variant: 'runestone', name: 'Option 2 — 3D runestone' },
];

/**
 * Both hero candidates at full size, exactly as they render on the site.
 * Choose one by setting `hero` in lib/site.ts.
 */
export default function Lab() {
	return (
		<main>
			{OPTIONS.map(({ variant, name }) => (
				<div key={variant} id={variant}>
					<div className="pad relative z-10 flex h-14 items-center justify-between border-y border-line bg-bg">
						<p className="label text-hot">{name}</p>
						<p className="label hidden sm:block">
							hero: &apos;{variant}&apos; in lib/site.ts
						</p>
					</div>
					{/* The hero reserves room for the site nav; the bar above stands in for it. */}
					<div className="-mt-14">
						<Hero variant={variant} id={`hero-${variant}`} />
					</div>
				</div>
			))}

			<div className="pad py-10">
				<Link href="/" className="label press text-mute hover:text-hot">
					← Back to the site
				</Link>
			</div>
		</main>
	);
}

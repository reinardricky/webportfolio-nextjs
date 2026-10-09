import type { Metadata } from 'next';
import Link from 'next/link';

import About from '@/components/site/About';
import Experience from '@/components/site/Experience';
import Hero from '@/components/site/Hero';
import Skills from '@/components/site/Skills';

import { PAIRINGS } from './fonts';
import TypePicker from './TypePicker';

// Internal design tool — reachable by URL, kept out of search results.
export const metadata: Metadata = {
	title: 'Type pairings',
	robots: { index: false, follow: false },
};

/**
 * The real sections, re-set in each candidate pairing. Choose one, then move
 * its three faces into app/layout.tsx.
 */
export default async function TypeLab({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
	const { type } = await searchParams;

	return (
		<main>
			<TypePicker pairings={PAIRINGS} initial={PAIRINGS.some((p) => p.id === type) ? type : undefined}>
				<Hero id="type-hero" />
				<About />
				<Experience />
				<Skills />
			</TypePicker>

			<div className="pad flex gap-8 py-10">
				<Link href="/lab" className="label press text-mute hover:text-hot-ink">
					← Hero layouts
				</Link>
				<Link href="/" className="label press text-mute hover:text-hot-ink">
					Back to the site
				</Link>
			</div>
		</main>
	);
}

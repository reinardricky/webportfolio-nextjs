import type { Metadata } from 'next';
import Link from 'next/link';

import ScenePicker from './ScenePicker';

export const metadata: Metadata = { title: 'Hero scene options' };

export default function Lab() {
	return (
		<main className="pad py-14">
			<p className="label text-hot">Design lab — hero scene</p>
			<h1 className="mt-5 font-display text-display font-light text-ink">
				Four options for the plate
			</h1>
			<p className="mt-5 max-w-2xl leading-relaxed text-dim">
				The Runestone layout is now live on the site. These are alternatives for the 3D in
				the hero plate, shown in the real frame at the real size. Pick one and I will set
				it as the default and delete the rest.
			</p>

			<div className="mt-12">
				<ScenePicker />
			</div>

			<Link href="/" className="label mt-12 inline-block text-mute transition-colors hover:text-hot">
				← Back to the site
			</Link>
		</main>
	);
}

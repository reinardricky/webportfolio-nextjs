import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Not found' };

export default function NotFound() {
	return (
		<section className="shell flex min-h-[70svh] flex-col justify-center py-28">
			<p className="label text-rune">Error — 404</p>
			<h1 className="mt-6 font-display text-display font-bold text-frost uppercase">
				Nothing <span className="text-rune">here</span>
			</h1>
			<p className="mt-6 max-w-md text-lede text-frost-dim">
				That page does not exist — it may have moved, or never have been.
			</p>
			<Link
				href="/"
				className="mt-10 inline-flex w-fit items-center gap-3 border border-rune bg-rune px-6 py-3.5 font-display text-sm font-semibold tracking-[0.18em] text-void uppercase transition-colors hover:bg-transparent hover:text-rune"
			>
				Back home
			</Link>
		</section>
	);
}

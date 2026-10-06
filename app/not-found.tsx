import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'No such record' };

export default function NotFound() {
	return (
		<section className="pad flex min-h-[70svh] flex-col justify-center py-24">
			<p className="label text-hot">Error — 404</p>
			<h1 className="mt-6 font-display text-display font-light text-ink">No such record.</h1>
			<p className="mt-5 max-w-md leading-relaxed text-dim">
				That page is not in the catalogue — it may have been moved, or never accessioned.
			</p>
			<Link
				href="/"
				className="label mt-9 inline-flex w-fit border border-hot px-5 py-2.5 text-hot transition-colors hover:bg-hot hover:text-ink"
			>
				Return to the record
			</Link>
		</section>
	);
}

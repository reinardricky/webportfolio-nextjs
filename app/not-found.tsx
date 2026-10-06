import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
	return (
		<section className="pad flex min-h-[70svh] flex-col justify-center py-24">
			<p className="label text-hot">Error — 404</p>
			<h1 className="mt-6 font-display text-display font-light tracking-[-0.02em] text-ink">Page not found.</h1>
			<p className="mt-5 max-w-md leading-relaxed text-dim">
				Sorry, this page does not exist. It may have been moved or deleted.
			</p>
			<Link
				href="/"
				className="btn btn-primary label mt-9 w-fit"
			>
				<span aria-hidden>←</span>
				Back to home
			</Link>
		</section>
	);
}

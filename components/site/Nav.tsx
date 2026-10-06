'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';

import { site } from '@/lib/site';

export default function Nav() {
	const [open, setOpen] = useState(false);

	const subscribeScroll = useCallback((onChange: () => void) => {
		window.addEventListener('scroll', onChange, { passive: true });
		return () => window.removeEventListener('scroll', onChange);
	}, []);

	const scrolled = useSyncExternalStore(
		subscribeScroll,
		() => window.scrollY > 24,
		() => false,
	);

	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
		window.addEventListener('keydown', onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener('keydown', onKey);
		};
	}, [open]);

	return (
		<>
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-200 focus:bg-hot focus:px-4 focus:py-2 focus:text-ink"
			>
				Skip to content
			</a>

			{/* The specimen registration bar, pinned to the top of the sheet. */}
			<header
				className={`fixed inset-x-0 top-0 z-100 border-b transition-colors duration-500 ${
					scrolled ? 'border-line bg-bg/92 backdrop-blur-md' : 'border-line/60 bg-bg/70 backdrop-blur-sm'
				}`}
			>
				<nav className="pad flex h-14 items-center gap-x-8" aria-label="Primary">
					<a href="#top" className="label text-ink transition-colors hover:text-hot">
						Specimen <span className="text-hot">RR-001</span>
					</a>

					<ul className="ml-auto hidden items-center gap-7 md:flex">
						{site.nav.map((item) => (
							<li key={item.href}>
								<a href={item.href} className="group flex items-baseline gap-2">
									<span className="label text-line-lit transition-colors group-hover:text-hot">
										§{item.index}
									</span>
									<span className="label text-dim transition-colors group-hover:text-ink">
										{item.label}
									</span>
								</a>
							</li>
						))}
					</ul>

					<button
						type="button"
						onClick={() => setOpen(true)}
						className="label ml-auto border border-line-lit px-3 py-1.5 text-ink transition-colors hover:border-hot hover:text-hot md:hidden"
						aria-expanded={open}
						aria-controls="mobile-index"
					>
						Index
					</button>
				</nav>
			</header>

			<div id="mobile-index" hidden={!open} className="fixed inset-0 z-200 bg-bg md:hidden">
				<div className="pad flex h-14 items-center justify-between border-b border-line">
					<span className="label text-ink">
						Specimen <span className="text-hot">RR-001</span>
					</span>
					<button
						type="button"
						onClick={() => setOpen(false)}
						className="label border border-line-lit px-3 py-1.5 text-ink"
					>
						Close
					</button>
				</div>

				<ul className="pad mt-4">
					{site.nav.map((item) => (
						<li key={item.href} className="border-b border-line">
							<a
								href={item.href}
								onClick={() => setOpen(false)}
								className="flex items-baseline gap-4 py-5"
							>
								<span className="label text-hot">§{item.index}</span>
								<span className="font-display text-2xl font-light">{item.label}</span>
							</a>
						</li>
					))}
				</ul>

				<div className="pad mt-8 flex gap-6">
					{site.socials.map((s) => (
						<a
							key={s.href}
							href={s.href}
							target="_blank"
							rel="noreferrer"
							className="label text-dim transition-colors hover:text-hot"
						>
							{s.label} ↗
						</a>
					))}
				</div>
			</div>
		</>
	);
}

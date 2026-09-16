'use client';

import { useCallback, useEffect, useState, useSyncExternalStore } from 'react';

import { toRunic } from '@/lib/runes';
import { site } from '@/lib/site';

export default function Nav() {
	const [open, setOpen] = useState(false);

	const subscribeScroll = useCallback((onChange: () => void) => {
		window.addEventListener('scroll', onChange, { passive: true });
		return () => window.removeEventListener('scroll', onChange);
	}, []);

	// The masthead only grows a background once the page has moved.
	const scrolled = useSyncExternalStore(
		subscribeScroll,
		() => window.scrollY > 24,
		() => false,
	);

	// Lock the page behind the mobile sheet, and let Escape close it.
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
				className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:bg-rune focus:px-4 focus:py-2 focus:text-void"
			>
				Skip to content
			</a>

			<header
				className={`fixed inset-x-0 top-0 z-100 transition-colors duration-500 ${
					scrolled
						? 'border-b border-edge bg-void/85 backdrop-blur-md'
						: 'border-b border-transparent'
				}`}
			>
				<nav className="shell flex h-20 items-center justify-between" aria-label="Primary">
					<a
						href="#top"
						className="group flex items-center gap-3"
						aria-label={`${site.name} — back to top`}
					>
						<span className="runic text-lg leading-none transition-colors group-hover:text-rune-bright">
							ᚱᚱ
						</span>
						<span className="hidden font-display text-sm font-semibold tracking-[0.3em] text-frost-dim uppercase transition-colors group-hover:text-frost sm:block">
							Reinard
						</span>
					</a>

					<ul className="hidden items-center gap-10 md:flex">
						{site.nav.map((item) => (
							<li key={item.href}>
								<a href={item.href} className="group flex items-baseline gap-2">
									<span className="label text-edge-lit transition-colors group-hover:text-rune">
										{item.index}
									</span>
									<span className="font-display text-sm font-semibold tracking-[0.2em] text-frost-dim uppercase transition-colors group-hover:text-frost">
										{item.label}
									</span>
								</a>
							</li>
						))}
					</ul>

					<button
						type="button"
						onClick={() => setOpen(true)}
						className="label border border-edge-lit px-3 py-2 text-frost transition-colors hover:border-rune hover:text-rune md:hidden"
						aria-expanded={open}
						aria-controls="mobile-menu"
					>
						Menu
					</button>
				</nav>
			</header>

			{/* Mobile sheet — full-bleed editorial index. */}
			<div
				id="mobile-menu"
				hidden={!open}
				className="fixed inset-0 z-200 bg-void md:hidden"
			>
				<div className="shell flex h-20 items-center justify-between">
					<span className="runic text-lg leading-none">ᚱᚱ</span>
					<button
						type="button"
						onClick={() => setOpen(false)}
						className="label border border-edge-lit px-3 py-2 text-frost"
					>
						Close
					</button>
				</div>

				<ul className="shell mt-6 border-t border-edge">
					{site.nav.map((item) => (
						<li key={item.href} className="border-b border-edge">
							<a
								href={item.href}
								onClick={() => setOpen(false)}
								className="flex items-baseline gap-4 py-6"
							>
								<span className="label text-rune">{item.index}</span>
								<span className="font-display text-3xl font-semibold tracking-[0.12em] uppercase">
									{item.label}
								</span>
								<span className="runic ml-auto text-sm opacity-60" aria-hidden>
									{toRunic(item.label)}
								</span>
							</a>
						</li>
					))}
				</ul>

				<div className="shell mt-10 flex gap-6">
					{site.socials.map((s) => (
						<a
							key={s.href}
							href={s.href}
							target="_blank"
							rel="noreferrer"
							className="label text-frost-dim transition-colors hover:text-rune"
						>
							{s.label}
						</a>
					))}
				</div>
			</div>
		</>
	);
}

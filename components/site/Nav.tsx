'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';

import { site } from '@/lib/site';

/** Tracks which section sits in the reading band of the viewport. */
function useActiveSection(ids: readonly string[]): string | null {
	const [active, setActive] = useState<string | null>(null);

	useEffect(() => {
		if (typeof IntersectionObserver === 'undefined') return;
		const els = ids
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);

		const io = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) setActive(entry.target.id);
				}
			},
			// A thin band just above centre: whichever section crosses it wins.
			{ rootMargin: '-40% 0px -55% 0px' },
		);

		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, [ids]);

	return active;
}

const SECTION_IDS = ['top', ...site.nav.map((item) => item.href.slice(1))];

export default function Nav() {
	const [open, setOpen] = useState(false);
	const trigger = useRef<HTMLButtonElement>(null);
	const sheet = useRef<HTMLDivElement>(null);
	const closeBtn = useRef<HTMLButtonElement>(null);
	const active = useActiveSection(SECTION_IDS);

	const subscribeScroll = useCallback((onChange: () => void) => {
		window.addEventListener('scroll', onChange, { passive: true });
		return () => window.removeEventListener('scroll', onChange);
	}, []);

	const scrolled = useSyncExternalStore(
		subscribeScroll,
		() => window.scrollY > 24,
		() => false,
	);

	/*
	 * Mobile links: unlock the page *before* scrolling. Letting the browser
	 * follow the anchor while body overflow is still hidden, then restoring
	 * it mid-animation, can cut the smooth scroll short of the section.
	 */
	const goTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
		const target = document.getElementById(href.slice(1));
		if (!target) return;
		e.preventDefault();
		document.body.style.overflow = '';
		setOpen(false);
		requestAnimationFrame(() => {
			target.scrollIntoView({ block: 'start' });
			history.replaceState(null, '', href);
		});
	}, []);

	const close = useCallback(() => {
		setOpen(false);
		trigger.current?.focus();
	}, []);

	useEffect(() => {
		if (!open) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		closeBtn.current?.focus();

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				close();
				return;
			}
			// Keep Tab inside the sheet while it is open.
			if (e.key !== 'Tab' || !sheet.current) return;
			const focusable = sheet.current.querySelectorAll<HTMLElement>('a[href], button');
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		};

		window.addEventListener('keydown', onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener('keydown', onKey);
		};
	}, [open, close]);

	return (
		<>
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-(--z-skip) focus:bg-hot focus:px-4 focus:py-2 focus:text-bg"
			>
				Skip to content
			</a>

			{/* The specimen registration bar, pinned to the top of the sheet. */}
			<header
				className={`fixed inset-x-0 top-0 z-(--z-header) border-b transition-colors duration-500 ${
					scrolled
						? 'border-line bg-bg/90 backdrop-blur-md'
						: 'border-transparent bg-bg/40 backdrop-blur-[2px]'
				}`}
			>
				<nav className="pad flex h-(--header-h) items-center gap-x-8" aria-label="Primary">
					<a href="#top" className="label press text-ink hover:text-hot-ink">
						Specimen <span className="text-hot-ink">{site.specimen}</span>
					</a>

					<ul className="ml-auto hidden items-center gap-1 md:flex">
						{site.nav.map((item) => {
							const current = active === item.href.slice(1);
							return (
								<li key={item.href}>
									<a
										href={item.href}
										aria-current={current ? 'location' : undefined}
										className="group press relative flex items-baseline gap-2 px-3 py-2"
									>
										<span
											className={`label transition-colors ${
												current ? 'text-hot-ink' : 'text-line-lit group-hover:text-hot-ink'
											}`}
										>
											§{item.index}
										</span>
										<span
											className={`label transition-colors ${
												current ? 'text-ink' : 'text-dim group-hover:text-ink'
											}`}
										>
											{item.label}
										</span>
										{/* Ochre tick under the section you are reading. */}
										<span
											aria-hidden
											className={`absolute inset-x-3 -bottom-px h-px origin-left bg-hot transition-transform duration-500 ease-cut ${
												current ? 'scale-x-100' : 'scale-x-0'
											}`}
										/>
									</a>
								</li>
							);
						})}
					</ul>

					<button
						ref={trigger}
						type="button"
						onClick={() => setOpen(true)}
						className="btn label ml-auto px-3 py-1.5 text-ink md:hidden"
						aria-expanded={open}
						aria-controls="mobile-index"
						aria-haspopup="dialog"
					>
						Menu
					</button>
				</nav>
			</header>

			<div
				ref={sheet}
				id="mobile-index"
				role="dialog"
				aria-modal="true"
				aria-label="Site menu"
				inert={!open}
				// Visibility flips instantly on open (so focus can land) and only
				// lags on close, letting the fade finish before it hides.
				className={`fixed inset-0 z-(--z-overlay) bg-bg duration-300 ease-cut md:hidden ${
					open
						? 'visible opacity-100 transition-opacity'
						: 'invisible opacity-0 transition-[opacity,visibility]'
				}`}
			>
				<div className="pad flex h-(--header-h) items-center justify-between border-b border-line">
					<span className="label text-ink">
						Specimen <span className="text-hot-ink">{site.specimen}</span>
					</span>
					<button
						ref={closeBtn}
						type="button"
						onClick={close}
						className="btn label px-3 py-1.5 text-ink"
					>
						Close
					</button>
				</div>

				<ul className="pad mt-4">
					{site.nav.map((item, i) => (
						<li
							key={item.href}
							className={`border-b border-line transition-[opacity,transform] duration-500 ease-cut ${
								open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
							}`}
							style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
						>
							<a
								href={item.href}
								onClick={(e) => goTo(e, item.href)}
								aria-current={active === item.href.slice(1) ? 'location' : undefined}
								className="press flex items-baseline gap-4 py-5 aria-[current]:text-hot-ink"
							>
								<span className="label text-hot-ink tabular-nums">§{item.index}</span>
								<span className="font-display text-3xl font-light">
									{item.label}
								</span>
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
							className="label press text-dim hover:text-hot-ink"
						>
							{s.label} ↗
						</a>
					))}
				</div>
			</div>
		</>
	);
}

'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
	children: ReactNode;
	className?: string;
	/** Seconds of stagger when revealing a run of siblings. */
	delay?: number;
};

/**
 * Enters once on scroll, driven by CSS — the effect only flips a data
 * attribute, so there is no React state and no animation library.
 * Reduced motion and no-JS both fall through to "already visible".
 */
export default function Reveal({ children, className, delay = 0 }: Props) {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const show = () => el.setAttribute('data-shown', 'true');

		if (
			typeof IntersectionObserver === 'undefined' ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			show();
			return;
		}

		const io = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
				show();
				io.disconnect();
			},
			{ rootMargin: '0px 0px -8% 0px' },
		);

		io.observe(el);
		return () => io.disconnect();
	}, []);

	return (
		<div
			ref={ref}
			data-reveal
			className={className}
			style={delay ? { transitionDelay: `${delay}s` } : undefined}
		>
			{children}
		</div>
	);
}

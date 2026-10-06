import type { CSSProperties } from 'react';

import PortraitPlate from '@/components/site/PortraitPlate';
import HeroVisual from '@/components/three/HeroVisual';
import { site, type HeroVariant } from '@/lib/site';

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

/**
 * Full-height opening. The name is set at poster scale in container units,
 * so its relationship to the visual holds at every width. With the
 * runestone, the two lines straddle the stone in depth: the first runs
 * behind it, the second passes in front.
 */
export default function Hero({
	variant = site.hero,
	id = 'top',
}: {
	variant?: HeroVariant;
	id?: string;
}) {
	const stone = variant === 'runestone';

	return (
		<section id={id} className="relative isolate overflow-hidden border-b border-line">
			{/* One low ochre light, set behind where the visual stands. */}
			<div
				aria-hidden
				className="absolute inset-0 -z-10 bg-[radial-gradient(50%_30%_at_50%_80%,color-mix(in_srgb,var(--color-hot)_11%,transparent),transparent_72%)] lg:bg-[radial-gradient(30%_62%_at_80%_56%,color-mix(in_srgb,var(--color-hot)_12%,transparent),transparent_72%)]"
			/>

			<div className="pad">
				<div className="@container relative flex flex-col pt-(--header-h) pb-10 lg:min-h-[max(100svh,46rem)] lg:pb-0">
					{/*
					 * The visual. Below the copy on small screens — message first, the
					 * stone supporting it, nothing overlapping — and set to the right on large.
					 */}
					<div
						className={`relative z-10 lg:absolute lg:inset-y-0 lg:mx-0 lg:h-auto ${
							stone
								? 'order-last mx-auto mt-6 h-[38svh] min-h-64 w-full max-w-sm lg:order-none lg:-right-[7%] lg:mt-0 lg:min-h-0 lg:w-[44%] lg:max-w-none'
								: 'mt-10 lg:right-0 lg:mt-0 lg:flex lg:w-[34%] lg:items-center'
						}`}
					>
						{stone ? (
							<>
								{/* Warm pool of light on the ground the stone rises from. */}
								<div
									aria-hidden
									className="absolute inset-x-[10%] bottom-[5%] h-[20%] rounded-[50%] bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-hot)_16%,transparent),transparent)]"
								/>
								{/* The foot dissolves into the dark instead of ending on a hard edge. */}
								<HeroVisual
									scene={site.heroScene}
									className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_78%,transparent_97%)]"
								/>
							</>
						) : (
							<div className="rise w-full" style={delay(250)}>
								<PortraitPlate />
							</div>
						)}
					</div>

					<div
						className={`relative flex flex-col pt-12 lg:flex-1 lg:justify-center lg:pt-10 lg:pb-20 ${
							stone ? '' : 'order-first pb-6'
						}`}
					>
						<p className="label rise relative z-20 text-hot" style={delay(0)}>
							{site.role} — {site.location || 'Indonesia'}
							{site.availability ? (
								<span className="ml-3 text-cool">· {site.availability}</span>
							) : null}
						</p>

						<h1 className="mt-6 font-display text-[12.4vw] leading-[0.9] font-light tracking-[-0.035em] text-ink lg:mt-8 lg:text-[10.4cqw]">
							{/* Behind the stone. */}
							<span className="relative z-0 block overflow-hidden pb-[0.06em]">
								<span className="line-up block" style={delay(120)}>
									Pascalis Reinard
								</span>
							</span>
							{/* In front of it. */}
							<span className="relative z-20 block overflow-hidden pb-[0.14em] pl-[14%] lg:pl-[34%]">
								<span className="line-up block text-dim italic" style={delay(260)}>
									Rickyputra
								</span>
							</span>
						</h1>

						<div className="relative z-20 mt-8 max-w-[40ch] lg:mt-12">
							<p className="rise text-lg leading-relaxed text-dim" style={delay(420)}>
								I build responsive websites and mobile apps with React, Next.js, and React
								Native.
							</p>

							<div className="rise mt-8 flex flex-wrap items-center gap-3" style={delay(520)}>
								<a href="#contact" className="btn btn-primary label">
									Get in touch <span className="arrow" aria-hidden>→</span>
								</a>
								<a href="#experience" className="btn label">
									See my experience
								</a>
								{site.resumeUrl ? (
									<a
										href={site.resumeUrl}
										target="_blank"
										rel="noreferrer"
										className="label press px-2 py-2.5 text-dim underline decoration-line-lit underline-offset-4 hover:text-hot"
									>
										Résumé ↗
									</a>
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

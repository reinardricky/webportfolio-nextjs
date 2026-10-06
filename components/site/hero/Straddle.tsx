import { Actions, Eyebrow, Glow, Intro, Line, Stone } from './parts';

/**
 * The name straddles the stone in depth: the first line runs behind it,
 * the second passes in front. Stone right; copy left. On phones the copy
 * comes first and the stone sits below it.
 */
export default function Straddle({ id }: { id?: string }) {
	return (
		<section id={id} className="relative isolate overflow-hidden border-b border-line">
			<Glow className="bg-[radial-gradient(50%_30%_at_50%_80%,color-mix(in_srgb,var(--color-hot)_11%,transparent),transparent_72%)] lg:bg-[radial-gradient(30%_62%_at_80%_56%,color-mix(in_srgb,var(--color-hot)_12%,transparent),transparent_72%)]" />

			<div className="pad">
				<div className="@container relative flex flex-col pt-(--header-h) pb-10 lg:min-h-[max(100svh,46rem)] lg:pb-0">
					<Stone className="relative z-10 order-last mx-auto mt-6 h-[38svh] min-h-64 w-full max-w-sm lg:absolute lg:inset-y-0 lg:-right-[7%] lg:order-none lg:mt-0 lg:h-auto lg:min-h-0 lg:w-[44%] lg:max-w-none" />

					<div className="relative flex flex-col pt-12 lg:flex-1 lg:justify-center lg:pt-10 lg:pb-20">
						<Eyebrow className="relative z-20" />

						<h1 className="mt-6 font-display text-[12.4vw] leading-[0.9] font-light tracking-[-0.035em] text-ink lg:mt-8 lg:text-[10.4cqw]">
							{/* Behind the stone. */}
							<Line ms={120} className="relative z-0 pb-[0.06em]">
								Pascalis Reinard
							</Line>
							{/* In front of it. */}
							<Line ms={260} className="relative z-20 pb-[0.14em] pl-[14%] lg:pl-[34%]" inner="text-dim italic">
								Rickyputra
							</Line>
						</h1>

						<div className="relative z-20 mt-8 max-w-[40ch] lg:mt-12">
							<Intro />
							<Actions className="mt-8" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

import { site } from '@/lib/site';
import { Actions, Eyebrow, Glow, Intro, Line, Stone } from './parts';

/**
 * Film-poster composition. The given name runs edge to edge in capitals
 * and the stone rises in front of its lower half, dead centre. Everything
 * else is pushed to the corners. Phones keep the order: name, copy, stone.
 */
export default function Monument({ id }: { id?: string }) {
	const [first, ...rest] = site.name.split(' ');
	const last = rest.at(-1) ?? '';

	return (
		<section id={id} className="relative isolate overflow-hidden border-b border-line">
			<Glow className="bg-[radial-gradient(50%_30%_at_50%_82%,color-mix(in_srgb,var(--color-hot)_11%,transparent),transparent_72%)] lg:bg-[radial-gradient(34%_55%_at_50%_72%,color-mix(in_srgb,var(--color-hot)_13%,transparent),transparent_72%)]" />

			<div className="pad">
				<div className="@container relative flex flex-col pt-(--header-h) pb-10 lg:min-h-[max(100svh,46rem)] lg:pb-14">
					<div className="relative pt-12 text-center lg:pt-10">
						<Eyebrow className="relative z-20" />

						<h1 className="mt-6 font-display font-light text-ink lg:mt-8">
							<span className="sr-only">{site.name}</span>
							<span aria-hidden>
								<Line ms={80} className="relative z-20 text-left text-[7vw] leading-none italic text-dim lg:text-[3.4cqw]">
									{first}
								</Line>
								{/* Behind the stone. */}
								<Line
									ms={160}
									className="relative z-0 -my-[0.04em] text-[18vw] leading-[0.92] tracking-[-0.03em] uppercase lg:text-[17.2cqw]"
								>
									{site.firstName}
								</Line>
								<Line ms={260} className="relative z-20 text-right text-[7vw] leading-none italic text-dim lg:text-[3.4cqw]">
									{last}
								</Line>
							</span>
						</h1>
					</div>

					<Stone
						fade={80}
						className="relative z-10 order-3 mx-auto mt-6 h-[38svh] min-h-64 w-full max-w-sm lg:absolute lg:top-[6%] lg:bottom-0 lg:left-1/2 lg:mt-0 lg:h-auto lg:w-[36%] lg:max-w-none lg:-translate-x-1/2"
					/>

					<div className="relative z-20 order-2 mt-8 grid gap-8 lg:mt-auto lg:grid-cols-12 lg:items-end">
						<Intro className="max-w-[34ch] lg:col-span-4" />
						<Actions className="lg:col-span-4 lg:col-start-9 lg:justify-end" />
					</div>
				</div>
			</div>
		</section>
	);
}

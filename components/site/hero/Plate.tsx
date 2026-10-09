import { site } from '@/lib/site';
import { Actions, Eyebrow, Glow, Intro, Line, Stone } from './parts';

/**
 * Leader line from a point on the stone out to a label. Each callout is
 * bounded on both sides — the dot on the stone, an inset from the plate's
 * edge — so on narrow plates the line shortens and the label wraps
 * instead of spilling out of the frame.
 */
function Callout({
	className,
	term,
	value,
	flip = false,
}: {
	className: string;
	term: string;
	value: string;
	flip?: boolean;
}) {
	return (
		<div
			className={`pointer-events-none absolute z-20 hidden items-center gap-3 lg:flex ${flip ? 'flex-row-reverse text-right' : ''} ${className}`}
		>
			<span className="size-1.5 shrink-0 bg-hot" />
			<span className="h-px w-[7cqw] min-w-4 shrink bg-hot/50" />
			<span className="label min-w-0 leading-relaxed">
				{term}
				<br />
				<span className="text-ink">{value}</span>
			</span>
		</div>
	);
}

function Corner({ className }: { className: string }) {
	return <span aria-hidden className={`absolute size-3 border-hot ${className}`} />;
}

/**
 * The stone as a catalogued specimen: mounted in a plate with corner
 * marks, a header, a scale bar, and callouts naming what is cut into it.
 * Copy sits to the right. Phones show the copy first, the plate below.
 */
export default function Plate({ id }: { id?: string }) {
	const last = site.name.split(' ').at(-1) ?? '';

	return (
		<section id={id} className="relative isolate overflow-hidden border-b border-line">
			<Glow className="bg-[radial-gradient(50%_30%_at_50%_80%,color-mix(in_srgb,var(--color-hot)_10%,transparent),transparent_72%)] lg:bg-[radial-gradient(30%_55%_at_28%_58%,color-mix(in_srgb,var(--color-hot)_11%,transparent),transparent_72%)]" />

			<div className="pad">
				<div className="@container relative grid grid-cols-1 pt-(--header-h) pb-10 lg:min-h-[max(100svh,46rem)] lg:grid-cols-12 lg:gap-x-10 lg:pb-0">
					<figure className="rise relative order-last mt-10 lg:order-none lg:col-span-6 lg:my-14 lg:mt-14" style={{ '--d': '200ms' } as React.CSSProperties}>
						<div className="relative h-[46svh] min-h-72 border border-line-lit/70 bg-bg-deep/50 lg:h-full lg:min-h-0">
							<div className="label absolute inset-x-0 top-0 z-20 flex justify-between border-b border-line px-4 py-3">
								<span>
									Plate I — <span className="text-hot-ink">{site.specimen}</span>
								</span>
								<span className="hidden sm:inline">Granite · red ochre</span>
							</div>

							<Stone fade={84} className="absolute inset-x-0 top-10 bottom-10" />

							<Callout className="top-[50%] right-[63%] left-4" flip term="Serpent band" value={`${last} · ${site.role}`} />
							<Callout className="top-[40%] right-4 left-[51%]" term="Inscription" value={`${site.firstName}, in Elder Futhark`} />
							<Callout className="top-[68%] right-4 left-[58%]" term="Pigment" value="Red ochre, worked into the cut" />

							<div className="label absolute inset-x-0 bottom-0 z-20 flex items-center justify-between border-t border-line px-4 py-3">
								<span>
									Fig. 1 <span className="text-mute motion-reduce:hidden">· <span className="pointer-coarse:hidden">Drag</span><span className="hidden pointer-coarse:inline">Swipe</span> to turn</span>
								</span>
								{/* Scale bar, as on a survey photograph. */}
								<span className="flex items-center gap-2">
									<span className="flex h-1.5 w-16 border border-mute">
										<span className="w-1/2 bg-mute" />
									</span>
									50 cm
								</span>
							</div>
						</div>
						<Corner className="-top-1.5 -left-1.5 border-t border-l" />
						<Corner className="-top-1.5 -right-1.5 border-t border-r" />
						<Corner className="-bottom-1.5 -left-1.5 border-b border-l" />
						<Corner className="-right-1.5 -bottom-1.5 border-r border-b" />
					</figure>

					<div className="relative flex flex-col pt-12 lg:col-span-5 lg:col-start-8 lg:justify-center lg:pt-0">
						<Eyebrow />
						<h1 className="mt-6 font-display text-[11vw] leading-[0.92] font-light tracking-[-0.01em] text-ink lg:mt-8 lg:text-[5cqw]">
							<Line ms={100} className="pb-[0.04em]">
								Pascalis Reinard
							</Line>
							<Line ms={180} className="pb-[0.14em]" inner="text-dim italic">
								{last}
							</Line>
						</h1>
						<Intro className="mt-8 max-w-[40ch] lg:mt-10" />
						<Actions className="mt-8" />
					</div>
				</div>
			</div>
		</section>
	);
}

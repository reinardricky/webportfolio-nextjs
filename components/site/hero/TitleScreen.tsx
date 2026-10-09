import { site } from '@/lib/site';
import { delay, Eyebrow, Glow, Intro, Line, Stone } from './parts';

const MENU = [
	{ label: 'Get in touch', href: '#contact' },
	{ label: 'See my experience', href: '#experience' },
	...(site.resumeUrl ? [{ label: 'Résumé', href: site.resumeUrl, external: true }] : []),
] as { label: string; href: string; external?: boolean }[];

/**
 * A game's title screen: the stone owns the scene, the copy sits low and
 * left over a dark scrim, and the actions are a menu with a selection
 * marker that follows hover and keyboard focus.
 */
export default function TitleScreen({ id }: { id?: string }) {
	return (
		<section
			id={id}
			className="relative isolate flex min-h-svh overflow-hidden border-b border-line lg:min-h-[max(100svh,46rem)]"
		>
			<Glow className="bg-[radial-gradient(60%_40%_at_50%_34%,color-mix(in_srgb,var(--color-hot)_12%,transparent),transparent_72%)] lg:bg-[radial-gradient(34%_62%_at_70%_58%,color-mix(in_srgb,var(--color-hot)_14%,transparent),transparent_72%)]" />

			<Stone
				fade={82}
				className="absolute inset-x-0 top-(--header-h) h-[52svh] opacity-75 lg:inset-x-auto lg:top-0 lg:right-[8%] lg:h-full lg:w-[46%] lg:opacity-100"
			/>

			{/* Scrim: keeps the copy legible where it crosses the scene. */}
			<div
				aria-hidden
				className="absolute inset-0 z-10 bg-[linear-gradient(to_top,var(--color-bg)_42%,transparent_72%)] lg:bg-[linear-gradient(to_right,var(--color-bg)_22%,transparent_58%),linear-gradient(to_top,var(--color-bg)_0%,transparent_30%)]"
			/>

			<div className="pad relative z-20 flex w-full">
				<div className="@container flex w-full flex-col justify-end pt-(--header-h) pb-12 lg:pb-16">
					<Eyebrow />

					<h1 className="mt-5 font-display text-[12.4vw] leading-[0.92] font-light tracking-[-0.03em] text-ink lg:text-[7.4cqw]">
						<Line ms={120} className="pb-[0.04em]">
							Pascalis Reinard
						</Line>
						<Line ms={240} className="pb-[0.14em]" inner="text-dim italic">
							{site.name.split(' ').at(-1)}
						</Line>
					</h1>

					<Intro className="mt-6 max-w-[40ch]" ms={380} />

					<nav aria-label="Start" className="rise mt-10" style={delay(480)}>
						<ul className="group/menu space-y-1">
							{MENU.map((item, i) => (
								<li key={item.href}>
									<a
										href={item.href}
										{...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
										className={`group press flex items-baseline gap-4 py-1.5 font-display text-2xl font-light transition-colors md:text-3xl ${
											i === 0 ? 'text-ink' : 'text-dim hover:text-ink focus-visible:text-ink'
										}`}
									>
										{/* Selection marker: on the first item until another is hovered or focused. */}
										<span
											aria-hidden
											className={`w-4 text-base text-hot-ink transition-[opacity,transform] duration-300 ease-cut ${
												i === 0
													? 'opacity-100 group-hover/menu:opacity-0 group-hover:!opacity-100'
													: '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100'
											}`}
										>
											▸
										</span>
										<span className="transition-transform duration-300 ease-cut group-hover:translate-x-1">
											{item.label}
										</span>
									</a>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>
		</section>
	);
}

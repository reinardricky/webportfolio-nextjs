import type { Metadata } from 'next';

import LabBar from '@/components/lab/LabBar';
import Visual from '@/components/lab/yggdrasil/Visual';
import { toRunic } from '@/lib/runes';
import { site } from '@/lib/site';
import { skills } from '@/lib/skills';

export const metadata: Metadata = { title: 'Design I — Yggdrasil' };

/* Sections named for the realms they sit in — the page is a descent. */
const REALMS = [
	{ numeral: 'I', realm: 'Asgard', label: 'About' },
	{ numeral: 'II', realm: 'Svartalfheim', label: 'Craft' },
	{ numeral: 'III', realm: 'Midgard', label: 'Send word' },
];

export default function Yggdrasil() {
	return (
		<div className="theme-yggdrasil min-h-screen pb-20">
			{/* ---------------- Hero ---------------- */}
			<section className="relative flex min-h-[100svh] items-center overflow-hidden">
				<Visual className="pointer-events-none absolute inset-0 opacity-70 md:left-[38%] md:opacity-100" />

				{/* Light bleeding through the canopy. */}
				<div
					className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_60%_35%,color-mix(in_srgb,var(--c-cool)_12%,transparent),transparent_70%)]"
					aria-hidden
				/>

				<div className="relative mx-auto w-full max-w-6xl px-6 md:px-12">
					<p className="font-mono text-[11px] tracking-[0.35em] text-cool uppercase">
						{site.role}
					</p>

					<h1 className="mt-8 font-hero text-[clamp(3rem,8.5vw,7rem)] leading-[0.95] font-light text-ink">
						Pascalis Reinard
						<br />
						<em className="text-hot not-italic italic">Rickyputra</em>
					</h1>

					<p
						className="mt-6 font-[family-name:var(--font-runic-src)] text-sm tracking-[0.3em] text-cool opacity-60"
						aria-hidden
					>
						{toRunic('yggdrasil')}
					</p>

					<p className="mt-10 max-w-md text-lg leading-relaxed text-dim md:text-xl">
						A software engineer who builds for the web — specialised in the frontend,
						comfortable across the whole stack.
					</p>

					<div className="mt-10 flex flex-wrap items-center gap-6">
						<a
							href="#about"
							className="group relative py-2 text-sm tracking-[0.15em] text-ink uppercase"
						>
							Climb down
							<span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-100 bg-hot transition-transform duration-500 group-hover:scale-x-0" />
							<span className="absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-cool transition-transform delay-200 duration-500 group-hover:scale-x-100" />
						</a>
						<a
							href="#contact"
							className="py-2 text-sm tracking-[0.15em] text-mute uppercase transition-colors hover:text-cool"
						>
							Send word
						</a>
					</div>
				</div>
			</section>

			{/* ---------------- Body ---------------- */}
			<div className="relative mx-auto max-w-6xl px-6 md:px-12">
				{/* The trunk: one continuous line the sections hang off. */}
				<div
					className="absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-transparent via-line-lit to-transparent md:left-12"
					aria-hidden
				/>

				{REALMS.map((realm, i) => (
					<section
						key={realm.label}
						id={i === 0 ? 'about' : i === 1 ? 'skills' : 'contact'}
						className="relative scroll-mt-24 py-24 pl-10 md:pl-20"
					>
						{/* Branch node on the trunk. */}
						<span
							className="absolute top-[7.5rem] -left-[5px] size-2.5 rotate-45 border border-cool bg-bg md:-left-[5px]"
							aria-hidden
						/>

						<div className="flex items-baseline gap-4">
							<span className="font-mono text-[11px] tracking-[0.3em] text-hot">
								{realm.numeral}
							</span>
							<span className="font-mono text-[11px] tracking-[0.3em] text-mute uppercase">
								{realm.realm}
							</span>
						</div>

						<h2 className="mt-4 font-hero text-[clamp(2rem,5vw,3.5rem)] leading-tight font-light text-ink">
							{realm.label === 'About' ? (
								<>
									An electrical engineer who kept{' '}
									<em className="text-cool">choosing software</em>
								</>
							) : realm.label === 'Craft' ? (
								<>
									What I <em className="text-cool">grow with</em>
								</>
							) : (
								<>
									Have something worth <em className="text-cool">building</em>?
								</>
							)}
						</h2>

						{realm.label === 'About' ? (
							<div className="mt-10 max-w-2xl space-y-6 text-lg leading-relaxed text-dim">
								<p>
									I study Electrical Engineering, and somewhere along the way
									programming stopped being a side interest and became the thing I do.
									Most of that time goes into the frontend — interfaces, interaction,
									the details people actually feel.
								</p>
								<p>
									I have built with TypeScript, React, Next.js and Node.js on the web,
									Flutter and Qt Creator away from it. The tools change often enough
									that I have stopped treating any one of them as the point.
								</p>
							</div>
						) : null}

						{realm.label === 'Craft' ? (
							<ul className="mt-12 max-w-2xl">
								{skills.map((skill) => (
									<li
										key={skill.name}
										className="group relative flex items-baseline gap-5 border-b border-line py-5"
									>
										{/* Each skill is a twig off the branch. */}
										<span
											className="absolute top-1/2 -left-10 h-px w-8 origin-left scale-x-50 bg-line-lit transition-all duration-500 group-hover:scale-x-100 group-hover:bg-cool md:-left-20 md:w-16"
											aria-hidden
										/>
										<span className="font-hero text-2xl font-light text-ink transition-colors group-hover:text-cool">
											{skill.name}
										</span>
										<span className="ml-auto font-mono text-[11px] tracking-[0.2em] text-mute uppercase">
											{skill.group}
										</span>
									</li>
								))}
							</ul>
						) : null}

						{realm.label === 'Send word' ? (
							<div className="mt-10">
								{site.email ? (
									<a
										href={`mailto:${site.email}`}
										className="font-hero text-[clamp(1.5rem,4vw,2.75rem)] font-light break-all text-ink transition-colors hover:text-hot"
									>
										{site.email}
									</a>
								) : null}
								<ul className="mt-10 flex flex-wrap gap-8">
									{site.socials.map((social) => (
										<li key={social.href}>
											<a
												href={social.href}
												target="_blank"
												rel="noreferrer"
												className="group inline-flex flex-col"
											>
												<span className="font-mono text-[11px] tracking-[0.25em] text-mute uppercase">
													{social.label}
												</span>
												<span className="mt-1 text-lg text-dim transition-colors group-hover:text-cool">
													{social.handle}
												</span>
											</a>
										</li>
									))}
								</ul>
							</div>
						) : null}
					</section>
				))}
			</div>

			<LabBar current="yggdrasil" />
		</div>
	);
}

import type { Metadata } from 'next';

import Visual from '@/components/lab/forge/Visual';
import LabBar from '@/components/lab/LabBar';
import { site } from '@/lib/site';
import { skills } from '@/lib/skills';

export const metadata: Metadata = { title: 'Design II — Muspelheim' };

export default function Forge() {
	return (
		<div className="theme-forge min-h-screen pb-20">
			{/* ---------------- Hero: the mass, and the name stamped over it -------- */}
			<section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden">
				<Visual className="pointer-events-none absolute inset-0" />

				{/* Heat haze pooling at the base. */}
				<div
					className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--c-hot)_14%,transparent),transparent)]"
					aria-hidden
				/>

				<div className="relative w-full px-6 md:px-10">
					{/* Type set edge to edge, heavy enough to feel struck. */}
					<h1 className="font-hero text-[clamp(2.75rem,13vw,11rem)] leading-[0.82] tracking-[-0.03em] text-ink uppercase mix-blend-exclusion">
						Pascalis
						<br />
						Reinard
					</h1>

					<div className="mt-6 flex flex-wrap items-end justify-between gap-6 border-t-2 border-hot pt-4">
						<p className="font-mono text-[11px] leading-relaxed tracking-[0.3em] text-hot uppercase">
							{site.role}
							<br />
							<span className="text-mute">Frontend · Fullstack</span>
						</p>

						<p className="max-w-sm text-right text-sm leading-relaxed text-dim">
							Specialised in the frontend, comfortable across the whole stack.
							Interfaces built to take a hit.
						</p>
					</div>
				</div>

				<div className="relative mt-16 w-full px-6 md:px-10">
					<div className="flex flex-wrap gap-3">
						<a
							href="#about"
							className="border-2 border-ink bg-ink px-8 py-4 font-hero text-xs tracking-[0.2em] text-bg uppercase transition-colors hover:border-hot hover:bg-hot hover:text-bg"
						>
							Strike
						</a>
						<a
							href="#contact"
							className="border-2 border-line-lit px-8 py-4 font-hero text-xs tracking-[0.2em] text-dim uppercase transition-colors hover:border-hot hover:text-hot"
						>
							Send word
						</a>
					</div>
				</div>
			</section>

			{/* ---------------- About: a heavy slab ---------------- */}
			<section id="about" className="scroll-mt-24 border-t-2 border-line px-6 py-24 md:px-10">
				<div className="grid gap-12 md:grid-cols-12">
					<div className="md:col-span-4">
						<p className="font-mono text-[11px] tracking-[0.3em] text-hot uppercase">
							01 — Origin
						</p>
						<h2 className="mt-4 font-hero text-[clamp(1.75rem,4vw,3rem)] leading-[0.92] text-ink uppercase">
							Made, not
							<br />
							born
						</h2>
					</div>

					<div className="space-y-6 text-lg leading-relaxed text-dim md:col-span-7 md:col-start-6">
						<p>
							I study Electrical Engineering, and somewhere along the way programming
							stopped being a side interest and became the thing I do. Most of that time
							goes into the frontend — interfaces, interaction, the details people
							actually feel.
						</p>
						<p>
							I have built with TypeScript, React, Next.js and Node.js on the web,
							Flutter and Qt Creator away from it. The tools change often enough that I
							have stopped treating any one of them as the point.
						</p>
					</div>
				</div>
			</section>

			{/* ---------------- Skills: a rack of tools ---------------- */}
			<section id="skills" className="scroll-mt-24 border-t-2 border-line px-6 py-24 md:px-10">
				<p className="font-mono text-[11px] tracking-[0.3em] text-hot uppercase">02 — Tools</p>
				<h2 className="mt-4 font-hero text-[clamp(1.75rem,4vw,3rem)] leading-[0.92] text-ink uppercase">
					The rack
				</h2>

				<ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
					{skills.map((skill, i) => (
						<li
							key={skill.name}
							className="group relative bg-bg p-6 transition-colors duration-300 hover:bg-surface"
						>
							{/* Heat bar rising from the base on hover. */}
							<span
								className="absolute inset-x-0 bottom-0 h-0.5 origin-bottom scale-y-0 bg-hot transition-transform duration-300 group-hover:scale-y-[8]"
								aria-hidden
							/>
							<span className="relative font-mono text-[11px] tracking-[0.2em] text-mute">
								{String(i + 1).padStart(2, '0')}
							</span>
							<p className="relative mt-6 font-hero text-xl text-ink uppercase">
								{skill.name}
							</p>
							<p className="relative mt-2 font-mono text-[11px] tracking-[0.15em] text-mute uppercase">
								{skill.group}
							</p>
						</li>
					))}
				</ul>
			</section>

			{/* ---------------- Contact ---------------- */}
			<section id="contact" className="scroll-mt-24 border-t-2 border-line px-6 py-24 md:px-10">
				<p className="font-mono text-[11px] tracking-[0.3em] text-hot uppercase">03 — Anvil</p>
				<h2 className="mt-4 font-hero text-[clamp(1.75rem,5vw,4rem)] leading-[0.9] text-ink uppercase">
					Bring me
					<br />
					the work
				</h2>

				{site.email ? (
					<a
						href={`mailto:${site.email}`}
						className="mt-10 inline-block border-b-2 border-hot pb-2 font-mono text-lg break-all text-ink transition-colors hover:text-hot md:text-2xl"
					>
						{site.email}
					</a>
				) : null}

				<ul className="mt-12 flex flex-wrap gap-px bg-line">
					{site.socials.map((social) => (
						<li key={social.href} className="bg-bg">
							<a
								href={social.href}
								target="_blank"
								rel="noreferrer"
								className="block px-8 py-6 transition-colors hover:bg-surface"
							>
								<span className="font-mono text-[11px] tracking-[0.25em] text-mute uppercase">
									{social.label}
								</span>
								<span className="mt-1 block font-hero text-lg text-ink uppercase">
									{social.handle}
								</span>
							</a>
						</li>
					))}
				</ul>
			</section>

			<LabBar current="forge" />
		</div>
	);
}

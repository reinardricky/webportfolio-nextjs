import Reveal from '@/components/motion/Reveal';
import SectionHeading from '@/components/site/SectionHeading';
import { toRunic } from '@/lib/runes';
import { coreSkills, practices, supportingSkills } from '@/lib/skills';

export default function Skills() {
	return (
		<section id="skills" className="pad band border-b border-line">
			<SectionHeading index="03" label="Skills" title="What I build with." />

			{/* Core stack — four carved plates, hairlines drawn by the gap. */}
			<div className="mt-12">
				<p className="label text-hot-ink">Core stack</p>

				<ul className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-2">
					{coreSkills.map((skill, i) => (
						<li key={skill.name} className="bg-bg">
							<Reveal delay={i * 0.05} className="h-full">
								<div className="group relative flex h-full flex-col p-6 transition-colors duration-500 hover:bg-surface md:p-8">
									{/* Ochre edge, same gesture as the experience bands. */}
									<span
										aria-hidden
										className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-hot transition-transform duration-500 ease-cut group-hover:scale-y-100"
									/>

									<div className="flex items-baseline justify-between gap-4">
										<span className="font-mono text-xs text-mute tabular-nums">
											{String(i + 1).padStart(2, '0')}
										</span>
										<span
											aria-hidden
											className="runic truncate text-xs opacity-40 transition-opacity duration-500 group-hover:opacity-100"
										>
											{toRunic(skill.name)}
										</span>
									</div>

									<h3 className="mt-8 font-display text-3xl font-light tracking-tight text-ink md:text-[2.75rem] md:leading-none">
										{skill.name}
									</h3>

									<p className="mt-4 max-w-[44ch] text-sm leading-relaxed text-dim">
										{skill.note}
									</p>

									{skill.where ? (
										<p className="label mt-auto pt-8 text-mute">{skill.where}</p>
									) : null}
								</div>
							</Reveal>
						</li>
					))}
				</ul>
			</div>

			{/* Secondary tiers sit as quieter record bands under the plates. */}
			<div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-12">
				<Reveal className="md:col-span-7">
					<h3 className="label text-hot-ink">Also shipped with</h3>

					<dl className="mt-5 border-t border-line">
						{supportingSkills.map((skill) => (
							<div
								key={skill.name}
								className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4"
							>
								<dt className="font-display text-xl text-ink transition-colors duration-300 group-hover:text-hot-ink">
									{skill.name}
								</dt>
								<dd className="text-sm text-mute">{skill.note}</dd>
							</div>
						))}
					</dl>
				</Reveal>

				<Reveal className="md:col-span-4 md:col-start-9" delay={0.08}>
					<h3 className="label text-hot-ink">What I focus on</h3>

					<ul className="mt-5 flex flex-wrap gap-2">
						{practices.map((practice) => (
							<li
								key={practice}
								className="border border-line px-3 py-2 text-sm text-dim transition-colors duration-300 hover:border-line-lit hover:text-ink"
							>
								{practice}
							</li>
						))}
					</ul>
				</Reveal>
			</div>

			<p className="label mt-12">The runes spell each name in the Elder Futhark alphabet.</p>
		</section>
	);
}

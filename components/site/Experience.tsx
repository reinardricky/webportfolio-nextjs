import Reveal from '@/components/motion/Reveal';
import SectionHeading from '@/components/site/SectionHeading';
import { credentials, education, roles } from '@/lib/experience';

export default function Experience() {
	return (
		<section id="experience" className="shell scroll-mt-24 py-24 md:py-36">
			<SectionHeading index="02" label="Saga" title="Where the work has been done" />

			{/* The record itself — newest first, each role a carved band. */}
			<ol className="mt-16 border-t border-edge">
				{roles.map((role, i) => (
					<li key={`${role.company}-${role.period}`} className="border-b border-edge">
						<Reveal delay={i * 0.04}>
							<div className="group relative grid gap-x-10 gap-y-5 py-10 transition-colors duration-500 md:grid-cols-12">
								{/* Gold edge lights up along the band on hover. */}
								<span
									aria-hidden
									className="absolute inset-y-0 -left-4 w-px origin-top scale-y-0 bg-rune transition-transform duration-500 ease-forge group-hover:scale-y-100 md:-left-6"
								/>

								<div className="md:col-span-4">
									<p className="label flex items-center gap-2.5 text-rune">
										{role.current ? (
											<span
												className="inline-block size-1.5 rotate-45 bg-rune"
												aria-hidden
											/>
										) : null}
										{role.period}
									</p>
									<p className="label mt-3 text-edge-lit">{role.kind}</p>
									{role.location ? (
										<p className="label mt-1.5 text-edge-lit">
											{role.location}
										</p>
									) : null}
								</div>

								<div className="md:col-span-8">
									<h3 className="font-display text-xl font-semibold tracking-[0.04em] text-frost uppercase md:text-2xl">
										{role.title}
									</h3>
									<p className="mt-1.5 text-base text-rune">{role.company}</p>

									<ul className="mt-5 space-y-2.5">
										{role.points.map((point) => (
											<li
												key={point}
												className="flex gap-3.5 text-sm leading-relaxed text-frost-dim"
											>
												<span
													aria-hidden
													className="mt-2.5 h-px w-3 shrink-0 bg-edge-lit transition-colors duration-500 group-hover:bg-rune/70"
												/>
												<span>{point}</span>
											</li>
										))}
									</ul>
								</div>
							</div>
						</Reveal>
					</li>
				))}
			</ol>

			{/* Schooling and the small facts, kept to a single closing band. */}
			<Reveal className="mt-20">
				<h3 className="label text-frost-dim">Schooling</h3>

				<dl className="mt-6 border-t border-edge">
					{education.map((study) => (
						<div key={study.school} className="border-b border-edge py-6">
							<div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
								<dt className="font-display text-lg font-semibold tracking-[0.04em] text-frost uppercase">
									{study.school}
								</dt>
								<dd className="label text-rune">{study.period}</dd>
							</div>
							<dd className="mt-2 text-sm text-frost-dim">{study.qualification}</dd>
							{study.detail ? (
								<dd className="mt-1.5 text-sm text-ash">{study.detail}</dd>
							) : null}
						</div>
					))}
				</dl>

				<dl className="mt-10 grid gap-x-10 gap-y-5 sm:grid-cols-3">
					{credentials.map((item) => (
						<div key={item.label}>
							<dt className="label text-edge-lit">{item.label}</dt>
							<dd className="mt-1.5 text-sm text-frost-dim">{item.value}</dd>
						</div>
					))}
				</dl>
			</Reveal>
		</section>
	);
}

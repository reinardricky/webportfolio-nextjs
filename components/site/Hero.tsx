import HeroVisual from '@/components/three/HeroVisual';
import { toRunic } from '@/lib/runes';
import { site } from '@/lib/site';

export default function Hero() {
	/* Driven from lib/site.ts so the record cannot drift from the data. */
	const fieldNotes: [string, string][] = [
		['Classification', site.role],
		['Position', site.employer],
		...(site.location ? ([['Recorded at', site.location]] as [string, string][]) : []),
		['Discipline', 'Electrical Engineering, UI — 2022'],
		['Condition', 'Active'],
	];

	return (
		<section id="top" className="border-b border-line">
			{/* Registration strip. */}
			<div className="pad border-b border-line py-2.5">
				<div className="flex flex-wrap items-center gap-x-8 gap-y-1">
					<span className="label">
						Specimen <span className="text-hot">RR-2026-001</span>
					</span>
					<span className="label hidden sm:inline">Elder Futhark · 24 glyphs</span>
					<span className="label hidden md:inline">Pigment: red ochre</span>
					{site.availability ? (
						<span className="label ml-auto text-cool">{site.availability}</span>
					) : null}
				</div>
			</div>

			{/* Plate left, record right. */}
			<div className="grid min-h-[78svh] grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
				<div className="relative order-2 min-h-[46svh] border-line lg:order-1 lg:min-h-0 lg:border-r">
					<div
						className="absolute inset-0 bg-[radial-gradient(58%_58%_at_50%_45%,color-mix(in_srgb,var(--color-cool)_9%,transparent),transparent_76%)]"
						aria-hidden
					/>
					<HeroVisual className="absolute inset-0" />

					<p className="label absolute bottom-4 left-4 leading-relaxed">
						Fig. 1
						<br />
						<span className="text-hot">Scale 1:1</span>
					</p>
				</div>

				<div className="pad order-1 flex flex-col justify-center py-16 lg:order-2 lg:py-20">
					<p className="label text-hot">Record 001 — subject</p>

					<h1 className="mt-5 font-display text-display font-light text-ink">
						Pascalis Reinard
						<br />
						Rickyputra
					</h1>

					<p className="runic mt-4 text-sm opacity-65" aria-hidden>
						{toRunic('reinard')}
					</p>

					<p className="mt-7 max-w-md leading-relaxed text-dim">
						A frontend engineer in Jakarta, building responsive web and mobile products
						in React, Next.js, and React Native.
					</p>

					<dl className="mt-9 max-w-md border-t border-line font-mono text-[11px]">
						{fieldNotes.map(([term, value]) => (
							<div key={term} className="record-row">
								<dt className="label">{term}</dt>
								<dd className="text-right tracking-wider text-ink">{value}</dd>
							</div>
						))}
					</dl>

					<div className="mt-9 flex flex-wrap gap-3">
						<a
							href="#about"
							className="label border border-hot px-5 py-2.5 text-hot transition-colors hover:bg-hot hover:text-ink"
						>
							Read the record
						</a>
						<a
							href="#contact"
							className="label border border-line-lit px-5 py-2.5 text-dim transition-colors hover:border-ink hover:text-ink"
						>
							Get in touch
						</a>
						{site.resumeUrl ? (
							<a
								href={site.resumeUrl}
								target="_blank"
								rel="noreferrer"
								className="label px-2 py-2.5 text-dim underline decoration-line-lit underline-offset-4 transition-colors hover:text-hot"
							>
								Résumé
							</a>
						) : null}
					</div>
				</div>
			</div>
		</section>
	);
}

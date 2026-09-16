import type { Metadata } from 'next';

import LabBar from '@/components/lab/LabBar';
import Visual from '@/components/lab/runestone/Visual';
import { toRunic } from '@/lib/runes';
import { site } from '@/lib/site';
import { skills } from '@/lib/skills';

export const metadata: Metadata = { title: 'Design III — Runestone' };

/* Presented as a museum record: the page is the catalogue entry. */
const FIELD_NOTES = [
	['Catalogue', 'RR-2026-001'],
	['Classification', 'Software engineer'],
	['Discipline', 'Electrical Engineering'],
	['Specialism', 'Frontend'],
	['Condition', 'Active'],
];

export default function Runestone() {
	return (
		<div className="theme-runestone min-h-screen pb-20">
			{/* Registration bar, like a specimen label. */}
			<div className="border-b border-line px-6 py-3 md:px-10">
				<div className="flex flex-wrap items-center gap-x-8 gap-y-1 font-mono text-[10px] tracking-[0.2em] text-mute uppercase">
					<span>
						Specimen <span className="text-hot">RR-2026-001</span>
					</span>
					<span className="hidden sm:inline">Elder Futhark · 24 glyphs</span>
					<span className="hidden md:inline">Pigment: red ochre</span>
					<span className="ml-auto hidden lg:inline">Drag-free · rotates on approach</span>
				</div>
			</div>

			{/* ---------------- Hero: plate left, record right ---------------- */}
			<section className="grid min-h-[86svh] grid-cols-1 lg:grid-cols-2">
				{/* Plate. */}
				<div className="relative order-2 min-h-[50svh] border-line lg:order-1 lg:min-h-0 lg:border-r">
					<div
						className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,color-mix(in_srgb,var(--c-cool)_10%,transparent),transparent_75%)]"
						aria-hidden
					/>
					<Visual className="absolute inset-0" />

					{/* Plate caption, bottom-left, like a museum card. */}
					<p className="absolute bottom-5 left-5 font-mono text-[10px] leading-relaxed tracking-[0.2em] text-mute uppercase">
						Fig. 1 — standing stone
						<br />
						<span className="text-hot">h. 3.1 · w. 1.55 · d. 0.42</span>
					</p>
				</div>

				{/* Record. */}
				<div className="order-1 flex flex-col justify-center px-6 py-20 lg:order-2 md:px-10 lg:py-0 lg:pl-16">
					<p className="font-mono text-[10px] tracking-[0.3em] text-hot uppercase">
						Record 001 — subject
					</p>

					<h1 className="mt-6 font-hero text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[1.05] font-light text-ink">
						Pascalis Reinard
						<br />
						Rickyputra
					</h1>

					<p
						className="mt-4 font-[family-name:var(--font-runic-src)] text-base tracking-[0.35em] text-hot opacity-70"
						aria-hidden
					>
						{toRunic('reinard')}
					</p>

					<p className="mt-8 max-w-md leading-relaxed text-dim">
						A software engineer who builds for the web — specialised in the frontend,
						comfortable across the whole stack.
					</p>

					{/* The field notes table. */}
					<dl className="mt-10 max-w-md border-t border-line font-mono text-[11px]">
						{FIELD_NOTES.map(([term, value]) => (
							<div
								key={term}
								className="flex items-baseline justify-between gap-6 border-b border-line py-2.5"
							>
								<dt className="tracking-[0.2em] text-mute uppercase">{term}</dt>
								<dd className="text-right tracking-wider text-ink">{value}</dd>
							</div>
						))}
					</dl>

					<div className="mt-10 flex flex-wrap gap-3">
						<a
							href="#about"
							className="border border-hot px-6 py-3 font-mono text-[11px] tracking-[0.2em] text-hot uppercase transition-colors hover:bg-hot hover:text-bg"
						>
							Read the record
						</a>
						<a
							href="#contact"
							className="border border-line-lit px-6 py-3 font-mono text-[11px] tracking-[0.2em] text-dim uppercase transition-colors hover:border-ink hover:text-ink"
						>
							Send word
						</a>
					</div>
				</div>
			</section>

			{/* ---------------- Transcription ---------------- */}
			<section id="about" className="scroll-mt-24 border-t border-line px-6 py-20 md:px-10">
				<div className="grid gap-10 md:grid-cols-12">
					<div className="md:col-span-3">
						<p className="font-mono text-[10px] tracking-[0.3em] text-hot uppercase">
							§ 02 — Transcription
						</p>
					</div>
					<div className="md:col-span-8 md:col-start-5">
						<h2 className="font-hero text-[clamp(1.5rem,3.2vw,2.5rem)] leading-snug font-light text-ink">
							An electrical engineer who kept choosing software.
						</h2>
						<div className="mt-8 space-y-5 leading-relaxed text-dim">
							<p>
								I study Electrical Engineering, and somewhere along the way programming
								stopped being a side interest and became the thing I do. Most of that
								time goes into the frontend — interfaces, interaction, the details
								people actually feel.
							</p>
							<p>
								I have built with TypeScript, React, Next.js and Node.js on the web,
								Flutter and Qt Creator away from it. The tools change often enough that
								I have stopped treating any one of them as the point.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ---------------- Catalogue of tools ---------------- */}
			<section id="skills" className="scroll-mt-24 border-t border-line px-6 py-20 md:px-10">
				<p className="font-mono text-[10px] tracking-[0.3em] text-hot uppercase">
					§ 03 — Catalogue
				</p>

				<table className="mt-10 w-full border-collapse text-left font-mono text-sm">
					<thead>
						<tr className="border-b border-line-lit">
							{['№', 'Designation', 'Class', 'Use', 'Futhark'].map((head, i) => (
								<th
									key={head}
									scope="col"
									className={`py-3 pr-4 text-[10px] font-normal tracking-[0.2em] text-mute uppercase ${
										i > 2 ? 'hidden md:table-cell' : ''
									}`}
								>
									{head}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{skills.map((skill, i) => (
							<tr
								key={skill.name}
								className="group border-b border-line transition-colors hover:bg-surface"
							>
								<td className="py-4 pr-4 text-mute tabular-nums">
									{String(i + 1).padStart(3, '0')}
								</td>
								<td className="py-4 pr-4">
									<span className="font-hero text-lg font-normal text-ink">
										{skill.name}
									</span>
								</td>
								<td className="py-4 pr-4 text-[11px] tracking-[0.15em] text-dim uppercase">
									{skill.group}
								</td>
								<td className="hidden py-4 pr-4 text-dim md:table-cell">{skill.note}</td>
								<td className="hidden py-4 md:table-cell">
									<span
										className="font-[family-name:var(--font-runic-src)] tracking-[0.25em] text-hot opacity-55 transition-opacity group-hover:opacity-100"
										aria-hidden
									>
										{toRunic(skill.name)}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>

			{/* ---------------- Correspondence ---------------- */}
			<section id="contact" className="scroll-mt-24 border-t border-line px-6 py-20 md:px-10">
				<p className="font-mono text-[10px] tracking-[0.3em] text-hot uppercase">
					§ 04 — Correspondence
				</p>
				<h2 className="mt-6 font-hero text-[clamp(1.5rem,3.5vw,2.75rem)] font-light text-ink">
					Have something worth building?
				</h2>

				{site.email ? (
					<a
						href={`mailto:${site.email}`}
						className="mt-8 inline-block font-mono text-base break-all text-ink underline decoration-hot decoration-1 underline-offset-[6px] transition-colors hover:text-hot md:text-xl"
					>
						{site.email}
					</a>
				) : null}

				<dl className="mt-12 max-w-lg border-t border-line font-mono text-[11px]">
					{site.socials.map((social) => (
						<div
							key={social.href}
							className="flex items-baseline justify-between gap-6 border-b border-line py-3"
						>
							<dt className="tracking-[0.2em] text-mute uppercase">{social.label}</dt>
							<dd>
								<a
									href={social.href}
									target="_blank"
									rel="noreferrer"
									className="text-ink transition-colors hover:text-hot"
								>
									{social.handle} ↗
								</a>
							</dd>
						</div>
					))}
				</dl>
			</section>

			<LabBar current="runestone" />
		</div>
	);
}

import Image from 'next/image';

import Reveal from '@/components/motion/Reveal';
import SectionHeading from '@/components/site/SectionHeading';
import { site } from '@/lib/site';
import Portrait from '@/public/assets/pictures/Reinard.jpg';

/* Driven from lib/site.ts so the record cannot drift from the data. */
const fieldNotes: [string, string][] = [
	['Role', site.role],
	...(site.location ? ([['Based in', site.location]] as [string, string][]) : []),
	['Degree', 'Electrical Engineering, UI (2022)'],
];

export default function About() {
	// The hero already shows the photo in the portrait layout; don't repeat it.
	const showPortrait = site.hero !== 'portrait';

	const notes = (
		<dl className="border-t border-line font-mono text-[11px]">
			{fieldNotes.map(([term, value]) => (
				<div key={term} className="record-row">
					<dt className="label">{term}</dt>
					<dd className="text-right tracking-wider text-ink">{value}</dd>
				</div>
			))}
		</dl>
	);

	return (
		<section id="about" className="pad band border-b border-line">
			<SectionHeading index="01" label="About" title="From electrical engineering to the web." />

			<div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-10">
				<Reveal className="md:col-span-6">
					<div className="max-w-[62ch] space-y-6 leading-relaxed text-dim">
						<p className="text-lg leading-relaxed text-ink/90 md:text-xl">
							I studied Electrical Engineering at Universitas Indonesia and graduated in
							2022. During my studies, I realised that the part I enjoyed most was
							programming, so I decided to build my career in software instead.
						</p>
						<p>
							I am currently a frontend developer at PT. Dans Multi Pro, where I build
							web and mobile projects for Telkom. Before that, I worked on the content
							management system behind Samsung VXT at Samsung R&amp;D Institute
							Indonesia, and spent two years at Gojek, where I started as an intern on
							the GoPlay web team.
						</p>
						<p>
							Most of my work uses React, Next.js, and React Native, covering responsive
							websites as well as the Android apps that go with them. I care about the
							practical details: components that can be reused, pages that stay fast
							with real data, and code that is easy for the next developer to
							understand. I also use Flutter when a project needs it.
						</p>
					</div>

					{/* Sits under the prose so both columns finish at a similar height. */}
					{showPortrait ? <div className="mt-12 max-w-[62ch]">{notes}</div> : null}
				</Reveal>

				<Reveal className="md:col-span-5 md:col-start-8" delay={0.08}>
					{showPortrait ? (
						<figure className="group">
							<div className="border border-line bg-surface p-1.5 shadow-plate transition-colors duration-500 group-hover:border-line-lit">
								<Image
									src={Portrait}
									alt="Portrait of Pascalis Reinard Rickyputra"
									placeholder="blur"
									sizes="(min-width: 768px) 40vw, 100vw"
									className="h-auto w-full saturate-[0.7] contrast-[1.05] transition-[filter] duration-700 ease-cut group-hover:saturate-100"
								/>
							</div>
							<figcaption className="label mt-3 leading-relaxed">
								Fig. 2
								<br />
								<span className="text-hot">Pascalis Reinard Rickyputra</span>
							</figcaption>
						</figure>
					) : (
						notes
					)}
				</Reveal>
			</div>
		</section>
	);
}

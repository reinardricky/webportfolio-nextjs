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

			{/*
			 * Phones read story → photo → field notes. From md up the notes sit
			 * under the story in the left column, the photo spanning both rows.
			 */}
			<div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-x-10">
				<Reveal className="md:col-span-6 md:row-start-1">
					<div className="max-w-[62ch] space-y-5 text-base leading-[1.75] text-ink/80 md:text-[1.0625rem]">
						<p>
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
				</Reveal>

				<Reveal className="md:col-span-5 md:col-start-8 md:row-span-2 md:row-start-1" delay={0.08}>
					<figure className="group max-w-64 md:ml-auto md:max-w-sm">
						<div className="border border-line bg-surface p-1.5 shadow-plate transition-colors duration-500 group-hover:border-line-lit">
							<Image
								src={Portrait}
								alt="Portrait of Pascalis Reinard Rickyputra"
								placeholder="blur"
								sizes="(min-width: 768px) 24rem, 16rem"
								className="h-auto w-full saturate-[0.7] contrast-[1.05] transition-[filter] duration-700 ease-cut group-hover:saturate-100"
							/>
						</div>
						<figcaption className="label mt-3 leading-relaxed">
							Fig. 2
							<br />
							<span className="text-hot-ink">Pascalis Reinard Rickyputra</span>
						</figcaption>
					</figure>
				</Reveal>

				<Reveal className="max-w-[62ch] md:col-span-6 md:row-start-2" delay={0.12}>
					{notes}
				</Reveal>
			</div>
		</section>
	);
}

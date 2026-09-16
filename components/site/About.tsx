import Image from 'next/image';

import Reveal from '@/components/motion/Reveal';
import SectionHeading from '@/components/site/SectionHeading';
import Portrait from '@/public/assets/pictures/Reinard.jpg';

export default function About() {
	return (
		<section id="about" className="shell scroll-mt-24 py-24 md:py-36">
			<SectionHeading index="01" label="About" title="The one who kept choosing software" />

			<div className="mt-16 grid gap-14 md:grid-cols-12 md:gap-10">
				<Reveal className="md:col-span-7">
					<div className="space-y-6 text-lg leading-relaxed text-frost-dim">
						<p>
							I study Electrical Engineering, and somewhere along the way programming
							stopped being a side interest and became the thing I do. Most of that
							time goes into the frontend — interfaces, interaction, the details
							people actually feel — though I am comfortable working through the full
							stack when a project needs it.
						</p>
						<p>
							I have built with JavaScript and TypeScript, HTML and CSS, React,
							Next.js and Node.js on the web, Flutter and Qt Creator away from it. The
							tools change often enough that I have stopped treating any one of them
							as the point; picking up the next one is part of the work.
						</p>
					</div>

					<dl className="mt-12 border-t border-edge">
						{[
							['Discipline', 'Electrical Engineering'],
							['Specialism', 'Frontend engineering'],
							['Comfortable with', 'Fullstack delivery'],
						].map(([term, value]) => (
							<div
								key={term}
								className="flex items-baseline justify-between gap-6 border-b border-edge py-4"
							>
								<dt className="label">{term}</dt>
								<dd className="text-right text-sm text-frost">{value}</dd>
							</div>
						))}
					</dl>
				</Reveal>

				<Reveal className="md:col-span-5" delay={0.1}>
					<figure className="group">
						<div className="slab relative overflow-hidden p-2">
							<Image
								src={Portrait}
								alt="Portrait of Pascalis Reinard Rickyputra"
								placeholder="blur"
								sizes="(min-width: 768px) 40vw, 100vw"
								className="h-auto w-full contrast-[1.08] saturate-[0.72] transition-all duration-700 ease-forge group-hover:saturate-100"
							/>
							{/* Cold cast over the portrait, lifted on hover. */}
							<div
								className="pointer-events-none absolute inset-2 bg-gradient-to-t from-void/70 via-transparent to-transparent transition-opacity duration-700 group-hover:opacity-40"
								aria-hidden
							/>
						</div>
						<figcaption className="label mt-4 flex items-center gap-3">
							<span className="h-px w-8 bg-rune/60" aria-hidden />
							Pascalis Reinard Rickyputra
						</figcaption>
					</figure>
				</Reveal>
			</div>
		</section>
	);
}

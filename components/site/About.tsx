import Image from 'next/image';

import Reveal from '@/components/motion/Reveal';
import SectionHeading from '@/components/site/SectionHeading';
import Portrait from '@/public/assets/pictures/Reinard.jpg';

export default function About() {
	return (
		<section id="about" className="pad scroll-mt-20 border-b border-line py-20 md:py-28">
			<SectionHeading index="01" label="About" title="I came to software sideways." />

			<div className="mt-12 grid gap-12 md:grid-cols-12 md:gap-10">
				<Reveal className="md:col-span-7">
					<div className="space-y-5 leading-relaxed text-dim">
						<p>
							I came to software sideways. The degree was Electrical Engineering at
							Universitas Indonesia, finished in 2022, but by the end of it the part I
							kept choosing was always the code. That choice has held since: frontend
							engineering in both consulting and product teams, at Dans Multi Pro,
							Gojek, and Samsung R&amp;D.
						</p>
						<p>
							Most of the work is React, Next.js, and React Native — responsive web
							alongside the Android apps that ship with it. The themes that recur are
							the unglamorous ones: components worth reusing, pages that stay quick
							once real data arrives, and a codebase the next person can still read.
							Flutter and the rest of the stack are there when a project asks for them.
						</p>
					</div>
				</Reveal>

				<Reveal className="md:col-span-4 md:col-start-9" delay={0.08}>
					<figure>
						<div className="border border-line bg-surface p-1.5">
							<Image
								src={Portrait}
								alt="Portrait of Pascalis Reinard Rickyputra"
								placeholder="blur"
								sizes="(min-width: 768px) 32vw, 100vw"
								className="h-auto w-full saturate-[0.75] contrast-[1.05]"
							/>
						</div>
						<figcaption className="label mt-3 leading-relaxed">
							Fig. 2 — subject
							<br />
							<span className="text-hot">Pascalis Reinard Rickyputra</span>
						</figcaption>
					</figure>
				</Reveal>
			</div>
		</section>
	);
}

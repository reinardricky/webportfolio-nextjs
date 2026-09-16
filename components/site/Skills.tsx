import Image from 'next/image';

import Reveal from '@/components/motion/Reveal';
import SectionHeading from '@/components/site/SectionHeading';
import { toRunic } from '@/lib/runes';
import { skills } from '@/lib/skills';

export default function Skills() {
	return (
		<section id="skills" className="relative bg-abyss">
			{/* Carved edges top and bottom. */}
			<div className="inlay absolute inset-x-0 top-0" aria-hidden />

			<div className="shell scroll-mt-24 py-24 md:py-36">
				<SectionHeading index="02" label="Arsenal" title="The tools I reach for first" />

				{/* An armoury list: rune, mark, designation, use. */}
				<ul className="mt-16 border-t border-edge">
					{skills.map((skill, i) => (
						<Reveal key={skill.name} delay={i * 0.04}>
							<li className="group relative grid grid-cols-[auto_auto_1fr_auto] items-center gap-x-4 border-b border-edge py-6 transition-colors duration-500 hover:bg-stone/60 md:grid-cols-[3rem_2.75rem_1fr_8rem_1fr] md:gap-x-8">
								{/* Gold edge lights up along the row on hover. */}
								<span
									aria-hidden
									className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-rune transition-transform duration-500 ease-forge group-hover:scale-y-100"
								/>

								<span className="label hidden text-edge-lit transition-colors group-hover:text-rune md:block">
									{String(i + 1).padStart(2, '0')}
								</span>

								<span className="relative size-9 shrink-0 opacity-55 saturate-0 transition-all duration-500 group-hover:opacity-100 group-hover:saturate-100 md:size-11">
									<Image
										src={skill.logo}
										alt=""
										fill
										sizes="44px"
										className="object-contain"
									/>
								</span>

								<span className="font-display text-lg font-semibold tracking-[0.06em] text-frost uppercase md:text-2xl">
									{skill.name}
								</span>

								<span className="label hidden md:block">{skill.group}</span>

								<span className="flex items-center justify-end gap-4 text-right text-sm text-ash md:justify-start md:text-left">
									<span className="hidden md:inline">{skill.note}</span>
									<span
										className="runic text-sm opacity-0 transition-opacity duration-500 group-hover:opacity-70"
										aria-hidden
									>
										{toRunic(skill.name)}
									</span>
								</span>
							</li>
						</Reveal>
					))}
				</ul>
			</div>

			<div className="inlay absolute inset-x-0 bottom-0" aria-hidden />
		</section>
	);
}

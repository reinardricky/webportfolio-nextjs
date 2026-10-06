import Image from 'next/image';

import Reveal from '@/components/motion/Reveal';
import SectionHeading from '@/components/site/SectionHeading';
import { toRunic } from '@/lib/runes';
import { skills } from '@/lib/skills';

const HEADS = ['№', '', 'Designation', 'Class', 'Recorded use', 'Futhark'];

export default function Skills() {
	return (
		<section id="skills" className="pad scroll-mt-20 border-b border-line py-20 md:py-28">
			<SectionHeading index="03" label="Skills" title="What I build with." />

			<Reveal className="mt-10 overflow-x-auto">
				<table className="w-full min-w-[34rem] border-collapse text-left">
					<thead>
						<tr className="border-b border-line-lit">
							{HEADS.map((head, i) => (
								<th
									key={head || i}
									scope="col"
									className={`label py-3 pr-5 font-normal ${
										i >= 4 ? 'hidden md:table-cell' : ''
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
								<td className="py-4 pr-5 font-mono text-xs text-mute tabular-nums">
									{String(i + 1).padStart(3, '0')}
								</td>

								<td className="py-4 pr-5">
									<span className="relative block size-7 saturate-[0.35] opacity-70 transition-all duration-500 group-hover:saturate-100 group-hover:opacity-100">
										<Image src={skill.logo} alt="" fill sizes="28px" className="object-contain" />
									</span>
								</td>

								<td className="py-4 pr-5">
									<span className="font-display text-lg text-ink">{skill.name}</span>
								</td>

								<td className="label py-4 pr-5 text-dim">{skill.group}</td>

								<td className="hidden py-4 pr-5 text-sm text-dim md:table-cell">
									{skill.note}
								</td>

								<td className="hidden py-4 md:table-cell">
									<span
										className="runic text-sm opacity-50 transition-opacity duration-500 group-hover:opacity-100"
										aria-hidden
									>
										{toRunic(skill.name)}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</Reveal>

			<p className="label mt-5">
				{skills.length} entries — transliteration is Elder Futhark, spelling the Latin
			</p>
		</section>
	);
}

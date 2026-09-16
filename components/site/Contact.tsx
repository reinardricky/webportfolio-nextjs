import Reveal from '@/components/motion/Reveal';
import SectionHeading from '@/components/site/SectionHeading';
import { site } from '@/lib/site';

export default function Contact() {
	return (
		<section id="contact" className="shell scroll-mt-24 py-24 md:py-36">
			<SectionHeading index="04" label="Send word" title="Have something worth building?" />

			<Reveal className="mt-16">
				{site.email ? (
					<a
						href={`mailto:${site.email}`}
						className="group inline-flex max-w-full items-baseline gap-4 break-all"
					>
						<span className="font-display text-headline font-semibold text-frost transition-colors group-hover:text-rune">
							{site.email}
						</span>
						<span
							aria-hidden
							className="text-rune transition-transform duration-300 ease-forge group-hover:translate-x-2"
						>
							↗
						</span>
					</a>
				) : null}

				<div className="inlay mt-10 max-w-sm" />

				<ul className="mt-12 grid border-t border-edge sm:grid-cols-2">
					{site.socials.map((social, i) => (
						<li
							key={social.href}
							className={`border-b border-edge ${i === 0 ? 'sm:border-r sm:pr-8' : 'sm:pl-8'}`}
						>
							<a
								href={social.href}
								target="_blank"
								rel="noreferrer"
								className="group flex items-center justify-between gap-6 py-6"
							>
								<span>
									<span className="label block transition-colors group-hover:text-rune">
										{social.label}
									</span>
									<span className="mt-1.5 block text-lg text-frost-dim transition-colors group-hover:text-frost">
										{social.handle}
									</span>
								</span>
								<span
									aria-hidden
									className="text-edge-lit transition-all duration-300 ease-forge group-hover:translate-x-1 group-hover:text-rune"
								>
									↗
								</span>
							</a>
						</li>
					))}
				</ul>
			</Reveal>
		</section>
	);
}

import Reveal from '@/components/motion/Reveal';
import SectionHeading from '@/components/site/SectionHeading';
import { site } from '@/lib/site';

export default function Contact() {
	return (
		<section id="contact" className="pad scroll-mt-20 border-b border-line py-20 md:py-28">
			<SectionHeading index="04" label="Contact" title="Have something worth building?" />

			<Reveal className="mt-10">
				{site.email ? (
					<a
						href={`mailto:${site.email}`}
						className="inline-block font-mono text-base break-all text-ink underline decoration-hot decoration-1 underline-offset-[7px] transition-colors hover:text-hot md:text-xl"
					>
						{site.email}
					</a>
				) : null}

				<dl className="mt-11 max-w-xl border-t border-line font-mono text-[11px]">
					{site.socials.map((social) => (
						<div key={social.href} className="record-row">
							<dt className="label">{social.label}</dt>
							<dd>
								<a
									href={social.href}
									target="_blank"
									rel="noreferrer"
									className="tracking-wider text-ink transition-colors hover:text-hot"
								>
									{social.handle} ↗
								</a>
							</dd>
						</div>
					))}
				</dl>
			</Reveal>
		</section>
	);
}

import Reveal from '@/components/motion/Reveal';
import CopyEmail from '@/components/site/CopyEmail';
import SectionHeading from '@/components/site/SectionHeading';
import { site } from '@/lib/site';

export default function Contact() {
	return (
		<section id="contact" className="pad band relative isolate flex-1 overflow-hidden border-b border-line">
			{/* Low ochre glow, as if the last band were lit from below. */}
			<div
				aria-hidden
				className="absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(60%_80%_at_20%_100%,color-mix(in_srgb,var(--color-hot)_9%,transparent),transparent_70%)]"
			/>

			<SectionHeading index="04" label="Contact" title="Let’s get in touch." />

			<Reveal className="mt-12 grid gap-14 lg:grid-cols-12 lg:gap-10">
				<div className="lg:col-span-7">
					<p className="max-w-[46ch] leading-relaxed text-dim">
						If you have a frontend role, a contract project, or a question about my work,
						feel free to send me an email. It is the fastest way to reach me.
					</p>

					{site.email ? (
						<div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
							<a
								href={`mailto:${site.email}`}
								className="group press relative font-display text-2xl font-light tracking-tight break-all text-ink hover:text-hot-ink sm:text-3xl md:text-[2.75rem] md:leading-none"
							>
								{site.email}
								<span
									aria-hidden
									className="absolute inset-x-0 -bottom-2 h-px origin-left bg-hot transition-transform duration-500 ease-cut group-hover:scale-x-0 group-hover:origin-right"
								/>
							</a>
							<CopyEmail email={site.email} />
						</div>
					) : null}
				</div>

				<dl className="self-end border-t border-line font-mono text-[11px] lg:col-span-4 lg:col-start-9">
					{site.socials.map((social) => (
						<div key={social.href} className="record-row">
							<dt className="label">{social.label}</dt>
							<dd>
								<a
									href={social.href}
									target="_blank"
									rel="noreferrer"
									className="press tracking-wider text-ink hover:text-hot-ink"
								>
									{social.handle} ↗
								</a>
							</dd>
						</div>
					))}
					{site.location ? (
						<div className="record-row">
							<dt className="label">Based in</dt>
							<dd className="tracking-wider text-dim">{site.location}</dd>
						</div>
					) : null}
				</dl>
			</Reveal>
		</section>
	);
}

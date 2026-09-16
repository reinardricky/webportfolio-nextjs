import HeroVisual from '@/components/three/HeroVisual';
import { toRunic } from '@/lib/runes';
import { site } from '@/lib/site';

const meta = [
	{ label: 'Discipline', value: 'Frontend engineering' },
	{ label: 'Forged with', value: 'TypeScript · React · Next.js' },
	{ label: 'Also wields', value: 'Node.js · Flutter · SQL' },
];

export default function Hero() {
	return (
		<section
			id="top"
			className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28 pb-10 md:pb-16"
		>
			{/* The gate sits behind the type, dimmed on phones for contrast. */}
			<div className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-40 md:w-[58%] md:opacity-100 lg:w-[54%]">
				<HeroVisual />
			</div>

			{/* A carved column of runes down the left edge. */}
			<div
				className="runic pointer-events-none absolute top-1/2 left-2 hidden -translate-y-1/2 text-xs leading-[2.2] opacity-25 [writing-mode:vertical-rl] xl:block"
				aria-hidden
			>
				{toRunic('midgard')}
			</div>

			<div className="shell relative">
				<p className="label flex items-center gap-3 text-rune">
					{site.availability ? (
						<>
							<span className="inline-block size-1.5 rotate-45 bg-rune" aria-hidden />
							{site.availability}
						</>
					) : (
						<>
							<span className="inline-block size-1.5 rotate-45 bg-rune" aria-hidden />
							{site.role}
						</>
					)}
				</p>

				<h1 className="mt-6 font-display text-display font-bold text-frost uppercase lg:max-w-[58%]">
					<span className="block">Pascalis</span>
					<span className="block">Reinard</span>
					<span className="block text-rune">Rickyputra</span>
				</h1>

				{/* The name again, carved. */}
				<p className="runic mt-5 text-sm opacity-55 lg:max-w-[58%] sm:text-base" aria-hidden>
					{toRunic('pascalis reinard')}
				</p>

				<div className="inlay mt-8 max-w-md" />

				<p className="mt-8 max-w-lg text-lede text-pretty text-frost-dim lg:max-w-[46%]">
					A software engineer who builds for the web — specialised in the frontend,
					comfortable across the whole stack.
				</p>

				<div className="mt-10 flex flex-wrap items-center gap-3">
					<a
						href="#about"
						className="group inline-flex items-center gap-3 border border-rune bg-rune px-6 py-3.5 font-display text-sm font-semibold tracking-[0.18em] text-void uppercase transition-colors hover:bg-transparent hover:text-rune"
					>
						Enter
						<span
							aria-hidden
							className="transition-transform duration-300 ease-forge group-hover:translate-y-0.5"
						>
							↓
						</span>
					</a>
					<a
						href="#contact"
						className="inline-flex items-center border border-edge-lit px-6 py-3.5 font-display text-sm font-semibold tracking-[0.18em] text-frost-dim uppercase transition-colors hover:border-rune hover:text-rune"
					>
						Send word
					</a>
					{site.resumeUrl ? (
						<a
							href={site.resumeUrl}
							target="_blank"
							rel="noreferrer"
							className="label px-2 py-3.5 text-frost-dim underline decoration-edge-lit underline-offset-4 transition-colors hover:text-rune"
						>
							Résumé
						</a>
					) : null}
				</div>

				{/* Meta strip — the inscription along the base of the stone. */}
				<dl className="mt-14 grid grid-cols-1 border-t border-edge sm:grid-cols-3">
					{meta.map((row) => (
						<div
							key={row.label}
							className="border-b border-edge py-4 sm:border-r sm:border-b-0 sm:pr-6 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-6"
						>
							<dt className="label">{row.label}</dt>
							<dd className="mt-1.5 text-sm text-frost-dim">{row.value}</dd>
						</div>
					))}
				</dl>
			</div>
		</section>
	);
}

import type { Metadata } from 'next';
import Link from 'next/link';

import { DESIGNS } from '@/components/lab/LabBar';

export const metadata: Metadata = { title: 'Design lab' };

const DETAIL: Record<
	string,
	{ theme: string; scene: string; feel: string; type: string; swatch: string[] }
> = {
	yggdrasil: {
		theme: 'theme-yggdrasil',
		scene: 'A branching world tree drawn in light, with sap pulsing outward along every branch and leaf-lights twinkling at the tips. Roots mirror the crown below.',
		feel: 'Organic, mythic, calm. The page is a descent from Asgard down the trunk — sections hang off a single continuous line.',
		type: 'Cormorant Garamond — light, flowing, italic accents',
		swatch: ['#05090a', '#c8a24a', '#57c99a', '#e8f0ea'],
	},
	forge: {
		theme: 'theme-forge',
		scene: 'A rough-hewn mass of iron at working heat. Cooling cracks glow molten through the surface, the whole thing breathing like a bellows, sparks rising off it. Move closer and it runs hotter.',
		feel: 'Brutal, industrial, loud. Type set edge to edge and heavy enough to feel struck rather than typeset.',
		type: 'Archivo Black — massive, condensed, unapologetic',
		swatch: ['#0b0a09', '#ff6b1a', '#ffd08a', '#f2ece4'],
	},
	runestone: {
		theme: 'theme-runestone',
		scene: 'An actual carved standing stone, weathered and lichened, runes cut into it and filled with red ochre — the pigment real rune carvers used. Raking light, so the carving reads as depth.',
		feel: 'Scholarly and data-dense — the page is presented as a museum catalogue entry, with specimen numbers, field notes and a proper table. The geekiest of the three.',
		type: 'Spectral — a working serif, set alongside heavy monospace',
		swatch: ['#101410', '#c4543a', '#9aa87e', '#ece9dd'],
	},
};

export default function Lab() {
	return (
		<main className="min-h-screen bg-void px-6 py-16 md:px-10">
			<div className="mx-auto max-w-5xl">
				<p className="font-mono text-[11px] tracking-[0.3em] text-rune uppercase">
					Design lab
				</p>
				<h1 className="mt-5 font-display text-[clamp(2rem,5vw,3.5rem)] font-bold text-frost uppercase">
					Three directions
				</h1>
				<p className="mt-5 max-w-2xl text-frost-dim">
					All three keep the Norse premise but take it somewhere different — in palette,
					in typography, in layout, and in what the 3D scene actually does. Open each,
					move your cursor around the hero, and scroll. Pick one and I will build it out
					properly and delete the other two.
				</p>

				<ul className="mt-14 grid gap-5">
					{DESIGNS.map((design) => {
						const detail = DETAIL[design.slug];
						return (
							<li key={design.slug}>
								<Link
									href={`/lab/${design.slug}`}
									className={`${detail.theme} group block border border-line p-7 transition-colors hover:border-hot md:p-9`}
								>
									<div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
										<span className="font-mono text-[11px] tracking-[0.3em] text-hot">
											{design.numeral}
										</span>
										<h2 className="font-hero text-3xl text-ink md:text-4xl">
											{design.name}
										</h2>
										<span className="font-mono text-[11px] tracking-[0.2em] text-mute uppercase">
											{design.gist}
										</span>
										<span className="ml-auto flex gap-1.5" aria-hidden>
											{detail.swatch.map((color) => (
												<span
													key={color}
													className="size-5 border border-line-lit"
													style={{ backgroundColor: color }}
												/>
											))}
										</span>
									</div>

									<dl className="mt-7 grid gap-5 md:grid-cols-3">
										{[
											['The scene', detail.scene],
											['The feel', detail.feel],
											['Type', detail.type],
										].map(([term, value]) => (
											<div key={term}>
												<dt className="font-mono text-[10px] tracking-[0.2em] text-mute uppercase">
													{term}
												</dt>
												<dd className="mt-2 text-sm leading-relaxed text-dim">{value}</dd>
											</div>
										))}
									</dl>

									<p className="mt-7 font-mono text-[11px] tracking-[0.2em] text-hot uppercase">
										Open <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
									</p>
								</Link>
							</li>
						);
					})}
				</ul>

				<Link
					href="/"
					className="mt-12 inline-block font-mono text-[11px] tracking-[0.2em] text-ash uppercase transition-colors hover:text-rune"
				>
					← Back to the current site
				</Link>
			</div>
		</main>
	);
}

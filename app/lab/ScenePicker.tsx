'use client';

import { useState } from 'react';

import HeroVisual from '@/components/three/HeroVisual';
import { SCENE_IDS, SCENE_META, type SceneId } from '@/components/three/scenes/registry';

/**
 * The four candidates, shown in the real hero plate at the real size —
 * comparing them anywhere else would be misleading.
 */
export default function ScenePicker() {
	const [scene, setScene] = useState<SceneId>('scan');

	return (
		<>
			<div className="flex flex-wrap gap-2">
				{SCENE_IDS.map((id) => {
					const active = id === scene;
					return (
						<button
							key={id}
							type="button"
							onClick={() => setScene(id)}
							aria-pressed={active}
							className={`label press border px-4 py-2.5 transition-colors ${
								active
									? 'border-hot bg-hot text-ink'
									: 'border-line-lit text-dim hover:border-ink hover:text-ink'
							}`}
						>
							{SCENE_META[id].name}
						</button>
					);
				})}
			</div>

			<div className="mt-8 grid grid-cols-1 border border-line lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
				<div className="relative order-2 min-h-[46svh] border-line lg:order-1 lg:min-h-[32rem] lg:border-r">
					<div
						className="absolute inset-0 bg-[radial-gradient(58%_58%_at_50%_45%,color-mix(in_srgb,var(--color-cool)_9%,transparent),transparent_76%)]"
						aria-hidden
					/>
					{/* Remounted per scene so each gets a clean canvas and the
					    previous one's GPU resources are released. */}
					<HeroVisual key={scene} scene={scene} className="absolute inset-0" />
					<p className="label absolute bottom-4 left-4 leading-relaxed">
						Fig. 1
						<br />
						<span className="text-hot">Scale 1:1</span>
					</p>
				</div>

				<div className="order-1 flex flex-col justify-center p-6 md:p-10 lg:order-2">
					<p className="label text-hot">{SCENE_META[scene].name}</p>
					<h2 className="mt-4 font-display text-headline font-light text-ink">
						Pascalis Reinard
						<br />
						Rickyputra
					</h2>
					<p className="mt-6 max-w-md leading-relaxed text-dim">
						{SCENE_META[scene].blurb}
					</p>
					<p className="label mt-8 text-mute">
						Move the cursor over the plate — every scene responds to it.
					</p>
				</div>
			</div>
		</>
	);
}

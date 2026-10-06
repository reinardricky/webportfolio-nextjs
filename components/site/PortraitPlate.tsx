import Image from 'next/image';

import { site } from '@/lib/site';
import Portrait from '@/public/assets/pictures/Reinard.jpg';

/** Registration mark at one corner of the plate, like a specimen photo. */
function Corner({ className }: { className: string }) {
	return <span aria-hidden className={`absolute size-3 border-hot ${className}`} />;
}

/**
 * The portrait as a mounted plate: an outer mount, an inner frame with a
 * hairline highlight, and an ochre outline set behind it for depth.
 * Capped at the source's own width so the 400px file never upscales.
 */
export default function PortraitPlate() {
	return (
		<figure className="group relative mx-auto w-full max-w-[20rem] lg:mr-[8%] lg:ml-auto">
			<div className="relative">
				{/* Offset outline behind the mount. */}
				<div
					aria-hidden
					className="absolute inset-0 translate-x-4 translate-y-4 border border-hot/35 transition-transform duration-700 ease-cut group-hover:translate-x-5 group-hover:translate-y-5"
				/>

				<div className="relative border border-line-lit/60 bg-surface p-2 shadow-plate">
					<div className="relative aspect-[4/5] overflow-hidden bg-bg-deep">
						<Image
							src={Portrait}
							alt="Portrait of Pascalis Reinard Rickyputra"
							fill
							priority
							placeholder="blur"
							sizes="20rem"
							className="object-cover object-[50%_30%] saturate-[0.8] contrast-[1.04] transition-[filter,transform] duration-700 ease-cut group-hover:scale-[1.02] group-hover:saturate-100"
						/>
						{/* Hairline highlight on the inner edge, and a little vignette. */}
						<div
							aria-hidden
							className="absolute inset-0 shadow-[inset_0_0_0_1px_rgb(236_233_221/0.08),inset_0_-60px_80px_-40px_rgb(11_14_11/0.7)]"
						/>
					</div>
				</div>

				<Corner className="-top-3 -left-3 border-t border-l" />
				<Corner className="-top-3 -right-3 border-t border-r" />
				<Corner className="-bottom-3 -left-3 border-b border-l" />
				<Corner className="-right-3 -bottom-3 border-r border-b" />
			</div>

			<figcaption className="label mt-8 flex items-baseline justify-between gap-4">
				<span>Fig. 1</span>
				<span className="text-dim">{site.firstName}, {site.location.split(',')[0] || 'Jakarta'}</span>
			</figcaption>
		</figure>
	);
}

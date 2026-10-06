'use client';

import dynamic from 'next/dynamic';

import SceneHost from '@/components/three/SceneHost';
import {
	ConstellationFallback,
	MonolithFallback,
	ScanFallback,
	SigilFallback,
	SurveyFallback,
} from '@/components/three/scenes/Fallbacks';
import type { SceneId } from '@/components/three/scenes/registry';
import { site } from '@/lib/site';

/*
 * One lazy chunk per scene, so only the chosen one is ever fetched and
 * three.js stays out of the first load entirely.
 */
const LAZY = {
	monolith: dynamic(() => import('@/components/three/scenes/monolith/Scene'), {
		ssr: false,
		loading: () => <MonolithFallback />,
	}),
	scan: dynamic(() => import('@/components/three/scenes/scan/Scene'), {
		ssr: false,
		loading: () => <ScanFallback />,
	}),
	constellation: dynamic(() => import('@/components/three/scenes/constellation/Scene'), {
		ssr: false,
		loading: () => <ConstellationFallback />,
	}),
	survey: dynamic(() => import('@/components/three/scenes/survey/Scene'), {
		ssr: false,
		loading: () => <SurveyFallback />,
	}),
	sigil: dynamic(() => import('@/components/three/scenes/sigil/Scene'), {
		ssr: false,
		loading: () => <SigilFallback />,
	}),
} as const;

const FALLBACKS = {
	monolith: <MonolithFallback />,
	scan: <ScanFallback />,
	constellation: <ConstellationFallback />,
	survey: <SurveyFallback />,
	sigil: <SigilFallback />,
} as const;

export default function HeroVisual({
	scene = site.heroScene,
	className,
}: {
	scene?: SceneId;
	className?: string;
}) {
	const Scene = LAZY[scene];

	return (
		<SceneHost className={className} fallback={FALLBACKS[scene]}>
			{(state) => <Scene {...state} />}
		</SceneHost>
	);
}

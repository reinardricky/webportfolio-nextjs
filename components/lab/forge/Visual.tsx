'use client';

import dynamic from 'next/dynamic';

import SceneHost from '@/components/lab/SceneHost';
import Fallback from './Fallback';

const Scene = dynamic(() => import('./Scene'), { ssr: false, loading: () => <Fallback /> });

export default function Visual({ className }: { className?: string }) {
	return (
		<SceneHost className={className} fallback={<Fallback />}>
			{(state) => <Scene {...state} />}
		</SceneHost>
	);
}

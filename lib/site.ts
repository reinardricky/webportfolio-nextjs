/**
 * Single source of truth for everything personal on the site.
 * Optional fields render only when filled in, so leaving one blank
 * removes it from the page instead of showing a placeholder.
 */
import type { SceneId } from '@/components/three/scenes/registry';

export const site = {
	/** The hero's 3D scene. Compare the options at /lab. */
	heroScene: 'scan' as SceneId,

	name: 'Pascalis Reinard Rickyputra',
	firstName: 'Reinard',
	role: 'Frontend Engineer',
	url: 'https://reinardricky.com',

	// Delete this line if you would rather not publish your address.
	email: 'reinardricky@gmail.com',

	// Optional — fill in to show, leave as '' to hide.
	location: 'Jakarta, Indonesia',
	availability: '',
	resumeUrl: '',

	/** Reads as "<role> at <employer>" wherever both are shown together. */
	employer: 'PT. Dans Multi Pro',

	socials: [
		{ label: 'GitHub', href: 'https://github.com/reinardricky', handle: '@reinardricky' },
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/in/reinardricky/',
			handle: 'in/reinardricky',
		},
	],

	nav: [
		{ index: '01', label: 'About', href: '#about' },
		{ index: '02', label: 'Experience', href: '#experience' },
		{ index: '03', label: 'Skills', href: '#skills' },
		{ index: '04', label: 'Contact', href: '#contact' },
	],
} as const;

export type Social = (typeof site.socials)[number];

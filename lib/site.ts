/**
 * Single source of truth for everything personal on the site.
 * Optional fields render only when filled in, so leaving one blank
 * removes it from the page instead of showing a placeholder.
 */
import type { SceneId } from '@/components/three/scenes/registry';

/** What fills the right side of the hero. Compare both at /lab. */
export type HeroVariant = 'portrait' | 'runestone';

export const site = {
	hero: 'runestone' as HeroVariant,
	/** The 3D scene used when `hero` is 'runestone'. */
	heroScene: 'monolith' as SceneId,

	/** Catalogue number shown in the chrome — header, hero and footer. */
	specimen: 'RR-2026-001',

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

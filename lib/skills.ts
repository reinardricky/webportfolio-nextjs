/**
 * What I work with, in tiers. Drawn from the roles in lib/experience.ts
 * (which mirrors LinkedIn), so every note points at real work — keep the
 * two in step when a role changes.
 */

export type Skill = {
	name: string;
	/** One concrete line on where it was used — no adjectives. */
	note: string;
	/** Short places-of-use line, shown as a label under core skills. */
	where?: string;
};

/** The daily stack. Shown large, one plate each. */
export const coreSkills: Skill[] = [
	{
		name: 'React',
		note: 'Responsive web apps for Telkom, the Samsung VXT CMS, and the GoPlay web platform.',
		where: 'Telkom · Samsung · Gojek',
	},
	{
		name: 'Next.js',
		note: 'Helped move GoPlay from Vue.js to Next.js, and built this site on the App Router.',
		where: 'Gojek · This site',
	},
	{
		name: 'React Native',
		note: 'The Android versions of the Telkom web apps, sharing logic with the web.',
		where: 'Telkom',
	},
	{
		name: 'TypeScript',
		note: 'The default for every project, built on the JavaScript I started with.',
		where: 'Everywhere',
	},
];

/** Shipped in production, but not the daily driver. */
export const supportingSkills: Skill[] = [
	{ name: 'Kotlin', note: 'Native Android development' },
	{ name: 'Java', note: 'Native Android, alongside Kotlin' },
	{ name: 'Flutter', note: 'Employee attendance app at BNI' },
	{ name: 'Vue.js', note: 'The GoPlay web app before its migration' },
	{ name: 'Tailwind CSS', note: 'Styling systems, including this site' },
	{ name: 'Node.js', note: 'APIs and tooling around the frontend' },
	{ name: 'Git', note: 'Branching, reviews, team workflows' },
];

/** The work the tools are in service of. */
export const practices: string[] = [
	'Reusable component systems',
	'State management',
	'Performance with real data',
	'Web and Android parity',
	'CMS and internal tools',
	'Framework migrations',
];

/** Flat list for structured data (page.tsx knowsAbout). */
export const allSkillNames = [...coreSkills, ...supportingSkills].map((s) => s.name);

/**
 * Working history, newest first. Mirrors the LinkedIn profile — keep the
 * two in step when a role changes.
 */

export type Role = {
	title: string;
	company: string;
	/** Contract, Full-time, Internship, Apprenticeship — shown as a small tag. */
	kind: string;
	period: string;
	/** Rendered only when present. */
	location?: string;
	/** Present roles stay highlighted in the timeline. */
	current?: boolean;
	points: string[];
};

export const roles: Role[] = [
	{
		title: 'Frontend Developer',
		company: 'PT. Dans Multi Pro',
		kind: 'Contract',
		period: 'Oct 2024 — Present',
		location: 'Jakarta · Hybrid',
		current: true,
		points: [
			'Building web and mobile projects for Telkom in React.js and React Native.',
			'Developing and maintaining responsive web applications alongside their Android counterparts.',
			'Sharpening the experience through efficient state management, reusable components, and performance work.',
		],
	},
	{
		title: 'Software Engineer',
		company: 'Samsung R&D Institute Indonesia',
		kind: 'Full-time',
		period: 'May 2024 — Aug 2024',
		location: 'Jakarta · Hybrid',
		points: ['Built features for the CMS behind Samsung VXT.'],
	},
	{
		title: 'Software Engineer — GoPlay',
		company: 'Gojek',
		kind: 'Full-time',
		period: 'Aug 2022 — May 2024',
		location: 'Jakarta · Hybrid',
		points: [
			'Part of the GoPlay Web team, migrating and maintaining the platform and shipping new features.',
			'Built the internal CMS site and the company portfolio site.',
		],
	},
	{
		title: 'Frontend Engineer Intern — GoPlay',
		company: 'Gojek',
		kind: 'Internship',
		period: 'May 2022 — Aug 2022',
		location: 'Jakarta · Hybrid',
		points: [
			'Built and maintained TypeMaster, a game running inside the GoPlay web app.',
			'Helped migrate the GoPlay web front end from Vue.js to Next.js.',
		],
	},
	{
		title: 'Frontend Engineering Student — Generasi GIGIH 2.0',
		company: 'Yayasan Anak Bangsa Bisa (YABB & GoTo)',
		kind: 'Apprenticeship',
		period: 'Feb 2022 — Aug 2022',
		points: [
			'Independent study through HTML & CSS, JavaScript, Git, and React.js.',
			'Classes on React.js alongside soft skills, career readiness, and English.',
			'Shipped a Spotify playlist web app in React.js as the final project.',
		],
	},
	{
		title: 'Software Engineer Intern',
		company: 'PT. Bank Negara Indonesia (Persero) Tbk.',
		kind: 'Internship',
		period: 'Nov 2021 — Feb 2022',
		location: 'Jakarta',
		points: [
			'Built a Flutter mobile app for employee attendance and biodata.',
		],
	},
];

export type Study = {
	school: string;
	qualification: string;
	period: string;
	detail?: string;
};

export const education: Study[] = [
	{
		school: 'Universitas Indonesia',
		qualification: "Bachelor's degree, Electrical and Electronics Engineering",
		period: '2018 — 2022',
		detail:
			'Graduated 3.76 / 4.00. Thesis: an Android SoC viewer for a battery management system over Bluetooth Low Energy.',
	},
];

/** Small facts that round out the record without earning a section each. */
export const credentials: { label: string; value: string }[] = [
	{ label: 'Languages', value: 'English · Indonesian' },
	{ label: 'IELTS', value: '7.5 / 9.0 — Nov 2023' },
	{ label: 'Volunteering', value: 'Mentor, CareerCatalyst by StudentsCatalyst' },
];

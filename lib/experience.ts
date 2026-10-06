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
			'Building web and mobile projects for Telkom using React.js and React Native.',
			'Developing and maintaining responsive web applications and their Android versions.',
			'Improving the user experience with efficient state management, reusable components, and better performance.',
		],
	},
	{
		title: 'Software Engineer',
		company: 'Samsung R&D Institute Indonesia',
		kind: 'Full-time',
		period: 'May 2024 — Aug 2024',
		location: 'Jakarta · Hybrid',
		points: ['Built features for the content management system (CMS) behind Samsung VXT.'],
	},
	{
		title: 'Software Engineer — GoPlay',
		company: 'Gojek',
		kind: 'Full-time',
		period: 'Aug 2022 — May 2024',
		location: 'Jakarta · Hybrid',
		points: [
			'Worked in the GoPlay Web team, where I helped migrate and maintain the platform and shipped new features.',
			'Built the internal CMS and the company portfolio website.',
		],
	},
	{
		title: 'Frontend Engineer Intern — GoPlay',
		company: 'Gojek',
		kind: 'Internship',
		period: 'May 2022 — Aug 2022',
		location: 'Jakarta · Hybrid',
		points: [
			'Built and maintained TypeMaster, a game inside the GoPlay web app.',
			'Helped migrate the GoPlay website from Vue.js to Next.js.',
		],
	},
	{
		title: 'Frontend Engineering Student — Generasi GIGIH 2.0',
		company: 'Yayasan Anak Bangsa Bisa (YABB & GoTo)',
		kind: 'Apprenticeship',
		period: 'Feb 2022 — Aug 2022',
		points: [
			'Studied HTML, CSS, JavaScript, Git, and React.js independently.',
			'Attended classes on React.js, as well as soft skills, career preparation, and English.',
			'Built a Spotify playlist web app with React.js as my final project.',
		],
	},
	{
		title: 'Software Engineer Intern',
		company: 'PT. Bank Negara Indonesia (Persero) Tbk.',
		kind: 'Internship',
		period: 'Nov 2021 — Feb 2022',
		location: 'Jakarta',
		points: [
			'Built a Flutter mobile app for employee attendance and personal data.',
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
			'GPA 3.76 / 4.00. My thesis was an Android app that shows the state of charge (SoC) of a battery management system over Bluetooth Low Energy.',
	},
];

/** Small facts that round out the record without earning a section each. */
export const credentials: { label: string; value: string }[] = [
	{ label: 'Languages', value: 'English · Indonesian' },
	{ label: 'IELTS', value: '7.5 / 9.0 — Nov 2023' },
	{ label: 'Volunteering', value: 'Mentor, CareerCatalyst by StudentsCatalyst' },
];

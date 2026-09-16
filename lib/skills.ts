import type { StaticImageData } from 'next/image';

import CSS from '@/public/assets/skills/css.png';
import Flutter from '@/public/assets/skills/flutter.png';
import Git from '@/public/assets/skills/git.png';
import HTML from '@/public/assets/skills/html.png';
import JavaScript from '@/public/assets/skills/javascript.png';
import NextJs from '@/public/assets/skills/nextjs.png';
import Node from '@/public/assets/skills/node.png';
import ReactLogo from '@/public/assets/skills/react.png';
import Tailwind from '@/public/assets/skills/tailwind.png';
import Typescript from '@/public/assets/skills/typescript.svg';

export type Skill = {
	name: string;
	logo: StaticImageData;
	/** Short note on how you actually use it — keep it concrete. */
	note: string;
	group: 'Language' | 'Framework' | 'Styling' | 'Platform' | 'Data' | 'Tooling';
};

export const skills: Skill[] = [
	{ name: 'TypeScript', logo: Typescript, note: 'Typed end to end', group: 'Language' },
	{ name: 'JavaScript', logo: JavaScript, note: 'Where it started', group: 'Language' },
	{ name: 'React', logo: ReactLogo, note: 'Reusable component systems', group: 'Framework' },
	{ name: 'Next.js', logo: NextJs, note: 'App Router, SSR', group: 'Framework' },
	{ name: 'React Native', logo: ReactLogo, note: 'Android, shared with web', group: 'Framework' },
	{ name: 'Flutter', logo: Flutter, note: 'Cross-platform mobile', group: 'Framework' },
	{ name: 'Node.js', logo: Node, note: 'APIs and services', group: 'Platform' },
	{ name: 'HTML', logo: HTML, note: 'Semantic, accessible markup', group: 'Language' },
	{ name: 'CSS', logo: CSS, note: 'Responsive layout', group: 'Styling' },
	{ name: 'Tailwind', logo: Tailwind, note: 'Design systems', group: 'Styling' },
	{ name: 'Git', logo: Git, note: 'Branching, review', group: 'Tooling' },
];

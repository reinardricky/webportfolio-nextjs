import Flutter from '../public/assets/skills/flutter.png';
import React from '../public/assets/skills/react.png';
import NextJs from '../public/assets/skills/nextjs.png';
import Node from '../public/assets/skills/node.png';
import Tailwind from '../public/assets/skills/tailwind.png';
import Git from '../public/assets/skills/git.png';
import SQL from '../public/assets/skills/sql.png';
import Typescript from '../public/assets/skills/typescript.svg';
import SkillsItem from './SkillsItem';

const Skills = () => {
	return (
		<div id="skills" className="w-full lg:h-screen p-2">
			<div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full">
				<h2 className="tracking-wider py-4">Skills</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
					<SkillsItem logo={Typescript} name="Typescript" />
					<SkillsItem logo={React} name="React.js" />
					<SkillsItem logo={NextJs} name="Next.js" />
					<SkillsItem logo={Flutter} name="Flutter" />
					<SkillsItem logo={Node} name="Node.js" />
					<SkillsItem logo={Tailwind} name="Tailwind" />
					<SkillsItem logo={Git} name="Git" />
					<SkillsItem logo={SQL} name="SQL" />
				</div>
			</div>
		</div>
	);
};

export default Skills;

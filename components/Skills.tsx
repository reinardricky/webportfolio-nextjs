import Flutter from '../public/assets/skills/flutter.png';
import HTML from '../public/assets/skills/html.png';
import CSS from '../public/assets/skills/css.png';
import Javascript from '../public/assets/skills/javascript.png';
import React from '../public/assets/skills/react.png';
import NextJs from '../public/assets/skills/nextjs.png';
import Node from '../public/assets/skills/node.png';
import Tailwind from '../public/assets/skills/tailwind.png';
import Git from '../public/assets/skills/github1.png';
import SQL from '../public/assets/skills/sql.png';
import SkillsItem from './SkillsItem';

const Skills = () => {
	return (
		<div id="skills" className="w-full lg:h-screen p-2">
			<div className="max-w-[1240px] mx-auto flex flex-col justify-center h-full">
				<h2 className="tracking-wider py-4">Skills</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
					<SkillsItem logo={HTML} name="HTML" />
					<SkillsItem logo={CSS} name="CSS" />
					<SkillsItem logo={Javascript} name="Javascript" />
					<SkillsItem logo={React} name="React" />
					<SkillsItem logo={NextJs} name="Next" />
					<SkillsItem logo={Flutter} name="Flutter" />
					<SkillsItem logo={Node} name="Node" />
					<SkillsItem logo={Tailwind} name="Tailwind" />
					<SkillsItem logo={Git} name="Github" />
					<SkillsItem logo={SQL} name="SQL" />
				</div>
			</div>
		</div>
	);
};

export default Skills;

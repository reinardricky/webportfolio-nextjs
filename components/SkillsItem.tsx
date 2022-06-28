import Image, { StaticImageData } from 'next/image';

type SkillsItemType = {
	logo: StaticImageData;
	name: string;
};

const SkillsItem = ({ logo, name }: SkillsItemType) => {
	return (
		<div className="p-6 shadow-md shadow-[#fd4557] rounded-xl hover:scale-105 ease-in duration-300 bg-[#a6ebe8]">
			<div className="grid grid-cols-2 gap-4 justify-center items-center ">
				<div className="m-auto">
					<Image src={logo} alt="/" width="64px" height="64px" />
				</div>
				<div className="flex flex-col items-center justify-center">
					<h3>{name}</h3>
				</div>
			</div>
		</div>
	);
};

export default SkillsItem;

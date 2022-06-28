import Image, { StaticImageData } from 'next/image';

type SkillsItemType = {
	logo: StaticImageData;
	name: string;
};

const SkillsItem = ({ logo, name }: SkillsItemType) => {
	return (
		<div className="p-2 sm:p-6 shadow-md shadow-[#fd4557] rounded-xl hover:scale-105 ease-in duration-300 bg-[#a6ebe8]">
			<div className="grid sm:grid-cols-2 gap-2 sm:gap-4 justify-center items-center ">
				<div className="m-auto w-[32px] h-[32px] sm:w-[64px] sm:h-[64px] relative">
					<Image src={logo} alt="/" layout="fill" />
				</div>
				<div className="flex flex-col items-center justify-center">
					<h3>{name}</h3>
				</div>
			</div>
		</div>
	);
};

export default SkillsItem;

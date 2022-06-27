import { AiOutlineMail } from 'react-icons/ai';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const HomeScreen = () => {
	return (
		<div className="w-full h-screen text-center">
			<div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
				<div>
					<p className="uppercase text-sm tracking-widest text-gray-600">
						Welcome to my domain
					</p>
					<h1 className="py-4 text-[#30343f]">Hello, my name is Reinard</h1>
					<h1 className="py-2 ">I am a Software Engineer</h1>
					<div className="flex items-center justify-between max-w-[330px] m-auto py-8">
						<div className="bg-[#a6ebe8] rounded-full  p-3 cursor-pointer hover:scale-150 ease-in duration-300">
							<FaLinkedin />
						</div>
						<div className="bg-[#a6ebe8] rounded-full  p-3 cursor-pointer hover:scale-150 ease-in duration-300">
							<FaGithub />
						</div>
						<div className="bg-[#a6ebe8] rounded-full  p-3 cursor-pointer hover:scale-150 ease-in duration-300">
							<AiOutlineMail />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

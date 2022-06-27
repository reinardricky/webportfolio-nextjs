import { AiOutlineMail } from 'react-icons/ai';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const HomeScreen = () => {
	return (
		<div className="w-full h-screen text-center">
			<div className="max-w-[1240px] w-full h-full mx-auto p-2 flex justify-center items-center">
				<div>
					<p className="uppercase text-sm tracking-widest ">
						Welcome to my domain
					</p>
					<h1 className="py-2 text-[#30343f]">Hello, my name is Reinard</h1>
					<h2 className="py-2 ">I am a Software Engineer</h2>
					<div className="flex items-center justify-around max-w-[330px] m-auto py-8">
						<a
							href="https://www.linkedin.com/in/reinardricky/"
							target="_blank"
							rel="noreferrer"
						>
							<div className="bg-[#a6ebe8] rounded-full  p-4 cursor-pointer hover:scale-150 ease-in duration-300">
								<FaLinkedin size={20} />
							</div>
						</a>
						<div className="bg-[#a6ebe8] rounded-full  p-4 cursor-pointer hover:scale-150 ease-in duration-300">
							<FaGithub size={20} />
						</div>
						<div className="bg-[#a6ebe8] rounded-full  p-4 cursor-pointer hover:scale-150 ease-in duration-300">
							<AiOutlineMail size={20} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeScreen;

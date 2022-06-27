import Image from 'next/image';
import Reinard from '../public/assets/pictures/Reinard.jpg';

const About = () => {
	return (
		<div id="about" className="w-full md:h-screen p-2 flex items py-16 ">
			<div className="max-w-[1240px] m-auto md:grid grid-cols-3 gap-20 p-8 ">
				<div className="col-span-2">
					<h2 className="tracking-wider">About Me</h2>
					<p className="py-4 text-[#30343f]">
						I am an Electrical Engineering student who enjoys programming. I
						specialized in Frontend Enginering but can also do Fullstack
						Engineering. I have experience with JavaScript, HTML, CSS, Qt
						Creator, Flutter, ReactJS, NextJs, and NodeJs. I'm always eager to
						learn new programming languages and other skills to further enhance
						my knowledge.
					</p>
				</div>
				<div className="p-4 rounded-xl bg-[#a6ebe8] w-full h-auto m-auto shadow-md shadow-[#fd4557] flex items-center justify-center hover:scale-105 ease-in duration-300">
					<Image src={Reinard} alt="/" className="rounded-xl " />
				</div>
			</div>
		</div>
	);
};

export default About;

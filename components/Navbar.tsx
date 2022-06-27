import Image from 'next/image';
import Link from 'next/link';
import LogoRr from '../public/assets/logo/Rr.png';
import { AiOutlineMail, AiOutlineMenu } from 'react-icons/ai';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const NavBar = () => {
	const [nav, setNav] = useState(false);

	const handleNav = () => {
		setNav(!nav);
	};

	return (
		<div className="fixed w-full h-20 shadow-md shadow-[#fd4557] z-[100] bg-[#a6defd]">
			<div className="flex justify-between items-center w-full h-full px-6 2xl:px-16">
				<Image src={LogoRr} alt="/" width="50" height="50" />
				<div>
					<ul className="hidden md:flex">
						<Link href="/">
							<li className="ml-10 text-sm uppercase hover:scale-150 duration-100">
								Home
							</li>
						</Link>
						<Link href="/#about">
							<li className="ml-10 text-sm uppercase hover:scale-150 duration-100">
								About
							</li>
						</Link>
						<Link href="/#skills">
							<li className="ml-10 text-sm uppercase hover:scale-150 duration-100">
								Skill
							</li>
						</Link>
					</ul>
					<div className="md:hidden" onClick={handleNav}>
						<AiOutlineMenu size={30} />
					</div>
				</div>
			</div>
			<div
				className={
					nav
						? 'md:hidden fixed left-0 top-0 w-full h-screen bg-black/70 p-10 ease-linear duration-300'
						: ''
				}
			>
				<div
					className={
						nav
							? 'fixed left-0 top-0 w-[75%] sm:w-[60%] h-screen bg-[#a6defd] p-10 ease-in duration-300 '
							: 'fixed left-[-100%] top-0 h-screen p-10 ease-in duration-500'
					}
				>
					<div>
						<div className="flex w-full items-center justify-center">
							<Image src={LogoRr} alt="/" width="80" height="80" />
						</div>
					</div>
					<div className="py-4 flex flex-col text-center">
						<ul className="uppercase">
							<Link href="/">
								<li
									onClick={() => setNav(false)}
									className="py-4 text-sm hover:scale-150 duration-100"
								>
									Home
								</li>
							</Link>
							<Link href="/#about">
								<li
									onClick={() => setNav(false)}
									className="py-4 text-sm hover:scale-150 duration-100"
								>
									About
								</li>
							</Link>
							<Link href="/#skills">
								<li
									onClick={() => setNav(false)}
									className="py-4 text-sm hover:scale-150 duration-100"
								>
									Skill
								</li>
							</Link>
						</ul>
						<div className="pt-20">
							<p className="uppercase tracking-widest text-[#fd4557]">
								Let's Connect
							</p>
							<div className="flex items-center justify-center my-4 w-full px-2 text-2xl">
								<a
									href="https://www.linkedin.com/in/reinardricky/"
									target="_blank"
									rel="noreferrer"
								>
									<div className="rounded-full  p-3 cursor-pointer hover:scale-150 ease-in duration-300">
										<FaLinkedin />
									</div>
								</a>
								<a
									href="https://github.com/reinardricky"
									target="_blank"
									rel="noreferrer"
								>
									<div className="rounded-full  p-3 cursor-pointer hover:scale-150 ease-in duration-300">
										<FaGithub />
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div
					className={
						nav ? 'fixed right-0 top-0 w-[25%] sm:w-[40%] h-screen ' : ''
					}
					onClick={handleNav}
				></div>
			</div>
		</div>
	);
};

export default NavBar;

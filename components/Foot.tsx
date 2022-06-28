import Image from 'next/image';

const Foot = () => {
	return (
		<footer className="p-5 ">
			<div className="w-full h-[40px] text-center text-[#30343f]">
				<h4>©2022 Pascalis Reinard Rickyputra</h4>
				<h4>
					Built with{' '}
					<a
						href="https://nextjs.org"
						className="hover:underline  hover:underline-offset-2 text-[#fd4557] "
					>
						Next.js
					</a>
					,{' '}
					<a
						href="https://tailwindcss.com"
						className="hover:underline  hover:underline-offset-2 text-[#fd4557]"
					>
						Tailwind
					</a>
					, and{' '}
					<a
						href="https://vercel.com"
						className="hover:underline  hover:underline-offset-2 text-[#fd4557]"
					>
						Vercel
					</a>
				</h4>
			</div>
		</footer>
	);
};

export default Foot;

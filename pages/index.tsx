import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { HomeScreen } from '../components/HomeScreen';
import { NavBar } from '../components/Navbar';

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Reinardricky | Software Engineer</title>
				<meta
					name="description"
					content="Website Portfolio of Pascalis Reinard Rickyputra or Reinardricky"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NavBar />
			<HomeScreen />
		</div>
	);
};

export default Home;

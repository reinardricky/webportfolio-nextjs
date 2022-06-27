import type { NextPage } from 'next';
import Head from 'next/head';
import { About } from '../components/About';
import { HomeScreen } from '../components/HomeScreen';

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
			<HomeScreen />
			<About />
		</div>
	);
};

export default Home;

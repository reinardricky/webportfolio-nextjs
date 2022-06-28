import type { NextPage } from 'next';
import Head from 'next/head';
import About from '../components/About';
import Foot from '../components/Foot';
import HomeScreen from '../components/HomeScreen';
import Skills from '../components/Skills';

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Reinardricky | Software Engineer</title>
				<meta
					name="description"
					content="Website Portfolio of Pascalis Reinard Rickyputra or Reinardricky"
				/>
				<meta charSet="UTF-8" />
				<meta
					name="keywords"
					content="HTML, CSS, JavaScript, Reinardricky, reinardricky, web portfolio, Pascalis Reinard Rickyputra"
				/>
				<meta name="author" content="Pascalis Reinard Rickyputra" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<HomeScreen />
			<About />
			<Skills />
			<Foot />
		</div>
	);
};

export default Home;

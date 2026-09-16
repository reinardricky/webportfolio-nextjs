import About from '@/components/site/About';
import Contact from '@/components/site/Contact';
import Footer from '@/components/site/Footer';
import Hero from '@/components/site/Hero';
import Skills from '@/components/site/Skills';
import { site } from '@/lib/site';

/** Structured data so search engines read the page as a person, not a blob. */
const personJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: site.name,
	alternateName: 'Reinardricky',
	jobTitle: site.role,
	url: site.url,
	...(site.email ? { email: site.email } : {}),
	sameAs: site.socials.map((s) => s.href),
	knowsAbout: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Flutter', 'SQL'],
};

export default function Home() {
	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
			/>
			<Hero />
			<About />
			<Skills />
			<Contact />
			<Footer />
		</>
	);
}

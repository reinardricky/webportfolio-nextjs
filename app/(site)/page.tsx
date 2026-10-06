import About from '@/components/site/About';
import Contact from '@/components/site/Contact';
import Experience from '@/components/site/Experience';
import Footer from '@/components/site/Footer';
import Hero from '@/components/site/Hero';
import Skills from '@/components/site/Skills';
import { education } from '@/lib/experience';
import { site } from '@/lib/site';
import { skills } from '@/lib/skills';

/** Structured data so search engines read the page as a person, not a blob. */
const personJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Person',
	name: site.name,
	alternateName: 'Reinardricky',
	jobTitle: site.role,
	url: site.url,
	...(site.email ? { email: site.email } : {}),
	...(site.location
		? {
			  address: {
				  '@type': 'PostalAddress',
				  addressLocality: 'Jakarta',
				  addressCountry: 'ID',
			  },
		  }
		: {}),
	alumniOf: education.map((study) => ({
		'@type': 'CollegeOrUniversity',
		name: study.school,
	})),
	sameAs: site.socials.map((s) => s.href),
	// Kept in step with the arsenal rather than restated by hand.
	knowsAbout: skills.map((s) => s.name),
	knowsLanguage: ['English', 'Indonesian'],
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
			<Experience />
			<Skills />
			{/* The last section plus footer fill at least one screen, so the
			    Contact link can scroll it flush under the header like the rest. */}
			<div className="flex min-h-[calc(100svh-var(--header-h))] flex-col">
				<Contact />
				<Footer />
			</div>
		</>
	);
}

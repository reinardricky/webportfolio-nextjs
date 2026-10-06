import type { Metadata, Viewport } from 'next';
import { Geist, JetBrains_Mono, Noto_Sans_Runic, Spectral } from 'next/font/google';

import { site } from '@/lib/site';
import './globals.css';

// Self-hosted by next/font: no render-blocking request, no layout shift.

/* A working serif — this is a catalogue, not a monument. Light weights
   keep the display type scholarly rather than shouted. */
const display = Spectral({
	subsets: ['latin'],
	weight: ['300', '400', '600'],
	style: ['normal', 'italic'],
	variable: '--font-display-src',
	display: 'swap',
});

/* The functional UI: a grotesque with more character than Inter, and a
   500/600 pair for hierarchy below the display serif. */
const sans = Geist({
	subsets: ['latin'],
	weight: ['400', '500', '600'],
	variable: '--font-sans-src',
	display: 'swap',
});

const mono = JetBrains_Mono({
	subsets: ['latin'],
	weight: ['400', '500'],
	variable: '--font-mono-src',
	display: 'swap',
});

/* Real Elder Futhark, for the runic transliterations in the chrome. */
const runic = Noto_Sans_Runic({
	subsets: ['runic'],
	weight: '400',
	variable: '--font-runic-src',
	display: 'swap',
});

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: {
		default: `${site.name} — ${site.role}`,
		template: `%s — ${site.name}`,
	},
	description:
		'Portfolio of Pascalis Reinard Rickyputra — a frontend engineer in Jakarta, Indonesia, building responsive web and mobile products with React, Next.js, and React Native.',
	keywords: [
		'Pascalis Reinard Rickyputra',
		'Reinardricky',
		'software engineer',
		'frontend engineer',
		'frontend developer',
		'React',
		'React Native',
		'Next.js',
		'TypeScript',
		'Jakarta',
		'Indonesia',
		'portfolio',
	],
	authors: [{ name: site.name, url: site.url }],
	creator: site.name,
	alternates: { canonical: '/' },
	openGraph: {
		type: 'website',
		url: site.url,
		siteName: site.name,
		title: `${site.name} — ${site.role}`,
		description:
			'Frontend engineer in Jakarta, building responsive web and mobile products with React, Next.js, and React Native.',
		images: [{ url: '/assets/logo/MetaImage.png', width: 1200, height: 630, alt: site.name }],
	},
	twitter: {
		card: 'summary_large_image',
		title: `${site.name} — ${site.role}`,
		description: 'Frontend engineer in Jakarta — React, Next.js, React Native.',
		images: ['/assets/logo/MetaImage.png'],
	},
	icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
	themeColor: '#101410',
	colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className={`${sans.variable} ${display.variable} ${mono.variable} ${runic.variable}`}
		>
			<body className="antialiased">
				{/* Without JS the observer never runs, so unhide everything. */}
				<noscript>
					<style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
				</noscript>
				{children}
			</body>
		</html>
	);
}

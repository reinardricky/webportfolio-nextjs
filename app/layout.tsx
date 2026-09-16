import type { Metadata, Viewport } from 'next';
import { Cinzel, Inter_Tight, JetBrains_Mono, Noto_Sans_Runic } from 'next/font/google';

import Nav from '@/components/site/Nav';
import { site } from '@/lib/site';
import './globals.css';

// Self-hosted by next/font: no render-blocking request, no layout shift.

/* Carved Roman capitals — the closest widely available face to the
   chiselled inscription style the game's title treatment uses. */
const display = Cinzel({
	subsets: ['latin'],
	weight: ['400', '600', '700'],
	variable: '--font-display-src',
	display: 'swap',
});

/* The functional UI stays a clean, highly legible sans. */
const sans = Inter_Tight({
	subsets: ['latin'],
	weight: ['400', '500'],
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
		'Portfolio of Pascalis Reinard Rickyputra, a software engineer specialised in frontend engineering and comfortable across the full stack.',
	keywords: [
		'Pascalis Reinard Rickyputra',
		'Reinardricky',
		'software engineer',
		'frontend engineer',
		'React',
		'Next.js',
		'TypeScript',
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
			'Software engineer specialised in frontend engineering, comfortable across the full stack.',
		images: [{ url: '/assets/logo/MetaImage.png', width: 1200, height: 630, alt: site.name }],
	},
	twitter: {
		card: 'summary_large_image',
		title: `${site.name} — ${site.role}`,
		description: 'Software engineer specialised in frontend engineering.',
		images: ['/assets/logo/MetaImage.png'],
	},
	icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
	themeColor: '#06080b',
	colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className={`${sans.variable} ${display.variable} ${mono.variable} ${runic.variable}`}
		>
			<body className="grain antialiased">
				{/* Without JS the observer never runs, so unhide everything. */}
				<noscript>
					<style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
				</noscript>
				<Nav />
				<main id="main">{children}</main>
			</body>
		</html>
	);
}

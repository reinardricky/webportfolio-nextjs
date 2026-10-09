import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import { site } from '@/lib/site';
import './globals.css';

// Served from app/fonts (OFL, see OFL.txt): no request to Google at build
// time, no render-blocking request, no layout shift.

/* Nordic archive. A 1918 book serif with sharp wedge serifs — scholarly,
   catalogue-like, with a real italic for the surname. */
const display = localFont({
	src: [
		{ path: './fonts/Brygada1918-Variable.woff2', weight: '400 700', style: 'normal' },
		{ path: './fonts/Brygada1918-Italic-Variable.woff2', weight: '400 700', style: 'italic' },
	],
	variable: '--font-display-src',
	display: 'swap',
});

/* The grotesk Schibsted drew for its Norwegian newspapers: plain enough for
   reading, with enough edge to sit under the serif. */
const sans = localFont({
	src: './fonts/SchibstedGrotesk-Variable.woff2',
	weight: '400 900',
	variable: '--font-sans-src',
	display: 'swap',
});

/* Labels, dates and the nav. One weight — the catalogue marks stay quiet. */
const mono = localFont({
	src: './fonts/FragmentMono-Regular.woff2',
	weight: '400',
	variable: '--font-mono-src',
	display: 'swap',
});

/* Real Elder Futhark, for the runic transliterations in the chrome. */
const runic = localFont({
	src: './fonts/NotoSansRunic-Regular.woff2',
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

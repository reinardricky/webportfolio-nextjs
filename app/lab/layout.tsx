import { Archivo_Black, Cormorant_Garamond, Spectral } from 'next/font/google';

/*
 * Declared here rather than in the root layout so these faces load only
 * on the lab routes — the live site's payload is untouched. Once you
 * pick a direction, its face moves up into app/layout.tsx and the rest
 * of this folder goes away.
 */
const cormorant = Cormorant_Garamond({
	subsets: ['latin'],
	weight: ['300', '400', '600'],
	style: ['normal', 'italic'],
	variable: '--font-cormorant-src',
	display: 'swap',
});

const archivo = Archivo_Black({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-archivo-src',
	display: 'swap',
});

const spectral = Spectral({
	subsets: ['latin'],
	weight: ['300', '400', '600'],
	variable: '--font-spectral-src',
	display: 'swap',
});

export default function LabLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className={`${cormorant.variable} ${archivo.variable} ${spectral.variable}`}>
			{children}
		</div>
	);
}

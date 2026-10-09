import {
	Albert_Sans,
	Azeret_Mono,
	Brygada_1918,
	Familjen_Grotesk,
	Fragment_Mono,
	Gloock,
	Golos_Text,
	Grenze,
	Grenze_Gotisch,
	Hedvig_Letters_Sans,
	Hedvig_Letters_Serif,
	Martian_Mono,
	Schibsted_Grotesk,
	Sometype_Mono,
	Spline_Sans_Mono,
} from 'next/font/google';

/*
 * Type candidates for the lab only — nothing here ships on the site until a
 * pairing is chosen and moved into app/layout.tsx. Every pairing leans
 * Nordic (Swedish/Norwegian foundries, carved or blackletter forms) while
 * avoiding the stock picks: no Cinzel, no "Norse" novelty faces.
 */

const grenze = Grenze({ subsets: ['latin'], weight: ['300', '400', '600'], style: ['normal', 'italic'], display: 'swap' });
const grenzeGotisch = Grenze_Gotisch({ subsets: ['latin'], weight: 'variable', display: 'swap' });
const brygada = Brygada_1918({ subsets: ['latin'], style: ['normal', 'italic'], display: 'swap' });
const hedvigSerif = Hedvig_Letters_Serif({ subsets: ['latin'], display: 'swap' });
const gloock = Gloock({ subsets: ['latin'], weight: '400', display: 'swap' });

const familjen = Familjen_Grotesk({ subsets: ['latin'], display: 'swap' });
const albert = Albert_Sans({ subsets: ['latin'], display: 'swap' });
const schibsted = Schibsted_Grotesk({ subsets: ['latin'], display: 'swap' });
const hedvigSans = Hedvig_Letters_Sans({ subsets: ['latin'], weight: '400', display: 'swap' });
const golos = Golos_Text({ subsets: ['latin'], display: 'swap' });

const martian = Martian_Mono({ subsets: ['latin'], display: 'swap' });
const spline = Spline_Sans_Mono({ subsets: ['latin'], display: 'swap' });
const fragment = Fragment_Mono({ subsets: ['latin'], weight: '400', display: 'swap' });
const azeret = Azeret_Mono({ subsets: ['latin'], display: 'swap' });
const sometype = Sometype_Mono({ subsets: ['latin'], display: 'swap' });

export type Pairing = {
	id: string;
	name: string;
	note: string;
	/** Display · body · labels, as shown in the picker. */
	faces: [string, string, string];
	/** CSS font-family stacks; null keeps the site's current face. */
	display: string | null;
	sans: string | null;
	mono: string | null;
};

export const PAIRINGS: Pairing[] = [
	{
		id: 'current',
		name: 'Current',
		note: 'What the site ships today, for reference.',
		faces: ['Brygada 1918', 'Schibsted Grotesk', 'Fragment Mono'],
		display: null,
		sans: null,
		mono: null,
	},
	{
		id: 'carved',
		name: 'Carved runestone',
		note: 'Grenze sits between a roman and blackletter — letters that look cut, not drawn. Swedish grotesk underneath.',
		faces: ['Grenze', 'Familjen Grotesk', 'Martian Mono'],
		display: grenze.style.fontFamily,
		sans: familjen.style.fontFamily,
		mono: martian.style.fontFamily,
	},
	{
		id: 'saga',
		name: 'Saga manuscript',
		note: 'Full blackletter for the headings, like a saga written down in Iceland. Loud — the gods are not subtle.',
		faces: ['Grenze Gotisch', 'Albert Sans', 'Spline Sans Mono'],
		display: grenzeGotisch.style.fontFamily,
		sans: albert.style.fontFamily,
		mono: spline.style.fontFamily,
	},
	{
		id: 'archive',
		name: 'Nordic archive',
		note: 'A 1918 book serif with sharp wedge serifs, over the grotesk Schibsted drew for Norwegian newspapers.',
		faces: ['Brygada 1918', 'Schibsted Grotesk', 'Fragment Mono'],
		display: brygada.style.fontFamily,
		sans: schibsted.style.fontFamily,
		mono: fragment.style.fontFamily,
	},
	{
		id: 'letters',
		name: 'Swedish letters',
		note: 'Hedvig — a 2024 Swedish serif and sans pair cut as one family. Calm, modern Scandinavian.',
		faces: ['Hedvig Letters Serif', 'Hedvig Letters Sans', 'Azeret Mono'],
		display: hedvigSerif.style.fontFamily,
		sans: hedvigSans.style.fontFamily,
		mono: azeret.style.fontFamily,
	},
	{
		id: 'temple',
		name: 'Temple inscription',
		note: 'Gloock: high-contrast, wedge-heavy capitals with the weight of a hall of the gods.',
		faces: ['Gloock', 'Golos Text', 'Sometype Mono'],
		display: gloock.style.fontFamily,
		sans: golos.style.fontFamily,
		mono: sometype.style.fontFamily,
	},
];

/**
 * Elder Futhark — the 24-rune alphabet used across Scandinavia roughly
 * 150–800 CE. Every glyph is straight strokes because runes were carved
 * across the grain of wood and stone, which is also why they render so
 * well as glowing line work.
 *
 * Strokes are [x1, y1, x2, y2] in a unit box with y pointing UP.
 * Consumers flip y themselves when drawing into canvas or SVG space.
 */
export type Rune = {
	name: string;
	/** Latin value, for the transliteration map below. */
	latin: string;
	/** Unicode codepoint in the Runic block (U+16A0–U+16FF). */
	char: string;
	strokes: [number, number, number, number][];
};

export const RUNES: Rune[] = [
	{ name: 'Fehu', latin: 'f', char: 'ᚠ', strokes: [[0.28,0,0.28,1],[0.28,0.72,0.8,0.95],[0.28,0.44,0.8,0.67]] },
	{ name: 'Uruz', latin: 'u', char: 'ᚢ', strokes: [[0.22,0,0.22,1],[0.22,1,0.8,0.7],[0.8,0.7,0.8,0]] },
	{ name: 'Thurisaz', latin: 'th', char: 'ᚦ', strokes: [[0.28,0,0.28,1],[0.28,0.76,0.72,0.52],[0.72,0.52,0.28,0.28]] },
	{ name: 'Ansuz', latin: 'a', char: 'ᚨ', strokes: [[0.28,0,0.28,1],[0.28,1,0.8,0.74],[0.28,0.7,0.8,0.44]] },
	{ name: 'Raidho', latin: 'r', char: 'ᚱ', strokes: [[0.26,0,0.26,1],[0.26,1,0.74,0.84],[0.74,0.84,0.26,0.56],[0.26,0.56,0.76,0]] },
	{ name: 'Kenaz', latin: 'k', char: 'ᚲ', strokes: [[0.74,1,0.26,0.5],[0.26,0.5,0.74,0]] },
	{ name: 'Gebo', latin: 'g', char: 'ᚷ', strokes: [[0.18,0,0.82,1],[0.82,0,0.18,1]] },
	{ name: 'Wunjo', latin: 'w', char: 'ᚹ', strokes: [[0.26,0,0.26,1],[0.26,1,0.78,0.78],[0.78,0.78,0.26,0.56]] },
	{ name: 'Hagalaz', latin: 'h', char: 'ᚺ', strokes: [[0.2,0,0.2,1],[0.8,0,0.8,1],[0.2,0.66,0.8,0.34]] },
	{ name: 'Naudhiz', latin: 'n', char: 'ᚾ', strokes: [[0.5,0,0.5,1],[0.14,0.32,0.86,0.68]] },
	{ name: 'Isa', latin: 'i', char: 'ᛁ', strokes: [[0.5,0,0.5,1]] },
	{ name: 'Jera', latin: 'j', char: 'ᛃ', strokes: [[0.3,1,0.66,0.78],[0.66,0.78,0.3,0.56],[0.7,0,0.34,0.22],[0.34,0.22,0.7,0.44]] },
	{ name: 'Eihwaz', latin: 'y', char: 'ᛇ', strokes: [[0.46,0,0.46,1],[0.46,1,0.82,0.82],[0.46,0,0.1,0.18]] },
	{ name: 'Perthro', latin: 'p', char: 'ᛈ', strokes: [[0.74,1,0.3,0.76],[0.3,0.76,0.3,0.24],[0.3,0.24,0.74,0]] },
	{ name: 'Algiz', latin: 'z', char: 'ᛉ', strokes: [[0.5,0,0.5,1],[0.5,0.72,0.14,1],[0.5,0.72,0.86,1]] },
	{ name: 'Sowilo', latin: 's', char: 'ᛊ', strokes: [[0.74,1,0.3,0.74],[0.3,0.74,0.74,0.44],[0.74,0.44,0.3,0.1]] },
	{ name: 'Tiwaz', latin: 't', char: 'ᛏ', strokes: [[0.5,0,0.5,1],[0.5,1,0.2,0.68],[0.5,1,0.8,0.68]] },
	{ name: 'Berkano', latin: 'b', char: 'ᛒ', strokes: [[0.26,0,0.26,1],[0.26,1,0.74,0.8],[0.74,0.8,0.26,0.54],[0.26,0.54,0.74,0.28],[0.74,0.28,0.26,0.04]] },
	{ name: 'Ehwaz', latin: 'e', char: 'ᛖ', strokes: [[0.2,0,0.2,1],[0.8,0,0.8,1],[0.2,1,0.5,0.7],[0.5,0.7,0.8,1]] },
	{ name: 'Mannaz', latin: 'm', char: 'ᛗ', strokes: [[0.16,0,0.16,1],[0.84,0,0.84,1],[0.16,1,0.84,0.44],[0.84,1,0.16,0.44]] },
	{ name: 'Laguz', latin: 'l', char: 'ᛚ', strokes: [[0.3,0,0.3,1],[0.3,1,0.78,0.72]] },
	{ name: 'Ingwaz', latin: 'ng', char: 'ᛜ', strokes: [[0.5,1,0.84,0.5],[0.84,0.5,0.5,0],[0.5,0,0.16,0.5],[0.16,0.5,0.5,1]] },
	{ name: 'Dagaz', latin: 'd', char: 'ᛞ', strokes: [[0.16,0,0.16,1],[0.84,0,0.84,1],[0.16,1,0.84,0],[0.16,0,0.84,1]] },
	{ name: 'Othala', latin: 'o', char: 'ᛟ', strokes: [[0.5,1,0.8,0.7],[0.8,0.7,0.5,0.4],[0.5,0.4,0.2,0.7],[0.2,0.7,0.5,1],[0.36,0.52,0.16,0],[0.64,0.52,0.84,0]] },
];

/** Latin → Elder Futhark. Digraphs first, so "th" and "ng" win over "t"/"n". */
const MAP: [string, string][] = [
	['th', 'ᚦ'], ['ng', 'ᛜ'],
	['a','ᚨ'],['b','ᛒ'],['c','ᚲ'],['d','ᛞ'],['e','ᛖ'],['f','ᚠ'],['g','ᚷ'],
	['h','ᚺ'],['i','ᛁ'],['j','ᛃ'],['k','ᚲ'],['l','ᛚ'],['m','ᛗ'],['n','ᚾ'],
	['o','ᛟ'],['p','ᛈ'],['q','ᚲ'],['r','ᚱ'],['s','ᛊ'],['t','ᛏ'],['u','ᚢ'],
	['v','ᚹ'],['w','ᚹ'],['x','ᛉ'],['y','ᛇ'],['z','ᛉ'],
];

/**
 * Transliterates Latin text into Elder Futhark. Not a translation — the
 * runes spell the English out, the way a rune-carver would have.
 */
export function toRunic(input: string): string {
	const text = input.toLowerCase();
	let out = '';
	let i = 0;

	outer: while (i < text.length) {
		for (const [latin, rune] of MAP) {
			if (text.startsWith(latin, i)) {
				out += rune;
				i += latin.length;
				continue outer;
			}
		}
		// Spaces become the word divider actually used on rune stones.
		out += text[i] === ' ' ? '·' : '';
		i += 1;
	}

	return out;
}

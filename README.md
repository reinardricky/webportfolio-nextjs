# reinardricky.com

Personal portfolio — Norse-themed, built with Next.js (App Router),
Tailwind CSS and a React Three Fiber hero. Deployed on Vercel.

The design takes after God of War's Norse era: cold black stone, frost
white, a single burnished gold for anything that glows, chiselled Roman
capitals for display and a clean sans for anything you actually have to
read. Section labels carry their own Elder Futhark transliteration.

**Live:** https://reinardricky.com

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, React 19) |
| Styling | Tailwind CSS 4 (CSS-first config, no `tailwind.config.js`) |
| Type | Cinzel (display) · Inter Tight (UI) · JetBrains Mono (chrome) · Noto Sans Runic |
| 3D | three.js + React Three Fiber 9 + drei |
| Language | TypeScript |

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Where things live

```
app/
  layout.tsx        fonts, metadata, <Nav>
  page.tsx          section order + JSON-LD
  globals.css       design tokens (@theme) and base styles
components/
  site/             Nav, Hero, About, Skills, Contact, Footer
  three/            the hero scene
  motion/Reveal     scroll-reveal wrapper (CSS + IntersectionObserver)
lib/
  site.ts           name, email, socials, nav — edit this first
  skills.ts         the skills list
  runes.ts          Elder Futhark stroke data + transliteration
```

## Editing content

Almost everything personal lives in [`lib/site.ts`](lib/site.ts). The
optional fields (`location`, `availability`, `resumeUrl`) render only when
filled in, so leaving one empty removes it from the page rather than
showing a placeholder.

Prose lives in the components themselves: `components/site/About.tsx`
holds the bio, `lib/skills.ts` the skill list and one-line notes.

## The hero scene

A Bifröst rune gate: three concentric rings inscribed with real Elder
Futhark, counter-rotating at different speeds over a breathing core, with
embers drifting up past it. The gate leans toward the cursor and opens as
you scroll.

Everything glowing uses `THREE.AdditiveBlending`, which is what makes
light read as light on a dark ground. The glow itself is baked into the
rune texture with canvas `shadowBlur` rather than a post-processing bloom
pass — one texture upload instead of an extra full-screen render target
every frame.

The runes are not a font. `lib/runes.ts` defines all 24 Elder Futhark
glyphs as stroke coordinates, which `runeTexture.ts` draws into a strip
that wraps around each ring. Same data drives the SVG fallback.

It is built to stay cheap:

- **Lazy-loaded.** three.js is a dynamic import, kept out of the first
  payload entirely.
- **Never renders when unseen.** An IntersectionObserver switches the
  frameloop off once the hero scrolls away.
- **Honours `prefers-reduced-motion`.** Renders one posed frame, then the
  GPU goes idle.
- **Degrades three ways.** No WebGL, a shader that will not link, or a lost
  context all fall back to `StaticShell` — the same gate, drawn once as
  plain SVG. That SVG is also what the server renders, so the hero is
  never empty.
- **Lighter on phones.** 90 embers instead of 260; device pixel ratio
  capped at 1.75.

## Design lab (`/lab`)

Three candidate directions live at `/lab`, each a full page on its own
route, with a switcher pinned to the bottom so they can be compared back
to back:

| | Direction | The 3D scene |
|---|---|---|
| I | **Yggdrasil** | A branching world tree drawn in light, sap pulsing outward along every branch |
| II | **Muspelheim** | A mass of iron at working heat, cracks glowing molten, sparks rising |
| III | **Runestone** | A carved standing stone, runes cut and filled with red ochre, under raking light |

They share content (`lib/site.ts`, `lib/skills.ts`) and differ in palette,
type, layout and scene. Palettes are semantic tokens (`--c-bg`, `--c-hot`,
…) re-pointed by a `.theme-*` class, so utilities like `bg-bg` and
`text-hot` work identically in all three.

The lab is self-contained: its extra fonts are declared in
`app/lab/layout.tsx` so they never load on the live site, and the site's
nav and vignette live in the `app/(site)` route group so they do not bleed
into the candidates. Once a direction is chosen, promote it and delete
`app/lab/` and `components/lab/`.

## Still to do

- Add a **projects section** — live demos matter more to most readers than
  anything else on the page.
- Refresh the About copy; it still describes a student.

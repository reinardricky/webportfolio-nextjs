import Monument from '@/components/site/hero/Monument';
import Plate from '@/components/site/hero/Plate';
import Straddle from '@/components/site/hero/Straddle';
import TitleScreen from '@/components/site/hero/TitleScreen';
import { site, type HeroLayout } from '@/lib/site';

const LAYOUTS = {
	straddle: Straddle,
	monument: Monument,
	plate: Plate,
	title: TitleScreen,
} satisfies Record<HeroLayout, unknown>;

/** The opening section. Pick the composition with `heroLayout` in lib/site.ts. */
export default function Hero({ layout = site.heroLayout, id = 'top' }: { layout?: HeroLayout; id?: string }) {
	const Layout = LAYOUTS[layout];
	return <Layout id={id} />;
}

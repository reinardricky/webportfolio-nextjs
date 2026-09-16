import Nav from '@/components/site/Nav';

/**
 * Chrome for the live site only. The design lab at /lab sits outside this
 * group so each candidate renders on a clean page, with no shared nav or
 * vignette bleeding into it.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="grain">
			<Nav />
			<main id="main">{children}</main>
		</div>
	);
}

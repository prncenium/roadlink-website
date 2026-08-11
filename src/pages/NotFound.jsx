import { useEffect } from 'react';
import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';
import Button from '@/components/ui/Button';
import Placeholder from '@/components/ui/Placeholder';
import { site } from '@/data/site';
import { navItems } from '@/data/nav';
import { Home, ArrowRight } from 'lucide-react';

/**
 * 404 page for the catch-all `*` route.
 *
 * Deliberately free of the router error context so it can render anywhere;
 * thrown route errors go through <RouteErrorBoundary/> below.
 */
export default function NotFound({ status = 404, title }) {
  useEffect(() => {
    document.title = `Page not found — ${site.shortName}`;
  }, []);

  const heading =
    title ?? (status === 404 ? 'This page could not be found' : 'Something went wrong on our side');

  return (
    <section aria-labelledby="notfound-heading" className="relative overflow-hidden section-y">
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-hero-glow" />

      <div className="container-page relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <span className="eyebrow">
              <span aria-hidden="true" className="h-px w-5 bg-current opacity-60" />
              Error {status}
            </span>

            <h1 id="notfound-heading" className="mt-5 text-ink">
              {heading}
            </h1>

            <p className="measure mt-6 text-lead text-body">
              The address may have changed, or the notice you were looking for has been archived.
              Use the links below, or contact us if you were following a published
              reference.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button to="/" variant="primary" size="lg">
                <Home className="h-4 w-4" aria-hidden="true" />
                Return to home
              </Button>
              <Button to="/contact" variant="secondary" size="lg">
                Contact us
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
            </div>

            <nav aria-label="Site sections" className="mt-12 border-t border-hairline pt-7">
              <h2 className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted">
                Main sections
              </h2>
              <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="rounded text-small font-medium text-ink underline-offset-4
                                 transition-colors duration-200 hover:text-accent-ink hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-6">
            <Placeholder
              art="cone"
              ratio="aspect-[4/3]"
              label="Image"
              note="Route closed — this page is not part of the published site"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Router `errorElement`. Reads the thrown route error and renders the same
 * presentation with the correct status. Only mounted by a data router.
 */
export function RouteErrorBoundary() {
  const error = useRouteError();
  const status = isRouteErrorResponse(error) ? error.status : 500;

  if (import.meta.env.DEV) {
    console.error('[router] route error:', error);
  }

  return <NotFound status={status} />;
}

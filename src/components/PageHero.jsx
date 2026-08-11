import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Inner-page banner.
 *
 * `tone="light"` (default) — soft blue glow on white.
 * `tone="dark"`  — #0A3358 band with the white dotted texture used by the
 *                  homepage portfolio section.
 */
export default function PageHero({
  eyebrow,
  title,
  highlight,
  lead,
  breadcrumb = [],
  tone = 'light',
}) {
  const prefersReducedMotion = useReducedMotion();
  const isDark = tone === 'dark';

  const anim = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
        };

  let titleNode = title;
  if (highlight && typeof title === 'string' && title.includes(highlight)) {
    const [before, ...after] = title.split(highlight);
    titleNode = (
      <>
        {before}
        <span className="accent-word">{highlight}</span>
        {after.join(highlight)}
      </>
    );
  }

  return (
    <section
      aria-labelledby="page-hero-heading"
      className={[
        'relative overflow-hidden',
        isDark ? 'on-dark bg-primary-dark' : 'border-b border-hairline bg-white',
      ].join(' ')}
    >
      <span
        aria-hidden="true"
        className={[
          'pointer-events-none absolute inset-0',
          isDark ? 'bg-dark-glow' : 'bg-hero-glow',
        ].join(' ')}
      />
      <span
        aria-hidden="true"
        className={[
          'pointer-events-none absolute inset-0 mask-fade-b',
          isDark ? 'bg-dots-dark opacity-60' : 'bg-dots opacity-40',
        ].join(' ')}
      />

      <div className="container-page relative py-14 md:py-20 lg:py-24">
        {breadcrumb.length > 0 && (
          <motion.nav {...anim(0)} aria-label="Breadcrumb">
            <ol
              className={[
                'flex flex-wrap items-center gap-1.5 text-small',
                isDark ? 'text-white/65' : 'text-muted',
              ].join(' ')}
            >
              {breadcrumb.map((crumb, index) => {
                const isLast = index === breadcrumb.length - 1;
                return (
                  <li key={crumb.label} className="flex items-center gap-1.5">
                    {crumb.to && !isLast ? (
                      <Link
                        to={crumb.to}
                        className={[
                          'rounded transition-colors duration-200',
                          isDark ? 'hover:text-white' : 'hover:text-ink',
                        ].join(' ')}
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        aria-current={isLast ? 'page' : undefined}
                        className={isDark ? 'text-white' : 'text-ink'}
                      >
                        {crumb.label}
                      </span>
                    )}
                    {!isLast && (
                      <ChevronRight
                        className={['h-3.5 w-3.5', isDark ? 'text-white/40' : 'text-muted/60'].join(
                          ' '
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </motion.nav>
        )}

        {eyebrow && (
          <motion.p {...anim(0.06)} className="eyebrow mt-8">
            <span aria-hidden="true" className="h-px w-5 bg-current opacity-60" />
            {eyebrow}
          </motion.p>
        )}

        <motion.h1
          {...anim(0.12)}
          id="page-hero-heading"
          className={['mt-5 max-w-4xl', isDark ? 'text-white' : 'text-ink'].join(' ')}
        >
          {titleNode}
        </motion.h1>

        {lead && (
          <motion.p
            {...anim(0.18)}
            className={['measure mt-6 text-lead', isDark ? 'text-white/70' : 'text-body'].join(' ')}
          >
            {lead}
          </motion.p>
        )}
      </div>
    </section>
  );
}

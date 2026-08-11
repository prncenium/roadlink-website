import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Card from '@/components/ui/Card';
import Pagination from '@/components/projects/Pagination';
import { sectors } from '@/data/sectors';

const PER_PAGE = 4; // 2 × 2

/**
 * Paginated 2×2 sector grid.
 *
 * Four sectors per page. The whole page of cards animates out and the next
 * animates in with a short stagger, so the change is legible rather than an
 * instant swap. Honours prefers-reduced-motion.
 */
export default function SectorGrid({ page, onPageChange, gridRef }) {
  const prefersReducedMotion = useReducedMotion();
  const totalPages = Math.ceil(sectors.length / PER_PAGE);
  const safePage = Math.min(Math.max(1, page), totalPages);
  const items = sectors.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
    exit: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.2, ease: 'easeIn' } },
  };

  return (
    <>
      <div ref={gridRef} className="scroll-mt-28">
        <AnimatePresence mode="wait">
          <motion.ol
            key={safePage}
            variants={prefersReducedMotion ? undefined : container}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={prefersReducedMotion ? undefined : 'show'}
            exit={prefersReducedMotion ? undefined : 'exit'}
            className="grid gap-8 lg:grid-cols-2 lg:gap-10"
          >
            {items.map((sector) => {
              const Icon = sector.icon;
              return (
                <motion.li
                  key={sector.id}
                  id={sector.id}
                  variants={prefersReducedMotion ? undefined : item}
                  className="group flex scroll-mt-28"
                >
                  <Card interactive accentLine className="w-full p-7 lg:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-hairline
                                   bg-surface text-primary transition-colors duration-300
                                   group-hover:border-accent/25 group-hover:bg-accent-soft group-hover:text-accent"
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-mono text-[2.25rem] font-medium leading-none tabular-nums text-hairline
                                   transition-colors duration-300 group-hover:text-accent/30"
                      >
                        {sector.step}
                      </span>
                    </div>

                    <h3 className="mt-6 text-h3 text-ink">
                      <span className="sr-only">Sector {sector.step}: </span>
                      {sector.title}
                    </h3>
                    <p className="mt-3 text-small leading-relaxed text-body">{sector.summary}</p>

                    <dl className="mt-6 flex flex-col gap-5 border-t border-hairline pt-5">
                      {sector.groups.map((group) => (
                        <div key={group.label}>
                          <dt className="font-mono text-eyebrow uppercase tracking-eyebrow text-accent-ink">
                            {group.label}
                          </dt>
                          <dd className="mt-2.5">
                            <ul className="flex flex-wrap gap-1.5">
                              {group.items.map((entry) => (
                                <li
                                  key={entry}
                                  className="rounded-full border border-hairline bg-surface px-2.5 py-1 text-small text-body"
                                >
                                  {entry}
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </Card>
                </motion.li>
              );
            })}
          </motion.ol>
        </AnimatePresence>
      </div>

      <Pagination
        page={safePage}
        totalPages={totalPages}
        onChange={onPageChange}
        className="mt-12"
      />

      <p className="mt-6 text-center font-mono text-eyebrow uppercase tracking-eyebrow text-muted">
        Sectors {(safePage - 1) * PER_PAGE + 1}–{Math.min(safePage * PER_PAGE, sectors.length)} of{' '}
        {sectors.length}
      </p>
    </>
  );
}

export { PER_PAGE };

import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Search, X, SlidersHorizontal, ChevronDown, CheckCircle2, Loader } from 'lucide-react';
import { CATEGORIES, STATUSES, allStates, allModes } from '@/data/projects';

const STATUS_ICON = { completed: CheckCircle2, ongoing: Loader };

/**
 * Filter bar.
 *
 * The status toggle and search stay visible — they are the two controls people
 * reach for. Everything else (service line, state, mode, sort) is collapsed
 * behind a "Filters" disclosure that carries a count of what is active.
 */
export default function ProjectFilters({
  filters,
  setFilter,
  clearAll,
  counts,
  resultCount,
  totalCount,
}) {
  const panelId = useId();
  const prefersReducedMotion = useReducedMotion();

  const activeChips = [
    filters.category && {
      key: 'category',
      label: CATEGORIES.find((c) => c.id === filters.category)?.short ?? filters.category,
    },
    filters.state && { key: 'state', label: filters.state },
    filters.mode && { key: 'mode', label: filters.mode },
  ].filter(Boolean);

  // Open by default if a refinement is already applied (e.g. a shared URL).
  const [open, setOpen] = useState(activeChips.length > 0);

  return (
    <div className="rounded-3xl border border-hairline bg-white p-5 md:p-6">
      {/* ── Always visible: status toggle + search + filters button ── */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Status toggle — the active side is solid orange */}
        <div
          role="group"
          aria-label="Filter by project status"
          className="inline-flex w-full rounded-2xl border border-hairline bg-surface p-1 sm:w-auto"
        >
          {STATUSES.map((s) => {
            const active = filters.status === s.id;
            const Icon = STATUS_ICON[s.id];
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setFilter('status', s.id)}
                aria-pressed={active}
                className={[
                  'inline-flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-5',
                  'min-h-[46px] text-small font-medium transition-all duration-200 sm:flex-none',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                  active
                    ? 'bg-accent text-white shadow-xs'
                    : 'text-muted hover:text-ink',
                ].join(' ')}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                {s.label}
                <span
                  className={[
                    'rounded-full px-1.5 py-0.5 font-mono text-eyebrow tabular-nums',
                    active ? 'bg-black/30 text-white' : 'bg-white text-muted',
                  ].join(' ')}
                >
                  {counts.byStatus[s.id]}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:items-center">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <label htmlFor="project-search" className="sr-only">
              Search projects by name, corridor, client or state
            </label>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              id="project-search"
              type="search"
              value={filters.q}
              onChange={(e) => setFilter('q', e.target.value)}
              placeholder="Search corridor, client, state…"
              className="min-h-[46px] w-full rounded-xl border border-hairline bg-white py-3 pl-11 pr-4
                         text-small text-ink placeholder:text-muted/70 transition-colors duration-200
                         hover:border-primary/25 focus:border-primary focus:outline-none
                         focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            />
          </div>

          {/* Filters disclosure */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className={[
              'inline-flex min-h-[46px] cursor-pointer items-center justify-center gap-2 rounded-xl border px-5',
              'text-small font-medium transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
              open || activeChips.length > 0
                ? 'border-primary/30 bg-primary-50 text-primary'
                : 'border-hairline bg-white text-ink hover:border-primary/25',
            ].join(' ')}
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            Filters
            {activeChips.length > 0 && (
              <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-accent px-1 font-mono text-eyebrow tabular-nums text-white">
                {activeChips.length}
              </span>
            )}
            <ChevronDown
              className={[
                'h-4 w-4 transition-transform duration-300 ease-out',
                open ? 'rotate-180' : '',
              ].join(' ')}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* ── Collapsible panel ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={prefersReducedMotion ? {} : { height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {/* Service line */}
            <div className="mt-6 border-t border-hairline pt-5">
              <p className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted">
                Service line
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setFilter('category', '')}
                  aria-pressed={!filters.category}
                  className={[
                    'inline-flex min-h-[40px] cursor-pointer items-center gap-2 rounded-full border px-4',
                    'text-small transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                    !filters.category
                      ? 'border-ink bg-ink text-white'
                      : 'border-hairline bg-white text-body hover:border-primary/30 hover:text-ink',
                  ].join(' ')}
                >
                  All services
                </button>

                {CATEGORIES.map((c) => {
                  const active = filters.category === c.id;
                  const n = counts.byCategory[c.id] ?? 0;
                  const empty = n === 0;

                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setFilter('category', active ? '' : c.id)}
                      aria-pressed={active}
                      disabled={empty}
                      title={empty ? `No ${c.label} projects in this status yet` : undefined}
                      className={[
                        'inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4',
                        'text-small transition-colors duration-200',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
                        empty
                          ? 'cursor-not-allowed border-hairline bg-surface text-muted/60'
                          : active
                            ? 'cursor-pointer border-accent bg-accent text-white'
                            : 'cursor-pointer border-hairline bg-white text-body hover:border-primary/30 hover:text-ink',
                      ].join(' ')}
                    >
                      {c.short}
                      <span
                        className={[
                          'font-mono text-eyebrow tabular-nums',
                          active ? 'text-white/75' : 'text-muted',
                        ].join(' ')}
                      >
                        {n}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Refinements */}
            <div className="mt-6 grid gap-4 border-t border-hairline pt-5 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="filter-state"
                  className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted"
                >
                  State
                </label>
                <select
                  id="filter-state"
                  value={filters.state}
                  onChange={(e) => setFilter('state', e.target.value)}
                  className="min-h-[46px] cursor-pointer rounded-xl border border-hairline bg-white px-4 text-small text-ink
                             transition-colors duration-200 hover:border-primary/25 focus:border-primary focus:outline-none
                             focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <option value="">All states</option>
                  {allStates.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="filter-mode"
                  className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted"
                >
                  Delivery mode
                </label>
                <select
                  id="filter-mode"
                  value={filters.mode}
                  onChange={(e) => setFilter('mode', e.target.value)}
                  className="min-h-[46px] cursor-pointer rounded-xl border border-hairline bg-white px-4 text-small text-ink
                             transition-colors duration-200 hover:border-primary/25 focus:border-primary focus:outline-none
                             focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <option value="">All modes</option>
                  {allModes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="filter-sort"
                  className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted"
                >
                  Sort by
                </label>
                <select
                  id="filter-sort"
                  value={filters.sort}
                  onChange={(e) => setFilter('sort', e.target.value)}
                  className="min-h-[46px] cursor-pointer rounded-xl border border-hairline bg-white px-4 text-small text-ink
                             transition-colors duration-200 hover:border-primary/25 focus:border-primary focus:outline-none
                             focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <option value="ref">Reference</option>
                  <option value="length-desc">Length — longest first</option>
                  <option value="length-asc">Length — shortest first</option>
                  <option value="name">Name — A to Z</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  type="button"
                  onClick={clearAll}
                  disabled={activeChips.length === 0 && !filters.q}
                  className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl border
                             border-hairline bg-white px-4 text-small font-medium text-ink transition-colors duration-200
                             hover:border-primary/30 hover:text-accent-ink disabled:cursor-not-allowed disabled:opacity-45
                             enabled:cursor-pointer focus-visible:outline-none focus-visible:ring-2
                             focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                  Clear filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Result summary + removable chips ── */}
      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-hairline pt-5">
        <p aria-live="polite" className="text-small text-body">
          Showing <span className="font-mono font-medium tabular-nums text-ink">{resultCount}</span>{' '}
          of <span className="font-mono tabular-nums text-ink">{totalCount}</span>{' '}
          {filters.status} project{totalCount === 1 ? '' : 's'}
        </p>

        {filters.q && (
          <button
            type="button"
            onClick={() => setFilter('q', '')}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-hairline
                       bg-surface px-3 py-1.5 text-small text-body transition-colors duration-200
                       hover:border-accent/40 hover:text-accent-ink
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            “{filters.q}”
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">Clear the search</span>
          </button>
        )}

        {activeChips.map((chip) => (
          <button
            key={chip.key}
            type="button"
            onClick={() => setFilter(chip.key, '')}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-accent/30
                       bg-accent-soft px-3 py-1.5 text-small text-accent-ink transition-colors duration-200
                       hover:border-accent/60
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            {chip.label}
            <X className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">Remove this filter</span>
          </button>
        ))}
      </div>
    </div>
  );
}

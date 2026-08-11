import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import ProjectsHero from '@/components/projects/ProjectsHero';
import ProjectFilters from '@/components/projects/ProjectFilters';
import ProjectCard from '@/components/projects/ProjectCard';
import Pagination from '@/components/projects/Pagination';
import CtaBand from '@/components/CtaBand';
import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { projects, CATEGORIES, STATUSES } from '@/data/projects';
import { site } from '@/data/site';
import gridBackground from '@/assets/sectors-background.webp';

const PER_PAGE = 9;

const DEFAULTS = {
  status: 'completed',
  category: '',
  state: '',
  mode: '',
  q: '',
  sort: 'ref',
  page: '1',
};

export default function Projects() {
  useEffect(() => {
    document.title = `Projects — ${site.shortName}`;
  }, []);

  const [params, setParams] = useSearchParams();
  const resultsRef = useRef(null);
  const didMount = useRef(false);

  /* Filters live in the URL, so a filtered view is shareable and the browser
     back button steps through refinements. */
  const filters = useMemo(() => {
    const raw = Object.fromEntries(
      Object.keys(DEFAULTS).map((k) => [k, params.get(k) ?? DEFAULTS[k]])
    );
    // Guard against hand-edited URLs.
    if (!STATUSES.some((s) => s.id === raw.status)) raw.status = DEFAULTS.status;
    if (raw.category && !CATEGORIES.some((c) => c.id === raw.category)) raw.category = '';
    return raw;
  }, [params]);

  const page = Math.max(1, Number.parseInt(filters.page, 10) || 1);

  const setFilter = useCallback(
    (key, value) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (!value || value === DEFAULTS[key]) next.delete(key);
          else next.set(key, value);
          // Any refinement resets paging — otherwise you can land on an empty page.
          if (key !== 'page') next.delete('page');
          return next;
        },
        { replace: true }
      );
    },
    [setParams]
  );

  const clearAll = useCallback(() => setParams(new URLSearchParams(), { replace: true }), [setParams]);

  /* ---- derive the visible list ---- */
  const byStatus = useMemo(
    () => projects.filter((p) => p.status === filters.status),
    [filters.status]
  );

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();

    const list = byStatus.filter((p) => {
      if (filters.category && p.category !== filters.category) return false;
      if (filters.state && !p.states.includes(filters.state)) return false;
      if (filters.mode && p.mode !== filters.mode) return false;
      if (q) {
        const haystack = [p.name, p.title, p.ref, p.client, p.programme, ...p.states, ...p.highways]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    const sorters = {
      ref: (a, b) => a.ref.localeCompare(b.ref),
      name: (a, b) => a.name.localeCompare(b.name),
      // Records without a stated length sort last rather than as zero.
      'length-desc': (a, b) => (b.lengthKm ?? -1) - (a.lengthKm ?? -1),
      'length-asc': (a, b) => (a.lengthKm ?? Infinity) - (b.lengthKm ?? Infinity),
    };

    return [...list].sort(sorters[filters.sort] ?? sorters.ref);
  }, [byStatus, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const counts = useMemo(
    () => ({
      byStatus: STATUSES.reduce((acc, s) => {
        acc[s.id] = projects.filter((p) => p.status === s.id).length;
        return acc;
      }, {}),
      byCategory: CATEGORIES.reduce((acc, c) => {
        acc[c.id] = byStatus.filter((p) => p.category === c.id).length;
        return acc;
      }, {}),
    }),
    [byStatus]
  );

  /* Scroll the results into view on page change — but not on first paint,
     which would yank the visitor past the hero. */
  const handlePageChange = (next) => {
    setFilter('page', String(next));
  };

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [safePage]);

  return (
    <>
      <ProjectsHero />

      <Section
        tone="surface"
        labelledBy="register-heading"
        className="overflow-hidden"
        bgImage={gridBackground}
        bgScrim="bg-surface/65"
        bleed
      >
        {/* Wider than `.container-page` (1240px) so the outer cards sit closer
            to the page edges, matching /sectors. */}
        <div className="relative mx-auto w-full max-w-[1560px] px-4 sm:px-6">
        <h2 id="register-heading" className="sr-only">
          Project register
        </h2>

        <ProjectFilters
          filters={filters}
          setFilter={setFilter}
          clearAll={clearAll}
          counts={counts}
          resultCount={filtered.length}
          totalCount={byStatus.length}
        />

        <div ref={resultsRef} className="scroll-mt-28">
          {pageItems.length > 0 ? (
            <>
              <RevealGroup
                as="ul"
                // Re-keying on the filter signature replays the stagger whenever
                // the result set changes, so a filter click feels responsive.
                key={`${filters.status}|${filters.category}|${filters.state}|${filters.mode}|${filters.q}|${filters.sort}|${safePage}`}
                className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
              >
                {pageItems.map((project) => (
                  <RevealItem as="li" key={project.id} className="flex">
                    <ProjectCard project={project} />
                  </RevealItem>
                ))}
              </RevealGroup>

              <Pagination
                page={safePage}
                totalPages={totalPages}
                onChange={handlePageChange}
                className="mt-14"
              />

              <p className="mt-6 text-center font-mono text-eyebrow uppercase tracking-eyebrow text-muted">
                Page {safePage} of {totalPages}
              </p>
            </>
          ) : (
            <div className="mt-10 flex flex-col items-center gap-5 rounded-3xl border border-dashed border-hairline bg-white px-6 py-20 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-2xl border border-hairline bg-surface text-muted">
                <SearchX className="h-6 w-6" aria-hidden="true" />
              </span>

              <div>
                <h3 className="text-h3 text-ink">No projects match these filters</h3>
                <p className="measure mx-auto mt-3 text-small text-body">
                  {counts.byCategory[filters.category] === 0 && filters.category
                    ? 'This service line has no projects recorded under the selected status yet.'
                    : 'Try widening the search, or clearing one of the active filters.'}
                </p>
              </div>

              <Button variant="secondary" size="md" onClick={clearAll}>
                Clear all filters
              </Button>
            </div>
            )}
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

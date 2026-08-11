import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * Builds a compact page list with ellipses:
 *   1 … 4 5 [6] 7 8 … 20
 * Always shows the first and last page plus a window around the current one.
 */
function pageList(current, total, window = 1) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set([1, total, current]);
  for (let i = 1; i <= window; i++) {
    if (current - i > 1) pages.add(current - i);
    if (current + i < total) pages.add(current + i);
  }

  const sorted = [...pages].sort((a, b) => a - b);
  const out = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) out.push(`gap-${p}`);
    out.push(p);
    prev = p;
  }
  return out;
}

export default function Pagination({ page, totalPages, onChange, className = '' }) {
  if (totalPages <= 1) return null;

  const items = pageList(page, totalPages);

  const navBtn =
    'inline-flex h-11 min-w-[44px] items-center justify-center gap-1.5 rounded-xl border px-3 ' +
    'text-small font-medium transition-colors duration-200 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2';

  return (
    <nav
      aria-label="Project list pagination"
      className={['flex flex-wrap items-center justify-center gap-2', className].join(' ')}
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={[
          navBtn,
          'border-hairline bg-white text-ink',
          page === 1
            ? 'cursor-not-allowed opacity-40'
            : 'cursor-pointer hover:border-primary/30 hover:text-accent-ink',
        ].join(' ')}
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <ol className="flex items-center gap-1.5">
        {items.map((item) =>
          typeof item === 'string' ? (
            <li key={item} className="px-1 text-small text-muted" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => onChange(item)}
                aria-current={item === page ? 'page' : undefined}
                aria-label={`Go to page ${item}`}
                className={[
                  navBtn,
                  'cursor-pointer font-mono tabular-nums',
                  item === page
                    ? 'border-ink bg-ink text-white'
                    : 'border-hairline bg-white text-body hover:border-primary/30 hover:text-ink',
                ].join(' ')}
              >
                {item}
              </button>
            </li>
          )
        )}
      </ol>

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className={[
          navBtn,
          'border-hairline bg-white text-ink',
          page === totalPages
            ? 'cursor-not-allowed opacity-40'
            : 'cursor-pointer hover:border-primary/30 hover:text-accent-ink',
        ].join(' ')}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}

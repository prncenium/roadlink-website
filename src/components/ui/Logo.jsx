import { Link } from 'react-router-dom';
import { site } from '@/data/site';

/**
 * Portal identity — inline SVG emblem + wordmark.
 * `tone` flips the wordmark for dark surfaces.
 */
export default function Logo({ tone = 'light', compact = false, className = '' }) {
  const isDark = tone === 'dark';

  return (
    <Link
      to="/"
      className={[
        'group inline-flex items-center gap-3 rounded-xl',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        isDark ? 'focus-visible:ring-offset-primary-dark' : 'focus-visible:ring-offset-white',
        className,
      ].join(' ')}
      aria-label={`${site.name} — go to home page`}
    >
      <span
        className={[
          'grid shrink-0 place-items-center rounded-xl transition-colors duration-200',
          compact ? 'h-9 w-9' : 'h-10 w-10',
          isDark ? 'bg-white/10 group-hover:bg-white/15' : 'bg-primary group-hover:bg-primary-dark',
        ].join(' ')}
      >
        <svg viewBox="0 0 32 32" className="h-5 w-5" aria-hidden="true" focusable="false">
          <path
            d="M11 26 L14 6 h4 l3 20"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M16 9 v3 M16 15 v3 M16 21 v3" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>

      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={[
            'font-display font-bold tracking-[-0.03em]',
            compact ? 'text-base' : 'text-lg',
            isDark ? 'text-white' : 'text-ink',
          ].join(' ')}
        >
          {site.shortName}
        </span>
        <span
          className={[
            'mt-1 hidden truncate font-mono text-[0.625rem] uppercase tracking-eyebrow lg:block',
            isDark ? 'text-white/65' : 'text-muted',
          ].join(' ')}
        >
          Consultancy Services
        </span>
      </span>
    </Link>
  );
}

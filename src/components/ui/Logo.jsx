import { Link } from 'react-router-dom';
import { site } from '@/data/site';

/**
 * Portal identity — inline SVG emblem + two-line wordmark.
 *
 * The full trading name is long, so it is set on two lines: the distinctive
 * half in the display face, the descriptor beneath it in mono. The descriptor
 * drops away below `sm` where the navbar has no room for it.
 */
export default function Logo({ tone = 'light', compact = false, className = '' }) {
  const isDark = tone === 'dark';

  return (
    <Link
      to="/"
      className={[
        'group inline-flex items-center gap-3 rounded-xl',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        isDark ? 'focus-visible:ring-offset-ink' : 'focus-visible:ring-offset-white',
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
          <path
            d="M16 9 v3 M16 15 v3 M16 21 v3"
            stroke="#FF6B35"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </span>

      {/* aria-hidden: the accessible name already comes from the link label,
          so the split wordmark is not announced twice. */}
      <span aria-hidden="true" className="flex min-w-0 flex-col leading-none">
        <span
          className={[
            'font-display font-bold tracking-[-0.02em]',
            compact ? 'text-[0.9375rem]' : 'text-base',
            isDark ? 'text-white' : 'text-ink',
          ].join(' ')}
        >
          Road Link
        </span>
        <span
          className={[
            'mt-1 hidden whitespace-nowrap font-mono text-[0.5625rem] uppercase tracking-[0.14em] sm:block',
            isDark ? 'text-white/65' : 'text-muted',
          ].join(' ')}
        >
          Consultancy Services
        </span>
      </span>
    </Link>
  );
}

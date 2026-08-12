import { Link } from 'react-router-dom';
import { site } from '@/data/site';
import logo from '@/assets/logo.webp';

/**
 * Portal identity.
 *
 * The supplied artwork is a full lockup (mark + wordmark) on a white ground,
 * so it replaces the previous emblem-plus-text arrangement. On dark surfaces
 * it sits on a white plate, otherwise the JPEG's white background would read
 * as a stray patch.
 */
export default function Logo({ tone = 'light', compact = false, className = '' }) {
  const isDark = tone === 'dark';

  return (
    <Link
      to="/"
      className={[
        'inline-flex shrink-0 items-center rounded-xl',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2',
        isDark ? 'bg-white px-2.5 py-1.5 focus-visible:ring-offset-ink' : 'focus-visible:ring-offset-white',
        className,
      ].join(' ')}
      aria-label={`${site.name} — go to home page`}
    >
      <img
        src={logo}
        alt=""
        aria-hidden="true"
        decoding="async"
        className={[
          'w-auto object-contain transition-all duration-300',
          compact ? 'h-9 sm:h-10' : 'h-10 sm:h-12',
        ].join(' ')}
      />
    </Link>
  );
}
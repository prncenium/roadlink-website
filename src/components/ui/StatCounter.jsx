import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

/**
 * Large mono stat with a count-up that fires on scroll into view,
 * a thin label underneath and no box — stats are separated by hairlines.
 *
 * Accessibility: the animating digits are aria-hidden; the final value is
 * exposed once in a visually-hidden span so screen readers announce the real
 * figure rather than every intermediate frame.
 *
 * Props:
 *  - value / decimals / prefix / suffix
 *  - label  : the stat name
 *  - note   : small supporting line
 *  - tone   : 'light' (default) | 'dark'
 */
export default function StatCounter({
  value = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1700,
  label,
  note,
  tone = 'light',
  className = '',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const isDark = tone === 'dark';

  const format = (n) =>
    n.toLocaleString('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  // "km" is a word unit and gets set smaller; "%" and "+" stay inline.
  const hasWordUnit = /[a-z]/i.test(suffix);

  useEffect(() => {
    if (!inView) return undefined;

    if (prefersReducedMotion) {
      setDisplay(value);
      return undefined;
    }

    let frame;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3); // easeOutCubic, no overshoot

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(value * ease(progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, prefersReducedMotion]);

  return (
    <div ref={ref} className={['flex flex-col', className].filter(Boolean).join(' ')}>
      <span
        className={[
          'font-mono text-stat font-medium tabular-nums',
          isDark ? 'text-white' : 'text-ink',
        ].join(' ')}
      >
        {/* A word-like unit ("km") set at full display size overflows its
            column and wraps to its own line. Symbols (%, +) stay inline. */}
        <span aria-hidden="true" className="whitespace-nowrap">
          {prefix}
          {format(display)}
          {hasWordUnit ? (
            <span className="ml-1.5 align-baseline text-[0.42em] tracking-normal">
              {suffix.trim()}
            </span>
          ) : (
            suffix
          )}
        </span>
        <span className="sr-only">
          {prefix}
          {format(value)}
          {suffix}
        </span>
      </span>

      {label && (
        <span
          className={[
            'mt-3 text-small font-medium',
            isDark ? 'text-white/80' : 'text-ink',
          ].join(' ')}
        >
          {label}
        </span>
      )}

      {note && (
        <span className={['mt-1 text-small', isDark ? 'text-white/65' : 'text-muted'].join(' ')}>
          {note}
        </span>
      )}
    </div>
  );
}

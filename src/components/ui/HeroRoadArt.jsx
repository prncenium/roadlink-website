import { motion, useReducedMotion } from 'framer-motion';

/**
 * The large hero artwork: a wide perspective carriageway drawn in thin lines,
 * with an animated flowing dashed centre line, horizon, contour bands and
 * survey markers. Decorative — the parent labels the region.
 *
 * Scales to fill its container via preserveAspectRatio="none" on the
 * background bands, while the road geometry keeps its proportions.
 */
export default function HeroRoadArt({ className = '' }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 1200 620"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A3358" />
          <stop offset="100%" stopColor="#0F4C81" />
        </linearGradient>
        <linearGradient id="hero-tarmac" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A3358" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0A3358" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="hero-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.10" />
        </linearGradient>
      </defs>

      {/* Sky / ground field */}
      <rect width="1200" height="620" fill="url(#hero-sky)" />

      {/* Contour lines — low-opacity topography texture */}
      <g stroke="#2A6FB0" strokeOpacity="0.30" fill="none" strokeWidth="1">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M-40 ${150 + i * 26} C 200 ${110 + i * 26}, 420 ${196 + i * 26}, 640 ${158 + i * 26} S 1020 ${104 + i * 26}, 1240 ${146 + i * 26}`}
          />
        ))}
      </g>

      {/* Horizon */}
      <line x1="0" y1="248" x2="1200" y2="248" stroke="#2A6FB0" strokeOpacity="0.55" strokeWidth="1" />

      {/* Carriageway */}
      <path d="M470 248 L150 620 L1050 620 L730 248 Z" fill="url(#hero-tarmac)" />
      <path d="M470 248 L150 620" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" fill="none" />
      <path d="M730 248 L1050 620" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="2" fill="none" />

      {/* Lane divider (static, thin) */}
      <path
        d="M545 248 L385 620"
        stroke="#ffffff"
        strokeOpacity="0.16"
        strokeWidth="1.5"
        strokeDasharray="10 14"
        fill="none"
      />
      <path
        d="M655 248 L815 620"
        stroke="#ffffff"
        strokeOpacity="0.16"
        strokeWidth="1.5"
        strokeDasharray="10 14"
        fill="none"
      />

      {/* Animated centre line — the one moving element */}
      <motion.path
        d="M600 250 L600 620"
        stroke="#FF6B35"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="26 34"
        fill="none"
        {...(prefersReducedMotion
          ? {}
          : {
              animate: { strokeDashoffset: [0, -120] },
              transition: { duration: 2.6, ease: 'linear', repeat: Infinity },
            })}
      />

      {/* Survey markers along the left verge */}
      <g fill="none" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.5">
        {[
          [455, 300, 12],
          [400, 380, 15],
          [330, 470, 19],
          [246, 574, 23],
        ].map(([x, y, h]) => (
          <g key={y}>
            <line x1={x} y1={y} x2={x} y2={y - h} />
            <circle cx={x} cy={y - h - 3} r="2.5" fill="#FF6B35" stroke="none" />
          </g>
        ))}
      </g>

      {/* Dotted survey grid over the ground plane */}
      <g fill="#ffffff" fillOpacity="0.10">
        {Array.from({ length: 7 }).map((_, row) =>
          Array.from({ length: 14 }).map((__, col) => (
            <circle key={`${row}-${col}`} cx={40 + col * 88} cy={286 + row * 48} r="1.6" />
          ))
        )}
      </g>

      <rect width="1200" height="620" fill="url(#hero-fade)" />
    </svg>
  );
}

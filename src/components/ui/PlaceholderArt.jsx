/**
 * Thin line-style SVG artwork for image placeholders.
 * Minimal and modern — not clip-art. Decorative only: every export is
 * aria-hidden and inherits `currentColor`.
 */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
  focusable: 'false',
  vectorEffect: 'non-scaling-stroke',
};

export function RoadArt({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base}>
      <path d="M22 58 L28 14 M42 58 L36 14" />
      <path d="M32 18 v6 M32 30 v7 M32 43 v9" strokeDasharray="0" />
      <path d="M6 58 h52" opacity="0.45" />
    </svg>
  );
}

export function ConeArt({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base}>
      <path d="M32 10 L45 50 H19 Z" />
      <path d="M26 32 h12 M23 42 h18" />
      <path d="M12 54 h40" opacity="0.45" />
    </svg>
  );
}

export function HardHatArt({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base}>
      <path d="M14 42 a18 18 0 0 1 36 0" />
      <path d="M26 25 v-4 a6 6 0 0 1 12 0 v4" />
      <path d="M8 42 h48" />
      <path d="M24 27 c-3 5 -4 10 -4 15" opacity="0.55" />
      <path d="M40 27 c3 5 4 10 4 15" opacity="0.55" />
    </svg>
  );
}

export function BridgeArt({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base}>
      <path d="M6 38 h52" />
      <path d="M22 38 V16 M42 38 V16" />
      <path d="M22 18 L9 37 M22 18 L34 37 M42 18 L30 37 M42 18 L55 37" opacity="0.6" />
      <path d="M6 50 h52" opacity="0.45" />
    </svg>
  );
}

export function ClipboardArt({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base}>
      <rect x="16" y="12" width="32" height="42" rx="4" />
      <path d="M26 12 v-2 a2 2 0 0 1 2-2 h8 a2 2 0 0 1 2 2 v2" />
      <path d="M23 27 l3 3 l5 -6" />
      <path d="M36 28 h8" opacity="0.7" />
      <path d="M23 40 l3 3 l5 -6" />
      <path d="M36 41 h8" opacity="0.7" />
    </svg>
  );
}

export function MapPinArt({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base}>
      <path d="M32 12 a11 11 0 0 1 11 11 c0 8 -11 21 -11 21 s-11 -13 -11 -21 a11 11 0 0 1 11 -11 Z" />
      <circle cx="32" cy="23" r="4" />
      <path d="M14 52 h36" opacity="0.45" />
    </svg>
  );
}

export function MachineArt({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base}>
      <rect x="10" y="32" width="22" height="14" rx="3" />
      <path d="M32 35 L48 19 L56 23" />
      <path d="M56 23 l-3 11 l-8 -3" opacity="0.7" />
      <circle cx="17" cy="50" r="5" />
      <circle cx="32" cy="50" r="5" />
    </svg>
  );
}

export function AvatarArt({ className = '' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...base}>
      <circle cx="32" cy="25" r="9" />
      <path d="M15 52 a17 17 0 0 1 34 0" />
    </svg>
  );
}

export const placeholderArt = {
  road: RoadArt,
  cone: ConeArt,
  hardhat: HardHatArt,
  bridge: BridgeArt,
  clipboard: ClipboardArt,
  map: MapPinArt,
  machine: MachineArt,
  avatar: AvatarArt,
};

export default placeholderArt;

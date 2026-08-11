import { placeholderArt } from '@/components/ui/PlaceholderArt';

/**
 * Image placeholder — clean surface box, hairline border, rounded-2xl,
 * centred thin line SVG and a tiny "Image" caption. Minimal, not clip-arty.
 * There are no external image URLs anywhere in this project.
 *
 * Props:
 *  - art     : placeholderArt key ('road'|'cone'|'hardhat'|'bridge'|'clipboard'|'map'|'machine'|'avatar')
 *  - ratio   : Tailwind aspect utility, e.g. 'aspect-[16/9]'
 *  - label   : caption text (defaults to 'Image')
 *  - note    : optional second line describing what belongs here
 *  - tone    : 'light' (default) | 'dark'
 *  - dashed  : dashed border instead of a solid hairline
 */
export default function Placeholder({
  art = 'road',
  ratio = 'aspect-[16/9]',
  label = 'Image',
  note,
  tone = 'light',
  dashed = false,
  className = '',
}) {
  const Art = placeholderArt[art] ?? placeholderArt.road;
  const isDark = tone === 'dark';

  return (
    <div
      role="img"
      aria-label={note ? `${label} placeholder — ${note}` : `${label} placeholder`}
      className={[
        'flex w-full items-center justify-center overflow-hidden rounded-2xl',
        ratio,
        dashed ? 'border border-dashed' : 'border',
        isDark
          ? 'border-white/12 bg-white/[0.04] text-white/65'
          : 'border-hairline bg-surface-2 text-primary/35',
        className,
      ].join(' ')}
    >
      <div className="flex flex-col items-center gap-3 px-5 text-center">
        <Art className="h-10 w-10 sm:h-12 sm:w-12" />
        <span
          className={[
            'font-mono text-eyebrow uppercase tracking-eyebrow',
            isDark ? 'text-white/65' : 'text-muted',
          ].join(' ')}
        >
          {label}
        </span>
        {note && (
          <span
            className={[
              'max-w-[30ch] text-small leading-snug',
              isDark ? 'text-white/35' : 'text-muted',
            ].join(' ')}
          >
            {note}
          </span>
        )}
      </div>
    </div>
  );
}

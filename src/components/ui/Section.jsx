/**
 * Section shell — vertical rhythm, 1240px well, and the surface banding.
 *
 * Props:
 *  - tone     : 'white' | 'surface' | 'dark'
 *  - hairline : draw a 1px top separator (light tones only)
 *  - dots     : faint dotted-grid texture behind the content
 *  - bleed    : skip the container so children can go full-bleed
 */
export default function Section({
  as: Tag = 'section',
  tone = 'white',
  hairline = false,
  dots = false,
  bleed = false,
  bgImage,
  bgScrim = 'bg-white/55',
  bgImageClassName = '',
  id,
  labelledBy,
  className = '',
  containerClassName = '',
  children,
  ...rest
}) {
  const tones = {
    white: 'bg-white',
    surface: 'bg-surface',
    dark: 'bg-primary-dark text-white on-dark',
  };

  const isDark = tone === 'dark';

  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={[
        'relative section-y',
        tones[tone] ?? tones.white,
        hairline && !isDark ? 'border-t border-hairline' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {/* Optional decorative background artwork. The scrim pulls generated
          linework back into the light band that keeps body copy readable and
          white cards distinguishable from the ground. */}
      {bgImage && (
        <>
          <img
            src={bgImage}
            alt=""
            aria-hidden="true"
            decoding="async"
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover ${bgImageClassName}`}
          />
          {bgScrim && (
            <span aria-hidden="true" className={`pointer-events-none absolute inset-0 ${bgScrim}`} />
          )}
        </>
      )}

      {dots && (
        <span
          aria-hidden="true"
          className={[
            'pointer-events-none absolute inset-0 mask-fade-b',
            isDark ? 'bg-dots-dark opacity-60' : 'bg-dots opacity-40',
          ].join(' ')}
        />
      )}

      {bleed ? (
        children
      ) : (
        <div className={['container-page relative', containerClassName].filter(Boolean).join(' ')}>
          {children}
        </div>
      )}
    </Tag>
  );
}

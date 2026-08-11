import Reveal from '@/components/ui/Reveal';

/**
 * Section heading: mono uppercase eyebrow → H2 → supporting lead.
 *
 * Props:
 *  - eyebrow   : small mono label
 *  - title     : heading text
 *  - highlight : substring of `title` rendered in the accent colour
 *  - underline : render `highlight` with the accent underline instead of colour
 *  - lead      : supporting paragraph
 *  - align     : 'left' (default) | 'center'
 *  - tone      : 'light' (default) | 'dark'
 */
export default function SectionHeading({
  eyebrow,
  title,
  highlight,
  underline = false,
  lead,
  align = 'left',
  tone = 'light',
  as: Tag = 'h2',
  id,
  className = '',
}) {
  const isDark = tone === 'dark';
  const centred = align === 'center';

  let titleNode = title;
  if (highlight && typeof title === 'string' && title.includes(highlight)) {
    const [before, ...after] = title.split(highlight);
    titleNode = (
      <>
        {before}
        <span className={underline ? 'accent-underline' : 'accent-word'}>{highlight}</span>
        {after.join(highlight)}
      </>
    );
  }

  return (
    <Reveal
      className={[
        'flex flex-col',
        centred ? 'items-center text-center' : 'items-start text-left',
        className,
      ].join(' ')}
    >
      {eyebrow && (
        <span className="eyebrow mb-5">
          <span aria-hidden="true" className="h-px w-5 bg-current opacity-60" />
          {eyebrow}
        </span>
      )}

      <Tag id={id} className={isDark ? 'text-white' : 'text-ink'}>
        {titleNode}
      </Tag>

      {lead && (
        <p
          className={[
            'measure mt-5 text-lead',
            isDark ? 'text-white/65' : 'text-body',
            centred ? 'mx-auto' : '',
          ].join(' ')}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}

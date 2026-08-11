/**
 * Card — white on surface, 1px hairline border, rounded-2xl.
 * No heavy shadow: a soft xs shadow and a 2px lift on hover only,
 * plus an optional thin accent underline that grows from the left.
 *
 * Props:
 *  - interactive  : hover lift + pointer cursor
 *  - accentLine   : thin accent rule along the bottom edge that grows on hover
 *  - tone         : 'light' (default) | 'dark'
 */
export default function Card({
  as: Tag = 'div',
  interactive = false,
  accentLine = false,
  tone = 'light',
  className = '',
  children,
  ...rest
}) {
  const isDark = tone === 'dark';

  return (
    <Tag
      className={[
        'relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ease-out',
        isDark ? 'border-white/10 bg-white/[0.04]' : 'border-hairline bg-white',
        interactive
          ? isDark
            ? 'cursor-pointer hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]'
            : 'cursor-pointer hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lift'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}

      {accentLine && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-accent
                     transition-transform duration-300 ease-out group-hover:scale-x-100"
        />
      )}
    </Tag>
  );
}

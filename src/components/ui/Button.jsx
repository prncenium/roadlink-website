import { Link } from 'react-router-dom';

/**
 * Button primitive.
 *
 *  - primary   : solid orange, white text — the one confident action
 *  - secondary : ghost/outline blue with a hairline border
 *  - dark      : solid ink, for use on light surfaces
 *  - onDark    : white outline, for use inside dark bands
 *  - ghost     : text only
 *
 * Renders <Link> for `to`, <a> for `href`, otherwise a real <button>.
 */

const base =
  'group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl ' +
  // Labels must never wrap — a two-line button reads as a broken control.
  'whitespace-nowrap font-medium tracking-[-0.01em] ' +
  'transition-all duration-200 ease-out ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ' +
  'active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-55';

const variants = {
  primary:
    'bg-accent text-white hover:-translate-y-0.5 hover:bg-accent-hover hover:shadow-lift focus-visible:ring-accent focus-visible:ring-offset-white',
  secondary:
    'border border-hairline bg-white text-ink hover:-translate-y-0.5 hover:border-primary/30 hover:text-primary hover:shadow-xs focus-visible:ring-primary focus-visible:ring-offset-white',
  dark: 'bg-ink text-white hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lift focus-visible:ring-ink focus-visible:ring-offset-white',
  onDark:
    'border border-white/25 bg-white/5 text-white hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 focus-visible:ring-accent focus-visible:ring-offset-primary-dark',
  ghost:
    'text-ink hover:text-accent-ink focus-visible:ring-accent focus-visible:ring-offset-white',
};

const sizes = {
  sm: 'min-h-[44px] px-4 text-small',
  md: 'min-h-[48px] px-5 text-small',
  lg: 'min-h-[54px] px-7 text-base',
};

export default function Button({
  as,
  to,
  href,
  variant = 'primary',
  size = 'md',
  type = 'button',
  fullWidth = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    base,
    variants[variant] ?? variants.primary,
    sizes[size] ?? sizes.md,
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const Tag = as ?? 'button';
  return (
    <Tag type={Tag === 'button' ? type : undefined} className={classes} {...rest}>
      {children}
    </Tag>
  );
}

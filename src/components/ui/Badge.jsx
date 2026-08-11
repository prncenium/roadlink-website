/**
 * Pill chip — hairline border, muted text, understated.
 * "Govt Approved", "ISO 9001", "Live Inspection".
 *
 * Variants: 'default' | 'accent' | 'verified' | 'onDark'
 */
const variants = {
  default: 'border-hairline bg-white text-muted',
  accent: 'border-accent/25 bg-accent-soft text-accent-ink',
  verified: 'border-verified/25 bg-verified-soft text-verified-ink',
  onDark: 'border-white/15 bg-white/5 text-white/70',
};

export default function Badge({
  variant = 'default',
  icon: Icon,
  dot = false,
  className = '',
  children,
  ...rest
}) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1',
        'font-mono text-eyebrow uppercase tracking-eyebrow',
        variants[variant] ?? variants.default,
        className,
      ].join(' ')}
      {...rest}
    >
      {dot && (
        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
      )}
      {Icon && <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />}
      {children}
    </span>
  );
}

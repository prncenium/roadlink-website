import { AlertCircle } from 'lucide-react';

/**
 * Accessible form field — label/for, aria-invalid, aria-describedby and an
 * inline error with role="alert" so validation feedback is announced.
 *
 * Pass a `type` for <input>, `as="textarea"`, or `as="select"` with `options`.
 */
export default function Field({
  id,
  name,
  label,
  type = 'text',
  as = 'input',
  value,
  onChange,
  onBlur,
  error,
  hint,
  required = false,
  placeholder,
  autoComplete,
  rows = 6,
  options = [],
  className = '',
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined;

  const controlClasses = [
    'w-full rounded-xl border bg-white px-4 py-3 text-base text-ink',
    'placeholder:text-muted/70',
    'transition-colors duration-200',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
    error
      ? 'border-accent focus-visible:ring-accent'
      : 'border-hairline hover:border-primary/25 focus:border-primary focus-visible:ring-primary',
    'min-h-[50px]',
  ].join(' ');

  const shared = {
    id,
    name,
    value,
    onChange,
    onBlur,
    required,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': describedBy,
    className: controlClasses,
  };

  return (
    <div className={['flex flex-col gap-2', className].filter(Boolean).join(' ')}>
      <label htmlFor={id} className="text-small font-medium text-ink">
        {label}
        {required ? (
          <span className="ml-1 text-accent-ink" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 text-small font-normal text-muted">(optional)</span>
        )}
      </label>

      {as === 'textarea' && <textarea {...shared} rows={rows} placeholder={placeholder} />}

      {as === 'select' && (
        <select {...shared}>
          <option value="">Select a subject…</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      {as === 'input' && (
        <input {...shared} type={type} placeholder={placeholder} autoComplete={autoComplete} />
      )}

      {hint && !error && (
        <p id={hintId} className="text-small text-muted">
          {hint}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="flex items-start gap-1.5 text-small text-accent-ink">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

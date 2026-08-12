import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { site } from '@/data/site';
import { footerColumns, legalLinks } from '@/data/footer';

/**
 * Footer — dark, spacious, hairline-separated. Newsletter, link columns,
 * contact block, socials and a legal bar.
 */
export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | error | done
  const year = new Date().getFullYear();

  const handleSubscribe = (event) => {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

    if (!valid) {
      setStatus('error');
      return;
    }

    // No backend yet — the Express/MERN API will consume this payload.
    console.log('[newsletter] subscribe payload:', { email: email.trim() });
    setStatus('done');
    setEmail('');
  };



  return (
    <footer className="on-dark relative overflow-hidden bg-ink text-white/60">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dots-dark opacity-40 mask-fade-b"
      />

      <div className="container-page relative py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Identity + newsletter */}
          <div className="lg:col-span-4">
            <Logo tone="dark" />

            <p className="mt-6 max-w-sm text-small leading-relaxed text-white/50">
              {site.tagline}. Established 2016, empanelled with NHAI and State PWDs for road
              safety, design, inspection and project management consultancy.
            </p>


            <form onSubmit={handleSubscribe} noValidate className="mt-10">
              <h2 className="font-mono text-eyebrow uppercase tracking-eyebrow text-white/65">
                Stay updated
              </h2>
              <label htmlFor="footer-email" className="mt-3 block text-small text-white/60">
                Subscribe to get project updates and notices by email.
              </label>

              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="your.name@department.gov"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status !== 'idle') setStatus('idle');
                  }}
                  aria-invalid={status === 'error' ? 'true' : undefined}
                  aria-describedby="footer-email-status"
                  className={[
                    'min-h-[50px] w-full rounded-xl border bg-white/[0.06] px-4 py-3 text-base text-white',
                    'placeholder:text-white/30 transition-colors duration-200',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
                    status === 'error' ? 'border-accent' : 'border-white/12 hover:border-white/25',
                  ].join(' ')}
                />
                <button
                  type="submit"
                  className="inline-flex min-h-[50px] cursor-pointer items-center justify-center gap-2 rounded-xl
                             bg-accent px-5 text-small font-medium text-white transition-all duration-200
                             hover:-translate-y-0.5 hover:bg-accent-hover
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
                >
                  Subscribe
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <p
                id="footer-email-status"
                role="status"
                aria-live="polite"
                className={[
                  'mt-2.5 flex items-center gap-1.5 text-small',
                  status === 'error' ? 'text-accent' : 'text-verified',
                ].join(' ')}
              >
                {status === 'error' && 'Enter a valid email address.'}
                {status === 'done' && (
                  <>
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    Subscribed. A confirmation has been queued.
                  </>
                )}
              </p>
            </form>
          </div>

          {/* Link columns */}
          {footerColumns.map((column) => (
            <nav key={column.id} aria-labelledby={`footer-${column.id}`} className="lg:col-span-2">
              <h2
                id={`footer-${column.id}`}
                className="font-mono text-eyebrow uppercase tracking-eyebrow text-white/65"
              >
                {column.title}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="inline-block rounded text-small text-white/60 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="inline-block rounded text-small text-white/60 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Offices + contact */}
          <div className="lg:col-span-4">
            <h2 className="font-mono text-eyebrow uppercase tracking-eyebrow text-white/65">
              Offices
            </h2>

            <div className="mt-5 flex flex-col gap-5">
              {site.offices.map((office) => (
                <address key={office.id} className="not-italic">
                  <p className="font-mono text-eyebrow uppercase tracking-eyebrow text-white/45">
                    {office.label}
                  </p>
                  <p className="mt-1.5 flex gap-2.5 text-small leading-relaxed text-white/60">
                    <MapPin
                      className={[
                        'mt-0.5 h-4 w-4 shrink-0',
                        office.status === 'current' ? 'text-accent' : 'text-white/30',
                      ].join(' ')}
                      aria-hidden="true"
                    />
                    <span>
                      {office.organisation && (
                        <>
                          <span className="font-medium text-white">{office.organisation}</span>
                          <br />
                        </>
                      )}
                      {office.lines.join(', ')}
                    </span>
                  </p>
                </address>
              ))}
            </div>

            <h2 className="mt-8 font-mono text-eyebrow uppercase tracking-eyebrow text-white/65">
              Contact
            </h2>
            <div className="mt-4 flex flex-col gap-3 text-small text-white/60">
              <a
                href={site.contact.phoneHref}
                className="flex gap-2.5 rounded transition-colors duration-200 hover:text-white"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/30" aria-hidden="true" />
                {site.contact.phone}
              </a>
              <a
                href={site.contact.phoneAltHref}
                className="flex gap-2.5 rounded transition-colors duration-200 hover:text-white"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/30" aria-hidden="true" />
                {site.contact.phoneAlt}
              </a>
              <a
                href={site.contact.emailHref}
                className="flex gap-2.5 break-all rounded transition-colors duration-200 hover:text-white"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/30" aria-hidden="true" />
                {site.contact.email}
              </a>
              <a
                href={site.contact.emailAltHref}
                className="flex gap-2.5 break-all rounded transition-colors duration-200 hover:text-white"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/30" aria-hidden="true" />
                {site.contact.emailAlt}
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-center md:flex-row md:text-left">
          <p className="text-small text-white/65">
            © {year} {site.name}. Content owned and maintained by the {site.department}.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="rounded text-small text-white/65 transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

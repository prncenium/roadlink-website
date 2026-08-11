import { Phone, Mail } from 'lucide-react';
import { site } from '@/data/site';

/**
 * Slim utility strip.
 *
 * A thin accent hairline sits above a light, low-contrast row — no fat
 * coloured header block. Scrolls away; the sticky <Navbar/> stays behind it.
 */
export default function Header() {
  return (
    <header className="relative z-base hidden border-b border-hairline bg-white md:block">
      {/* Thin top accent line */}
      <div aria-hidden="true" className="h-[3px] w-full bg-accent" />

      <div className="container-page flex items-center justify-between gap-8 py-2.5">
        <p className="truncate font-mono text-eyebrow uppercase tracking-eyebrow text-muted">
          <span className="sr-only">Issued by </span>
          {site.department}
        </p>

        <div className="flex shrink-0 items-center gap-6 whitespace-nowrap text-small">
          <a
            href={site.contact.phoneHref}
            className="inline-flex items-center gap-2 rounded text-muted transition-colors duration-200 hover:text-ink"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">Helpline: </span>
            {site.contact.phone}
          </a>

          <a
            href={site.contact.emailHref}
            className="hidden items-center gap-2 rounded text-muted transition-colors duration-200 hover:text-ink lg:inline-flex"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="sr-only">Email: </span>
            {site.contact.email}
          </a>

        </div>
      </div>
    </header>
  );
}

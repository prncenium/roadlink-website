import { ExternalLink } from 'lucide-react';

/**
 * Live Google Maps embed.
 *
 * Uses the keyless `maps.google.com/maps?output=embed` endpoint, so no API key
 * or billing account is needed. Swap to the Maps Embed API
 * (`google.com/maps/embed/v1/place?key=…`) if you later want styled maps.
 *
 * NOTE: this is the project's only third-party network request at runtime —
 * the iframe loads from google.com, which sets cookies for the visitor.
 *
 * Props:
 *  - query  : address or "lat,lng" to centre on
 *  - label  : accessible title for the iframe
 *  - zoom   : map zoom level (default 15)
 *  - ratio  : Tailwind aspect utility
 */
export default function MapEmbed({
  query,
  label = 'Map',
  zoom = 15,
  ratio = 'aspect-[4/3]',
  className = '',
}) {
  const q = encodeURIComponent(query);
  const embedSrc = `https://maps.google.com/maps?q=${q}&z=${zoom}&hl=en&output=embed`;
  const externalHref = `https://www.google.com/maps/search/?api=1&query=${q}`;

  return (
    <figure className={['flex flex-col', className].filter(Boolean).join(' ')}>
      <div
        className={[
          'relative w-full overflow-hidden rounded-2xl border border-hairline bg-surface-2',
          ratio,
        ].join(' ')}
      >
        <iframe
          src={embedSrc}
          title={label}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>

      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <span className="text-small text-muted">{query}</span>
        <a
          href={externalHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded text-small font-medium text-ink
                     transition-colors duration-200 hover:text-accent-ink
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Open in Google Maps
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </figcaption>
    </figure>
  );
}

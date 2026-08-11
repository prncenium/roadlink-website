import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import StatCounter from '@/components/ui/StatCounter';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { portfolioBreakdown, companyFacts } from '@/data/stats';

/**
 * Portfolio band — project counts per service line as large mono numbers
 * separated by hairlines, with the firm's standing facts underneath.
 */
export default function StatsBand() {
  return (
    <Section tone="dark" dots labelledBy="portfolio-heading" className="overflow-hidden">
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dark-glow" />

      <div className="relative">
        <SectionHeading
          id="portfolio-heading"
          eyebrow="Portfolio by numbers"
          title="Where the work has been done"
          highlight="the work"
          lead="Commissions delivered across five service lines for national and state highway authorities."
          tone="dark"
          align="center"
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
          {portfolioBreakdown.map((line, index) => (
            <RevealItem
              key={line.id}
              // Hairline separators only at lg, where the row never wraps.
              className={['lg:px-6', index > 0 ? 'lg:border-l lg:border-white/10' : ''].join(' ')}
            >
              <StatCounter value={line.total} label={line.label} tone="dark" />

              {line.ongoing > 0 && (
                <p className="mt-3 font-mono text-eyebrow uppercase tracking-eyebrow text-accent">
                  {line.completed} completed · {line.ongoing} ongoing
                </p>
              )}

              <p className="mt-2 text-small leading-relaxed text-white/65">{line.detail}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Standing facts */}
        <RevealGroup className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {companyFacts.map((fact) => (
            <RevealItem key={fact.id} className="bg-primary-dark px-6 py-6">
              <p className="font-mono text-eyebrow uppercase tracking-eyebrow text-white/65">
                {fact.label}
              </p>
              <p className="mt-2 font-display text-h3 text-white">{fact.value}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}

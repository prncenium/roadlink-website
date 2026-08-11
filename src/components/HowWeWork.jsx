import { Check } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { methodology } from '@/data/methodology';
import { capabilities } from '@/data/stats';

/**
 * "How the company works" — the operating methodology.
 *
 * Four numbered pillars followed by the technical inventory that backs them.
 * Given a dedicated section on the homepage rather than being folded into
 * About, so the approach is visible without a second click.
 */
export default function HowWeWork() {
  return (
    <Section id="how-we-work" tone="surface" labelledBy="how-we-work-heading">
      <SectionHeading
        id="how-we-work-heading"
        eyebrow="How we work"
        title="A defined method, applied to every commission"
        highlight="defined method"
        lead="Team assembly, site supervision, quality assurance and design technology follow written procedures — the same on a 13 km state highway package as on a 200 km national corridor."
        align="center"
      />

      {/* Four pillars */}
      <RevealGroup as="ol" className="mt-14 grid gap-5 lg:grid-cols-2">
        {methodology.map((pillar) => {
          const Icon = pillar.icon;

          return (
            <RevealItem as="li" key={pillar.id} className="group flex">
              <Card interactive accentLine className="w-full p-7 lg:p-9">
                <div className="flex items-start justify-between gap-5">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-hairline
                               bg-surface text-primary transition-colors duration-300
                               group-hover:border-accent/25 group-hover:bg-accent-soft group-hover:text-accent"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <span
                    aria-hidden="true"
                    className="font-mono text-[2.5rem] font-medium leading-none tabular-nums text-hairline
                               transition-colors duration-300 group-hover:text-accent/30"
                  >
                    {pillar.step}
                  </span>
                </div>

                <h3 className="mt-6 text-h3 text-ink">
                  <span className="sr-only">Step {pillar.step}: </span>
                  {pillar.title}
                </h3>

                <p className="mt-3 text-small leading-relaxed text-body">{pillar.summary}</p>

                <ul className="mt-6 flex flex-col gap-2.5 border-t border-hairline pt-5">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-small text-body">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-verified" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>

                {pillar.badge && (
                  <div className="mt-5">
                    <Badge variant="verified">{pillar.badge}</Badge>
                  </div>
                )}
              </Card>
            </RevealItem>
          );
        })}
      </RevealGroup>

      {/* Technical inventory backing the method */}
      <RevealGroup className="mt-6 grid gap-5 md:grid-cols-3">
        {capabilities.map((group) => (
          <RevealItem key={group.id} className="flex">
            <div className="w-full rounded-2xl border border-hairline bg-white p-7">
              <h3 className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted">
                {group.title}
              </h3>

              <ul className="mt-5 flex flex-col gap-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 border-b border-hairline pb-3 text-small text-body last:border-b-0 last:pb-0"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

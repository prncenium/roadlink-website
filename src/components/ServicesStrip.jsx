import { ArrowUpRight, Check } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Placeholder from '@/components/ui/Placeholder';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { services } from '@/data/services';
import servicesBackground from '@/assets/services-background.webp';

/** Bento spans — asymmetric but aligned on a 6-column grid. */
const spans = ['lg:col-span-4', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-4'];

export default function ServicesStrip() {
  return (
    <Section
      id="services"
      tone="surface"
      labelledBy="services-heading"
      bgImage={servicesBackground}
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="services-heading"
          eyebrow="What we do"
          title="Inspection services for public road works"
          highlight="public road works"
          lead="Four statutory service lines, delivered by certified inspection officers and accredited laboratories across all fourteen regional circles."
          className="md:max-w-2xl"
        />

        <Button to="/contact" variant="secondary" size="md" className="shrink-0">
          Request a service
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>

      <RevealGroup as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {services.map((service, index) => {
          const Icon = service.icon;
          const wide = spans[index] === 'lg:col-span-4';

          return (
            <RevealItem
              as="li"
              key={service.id}
              className={['group flex', spans[index] ?? 'lg:col-span-3'].join(' ')}
            >
              <Card as="article" interactive accentLine className="w-full p-7 lg:p-8">
                <div className={wide ? 'flex flex-col gap-7 sm:flex-row sm:items-start' : ''}>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-hairline
                                   bg-surface text-primary transition-colors duration-300
                                   group-hover:border-accent/25 group-hover:bg-accent-soft group-hover:text-accent"
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted">
                        {service.code}
                      </span>
                    </div>

                    <h3 className="mt-6 text-h3 text-ink">{service.title}</h3>
                    <p className="mt-3 text-small leading-relaxed text-body">{service.summary}</p>

                    <ul className="mt-6 flex flex-col gap-2.5">
                      {service.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-small text-body">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-verified"
                            aria-hidden="true"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={service.href}
                      className="mt-7 inline-flex items-center gap-1.5 rounded text-small font-medium text-ink
                                 transition-colors duration-200 hover:text-accent-ink
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      Service details
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                      <span className="sr-only"> for {service.title}</span>
                    </a>
                  </div>

                  {/* Wide cards carry a small visual to break the grid rhythm.
                      Falls back to a placeholder until the photo exists. */}
                  {wide &&
                    (service.image ? (
                      <img
                        src={service.image}
                        alt={service.imageAlt ?? ''}
                        loading="lazy"
                        decoding="async"
                        className="hidden aspect-[4/3] w-full max-w-[240px] shrink-0 rounded-2xl border border-hairline object-cover sm:block"
                      />
                    ) : (
                      <Placeholder
                        art={index === 0 ? 'road' : 'clipboard'}
                        ratio="aspect-[4/3]"
                        label="Image"
                        className="hidden w-full max-w-[240px] shrink-0 sm:flex"
                      />
                    ))}
                </div>
              </Card>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}

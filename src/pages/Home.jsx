import { useEffect } from 'react';
import Hero from '@/components/Hero';
import ServicesStrip from '@/components/ServicesStrip';
import StatsBand from '@/components/StatsBand';
import HowWeWork from '@/components/HowWeWork';
import ProcessRow from '@/components/ProcessRow';
import CtaBand from '@/components/CtaBand';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import MapEmbed from '@/components/ui/MapEmbed';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { site } from '@/data/site';
import { ArrowRight, Scale, ShieldCheck, FileCheck2, MapPin } from 'lucide-react';

const assurancePoints = [
  {
    id: 'independent',
    title: 'Structurally independent',
    body: 'Inspection officers report to the firm, never to the executing agency or the contractor whose work they assess.',
    icon: Scale,
  },
  {
    id: 'accredited',
    title: 'Accredited testing',
    body: 'All laboratory work is carried out within an ISO/IEC 17025 accredited scope, with instruments traceable to national standards.',
    icon: ShieldCheck,
  },
  {
    id: 'evidenced',
    title: 'Evidence-backed verdicts',
    body: 'Every pass, conditional pass or non-conformance is supported by a measurement, a test certificate or dated site photography.',
    icon: FileCheck2,
  },
];

export default function Home() {
  useEffect(() => {
    document.title = `${site.shortName} — ${site.tagline}`;
  }, []);

  return (
    <>
      <Hero />

      {/* Mandate */}
      <Section tone="white" labelledBy="mandate-heading">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="mandate-heading"
              eyebrow="Our mandate"
              title="An independent check on every road we help deliver"
              highlight="independent check"
              lead="We verify that road works meet the specifications they were designed to meet — before the asset is handed over, not after it fails."
            />

            <Reveal delay={0.2} className="mt-9 flex flex-wrap items-center gap-3">
              <Button to="/about" variant="secondary" size="md">
                About the firm
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
              <Badge variant="verified" icon={ShieldCheck}>
                98.6% compliance
              </Badge>
            </Reveal>
          </div>

          <RevealGroup as="ul" className="flex flex-col lg:col-span-7">
            {assurancePoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <RevealItem
                  as="li"
                  key={point.id}
                  className={[
                    'group flex gap-6 py-7',
                    index > 0 ? 'border-t border-hairline' : 'pt-0',
                  ].join(' ')}
                >
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-hairline
                               bg-surface text-primary transition-colors duration-300
                               group-hover:border-accent/25 group-hover:bg-accent-soft group-hover:text-accent"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-h3 text-ink">{point.title}</h3>
                    <p className="mt-2.5 text-small leading-relaxed text-body">{point.body}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Section>

      <ServicesStrip />

      <StatsBand />

      <HowWeWork />

      <ProcessRow />

      {/* Offices */}
      <Section tone="surface" labelledBy="offices-heading">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="offices-heading"
              eyebrow="Where to find us"
              title="Office and registered addresses"
              highlight="registered addresses"
              lead="Correspondence should be sent to the current office address. Previous and registered addresses are listed for record and tender documentation."
            />

            <RevealGroup as="ul" className="mt-10 flex flex-col gap-4">
              {site.offices.map((office) => {
                const isCurrent = office.status === 'current';
                return (
                  <RevealItem as="li" key={office.id} className="group flex">
                    <Card
                      interactive={isCurrent}
                      accentLine={isCurrent}
                      className={[
                        'w-full p-6',
                        isCurrent ? '' : 'bg-white/60',
                      ].join(' ')}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <p className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted">
                          {office.label}
                        </p>
                        {isCurrent && <Badge variant="verified">Current</Badge>}
                      </div>

                      <address className="mt-4 flex gap-3 not-italic">
                        <MapPin
                          className={[
                            'mt-0.5 h-4 w-4 shrink-0',
                            isCurrent ? 'text-accent' : 'text-muted',
                          ].join(' ')}
                          aria-hidden="true"
                        />
                        <span className="text-small leading-relaxed text-body">
                          {office.organisation && (
                            <>
                              <span className="font-medium text-ink">{office.organisation}</span>
                              <br />
                            </>
                          )}
                          {office.lines.map((line, i) => (
                            <span key={line}>
                              {line}
                              {i < office.lines.length - 1 && <br />}
                            </span>
                          ))}
                        </span>
                      </address>
                    </Card>
                  </RevealItem>
                );
              })}
            </RevealGroup>

            <Reveal delay={0.2} className="mt-8">
              <Button to="/contact" variant="primary" size="md">
                Get in touch
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <MapEmbed
              query={site.mapQuery}
              label="Map showing the Road Link Consultancy Services office at Sector-37, One City, Rohtak"
              ratio="aspect-[4/3]"
            />
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

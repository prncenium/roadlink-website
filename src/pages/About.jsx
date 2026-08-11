import { useEffect } from 'react';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import StatCounter from '@/components/ui/StatCounter';
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { site } from '@/data/site';
import methodBackground from '@/assets/services-background.webp';
import aboutHero from '@/assets/about-hero.webp';
import aboutTeam from '@/assets/about-team.webp';
import { formation, partners, sectors, disciplines, methodology } from '@/data/about';
import { ESTABLISHED_YEAR, yearsInPractice } from '@/data/stats';
import { ArrowRight, Check, Handshake } from 'lucide-react';

export default function About() {
  useEffect(() => {
    document.title = `About Us — ${site.shortName}`;
  }, []);

  return (
    <>
      {/* ── Full-bleed hero image ─────────────────────────────────────────
          Edge to edge, above the page heading. Placeholder until the approved
          photograph is supplied — swap for an <img> with object-cover. */}
      <div className="relative h-[300px] w-full overflow-hidden bg-surface-2 sm:h-[400px] lg:h-[520px]">
        <img
          src={aboutHero}
          alt="Four Road Link consultants in hi-vis vests and hard hats reviewing highway drawings on a site table beside a newly built carriageway."
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>

      <PageHero
        eyebrow="About the firm"
        title="Planning, design and advisory for road infrastructure"
        highlight="road infrastructure"
        lead="Road Link Consultancy Services provides local planning, engineering design, project management and special advisory consultancy across India and neighbouring countries."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About Us' }]}
      />

      {/* ── Our story ─────────────────────────────────────────────────── */}
      <Section tone="surface" labelledBy="story-heading">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="story-heading"
              eyebrow="Our story"
              title="Established 2016, incorporated as a Partnership in 2018"
              highlight="Partnership"
              lead="The firm was founded to provide local planning, engineering design, project management and special advisory consultancy services."
            />

            <RevealGroup className="mt-10 grid grid-cols-2 gap-6">
              <RevealItem className="border-t border-hairline pt-4">
                <StatCounter value={yearsInPractice()} label="Years in practice" />
                <p className="mt-1 text-small text-muted">Since {ESTABLISHED_YEAR}</p>
              </RevealItem>
              <RevealItem className="border-t border-hairline pt-4">
                <StatCounter value={50} suffix="+" label="Professionals" />
                <p className="mt-1 text-small text-muted">Across eight disciplines</p>
              </RevealItem>
            </RevealGroup>
          </div>

          {/* Formation timeline */}
          <div className="lg:col-span-7">
            <RevealGroup as="ol" className="flex flex-col">
              {formation.map((item, index) => (
                <RevealItem
                  as="li"
                  key={item.id}
                  className={[
                    'flex flex-col gap-3 py-7 sm:flex-row sm:gap-10',
                    index > 0 ? 'border-t border-hairline' : 'pt-0',
                  ].join(' ')}
                >
                  <span className="shrink-0 font-mono text-small tabular-nums text-accent-ink sm:w-28">
                    {item.year}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-h3 text-ink">{item.title}</h3>
                    <p className="mt-2 text-small leading-relaxed text-body">{item.detail}</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal delay={0.15} className="mt-4 rounded-2xl border border-hairline bg-white p-7">
              <span className="eyebrow">
                <span aria-hidden="true" className="h-px w-5 bg-current opacity-60" />
                Our promise
              </span>
              <p className="measure mt-4 text-body">
                Affordable and sustainable solutions appropriate to each client&apos;s needs,
                delivered by talented and motivated staff who share a passion for professional
                excellence and high standards of care.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── Leadership: the two partners ──────────────────────────────── */}
      <Section tone="white" labelledBy="partners-heading">
        <SectionHeading
          id="partners-heading"
          eyebrow="Leadership"
          title="A partnership, led by its partners"
          highlight="its partners"
          lead="The firm is spearheaded by a dedicated leadership team functioning as a partnership."
          align="center"
        />

        <RevealGroup as="ul" className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
          {partners.map((person) => (
            <RevealItem as="li" key={person.id} className="group flex">
              <Card interactive accentLine className="w-full p-8 text-center">
                {/* Monogram stands in until portraits are supplied */}
                <span
                  aria-hidden="true"
                  className="mx-auto grid h-20 w-20 place-items-center rounded-2xl border border-hairline
                             bg-surface font-display text-h3 font-bold text-primary
                             transition-colors duration-300 group-hover:border-accent/25
                             group-hover:bg-accent-soft group-hover:text-accent-ink"
                >
                  {person.initials}
                </span>

                <h3 className="mt-6 text-h3 text-ink">{person.name}</h3>
                <p className="mt-2 font-mono text-eyebrow uppercase tracking-eyebrow text-accent-ink">
                  {person.role}
                </p>
                <p className="mt-4 text-small leading-relaxed text-body">{person.bio}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.2} className="mt-8 flex justify-center">
          <Badge variant="default" icon={Handshake}>
            Partnership firm since March 2018
          </Badge>
        </Reveal>
      </Section>

      {/* ── Sectors ───────────────────────────────────────────────────── */}
      <Section tone="dark" dots labelledBy="sectors-heading" className="overflow-hidden">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="sectors-heading"
              eyebrow="Areas of expertise"
              title="Eight sectors, one engineering practice"
              highlight="Eight sectors"
              lead="Operational domains span India and neighbouring countries, from highway corridors to marine and rail works."
              tone="dark"
            />
          </div>

          <RevealGroup as="ul" className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {sectors.map((sector) => {
              const Icon = sector.icon;
              return (
                <RevealItem as="li" key={sector.id} className="group flex">
                  <div
                    className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4
                               transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.09]"
                  >
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/12
                                 bg-white/[0.06] text-white/80 transition-colors duration-300
                                 group-hover:border-accent/40 group-hover:bg-accent/15 group-hover:text-accent"
                    >
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <span className="text-small font-medium text-white">{sector.label}</span>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Section>

      {/* ── Our team ──────────────────────────────────────────────────── */}
      <Section tone="white" labelledBy="team-heading">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <img
              src={aboutTeam}
              alt="Three engineers reviewing drawings on a tablet together at an active construction site."
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-2xl border border-hairline object-cover"
            />
          </Reveal>

          <div className="lg:col-span-7">
            <SectionHeading
              id="team-heading"
              eyebrow="Our team"
              title="A hand-picked team of transportation specialists"
              highlight="hand-picked"
              lead="Experienced consultants with a deep focus on traffic, highway and bridge engineering — a roster of over 50 professionals."
            />

            <RevealGroup as="ul" className="mt-10 grid gap-3 sm:grid-cols-2">
              {disciplines.map((d) => (
                <RevealItem
                  as="li"
                  key={d}
                  className="flex items-start gap-2.5 text-small text-body"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-verified" aria-hidden="true" />
                  {d}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      {/* ── Methodology ───────────────────────────────────────────────── */}
      <Section
        tone="surface"
        labelledBy="method-heading"
        className="overflow-hidden"
        bgImage={methodBackground}
      >
        <SectionHeading
          id="method-heading"
          eyebrow="How we work"
          title="A dynamic, multi-disciplined approach"
          highlight="multi-disciplined"
          lead="Industry-leading planning techniques and innovative solutions for complex road infrastructure projects."
          align="center"
        />

        <RevealGroup as="ol" className="mt-14 grid gap-5 lg:grid-cols-3">
          {methodology.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <RevealItem as="li" key={pillar.id} className="group flex">
                <Card interactive accentLine className="w-full p-7 lg:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-hairline
                                 bg-surface text-primary transition-colors duration-300
                                 group-hover:border-accent/25 group-hover:bg-accent-soft group-hover:text-accent"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-[2.25rem] font-medium leading-none tabular-nums text-hairline
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

                  <dl className="mt-6 flex flex-col gap-4 border-t border-hairline pt-5">
                    {pillar.points.map((point) => (
                      <div key={point.label}>
                        <dt className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted">
                          {point.label}
                        </dt>
                        <dd className="mt-1.5 text-small leading-relaxed text-body">
                          {point.text}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {pillar.badge && (
                    <div className="mt-6">
                      <Badge variant="verified">{pillar.badge}</Badge>
                    </div>
                  )}
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <Button to="/projects" variant="primary" size="lg">
            See the project register
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Button>
        </Reveal>
      </Section>

      <CtaBand />
    </>
  );
}

import { useEffect, useRef, useState } from 'react';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import StatCounter from '@/components/ui/StatCounter';
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { site } from '@/data/site';
import sectorsHero from '@/assets/sectors-hero.webp';
import sectorsBackground from '@/assets/sectors-background.webp';
import sectorsCapability from '@/assets/sectors-capability.webp';
import SectorGrid, { PER_PAGE } from '@/components/sectors/SectorGrid';
import { sectors, sectorTotals } from '@/data/sectors';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

export default function Sectors() {
  const [page, setPage] = useState(1);
  const gridRef = useRef(null);
  const mounted = useRef(false);

  useEffect(() => {
    document.title = `Sectors — ${site.shortName}`;
  }, []);

  /* Scroll the grid into view on page change — but not on first paint,
     which would jump the visitor past the hero. */
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [page]);

  /* Jump nav has to move to the page holding the sector, then scroll. */
  const goToSector = (id) => {
    const index = sectors.findIndex((s) => s.id === id);
    if (index < 0) return;
    const target = Math.floor(index / PER_PAGE) + 1;
    if (target === page) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      setPage(target);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Sectors & disciplines"
        title="Twelve sectors, one engineering practice"
        highlight="Twelve sectors"
        lead="From highway geometry and bridge design to hydrology, aviation and institutional training — the full range of disciplines the practice covers."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Sectors' }]}
        tone="dark"
      />

      {/* ── Full-bleed image slot ──────────────────────────────────────
          Placeholder until artwork is supplied — swap for an <img> with
          className="h-full w-full object-cover". */}
      <div className="relative h-[260px] w-full overflow-hidden bg-surface-2 sm:h-[340px] lg:h-[440px]">
        <img
          src={sectorsHero}
          alt="Two engineers in hi-vis vests on the deck of a major concrete highway bridge under construction, with cranes and a new carriageway beyond."
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>

      {/* ── Overview + jump navigation ─────────────────────────────── */}
      <Section tone="white" labelledBy="overview-heading">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              id="overview-heading"
              eyebrow="Overview"
              title="What the practice covers"
              highlight="the practice"
              lead="Each sector below lists its disciplines exactly as they sit in the firm's capability statement, so a client can confirm scope before appointment."
            />

            <RevealGroup className="mt-10 grid grid-cols-3 gap-6">
              <RevealItem className="border-t border-hairline pt-4">
                <StatCounter value={sectorTotals.sectors} label="Sectors" />
              </RevealItem>
              <RevealItem className="border-t border-hairline pt-4">
                <StatCounter value={sectorTotals.groups} label="Discipline groups" />
              </RevealItem>
              <RevealItem className="border-t border-hairline pt-4">
                <StatCounter value={sectorTotals.disciplines} label="Named services" />
              </RevealItem>
            </RevealGroup>
          </div>

          {/* Jump nav */}
          <div className="lg:col-span-7">
            <p className="font-mono text-eyebrow uppercase tracking-eyebrow text-muted">
              Jump to a sector
            </p>

            <RevealGroup as="ul" className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {sectors.map((sector) => {
                const Icon = sector.icon;
                return (
                  <RevealItem as="li" key={sector.id} className="group flex">
                    <button
                      type="button"
                      onClick={() => goToSector(sector.id)}
                      className="flex w-full cursor-pointer items-center gap-3.5 rounded-2xl border border-hairline bg-white px-4 py-3 text-left
                                 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lift
                                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    >
                      <span className="font-mono text-eyebrow tabular-nums text-muted">
                        {sector.step}
                      </span>
                      <span
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-hairline
                                   bg-surface text-primary transition-colors duration-300
                                   group-hover:border-accent/25 group-hover:bg-accent-soft group-hover:text-accent"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-small font-medium text-ink">
                        {sector.title}
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </Section>

      {/* ── The twelve sectors ─────────────────────────────────────── */}
      <Section
        tone="surface"
        labelledBy="sectors-list-heading"
        className="overflow-hidden"
        bgImage={sectorsBackground}
        bgScrim="bg-surface/65"
        bleed
      >
        {/* Wider than `.container-page` (1240px) so the outer cards sit closer
            to the page edges than the rest of the site. */}
        <div className="relative mx-auto w-full max-w-[1560px] px-4 sm:px-6">
          <h2 id="sectors-list-heading" className="sr-only">
            Sectors and disciplines in detail
          </h2>

          <SectorGrid page={page} onPageChange={setPage} gridRef={gridRef} />
        </div>
      </Section>

      {/* ── Closing image slot + CTA ───────────────────────────────── */}
      <Section tone="white" labelledBy="capability-heading">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <img
              src={sectorsCapability}
              alt="Two engineers in hi-vis vests reviewing a rolled highway drawing and a tablet on a site table beside a carriageway."
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full rounded-2xl border border-hairline object-cover"
            />
          </Reveal>

          <div className="lg:col-span-6">
            <SectionHeading
              id="capability-heading"
              eyebrow="Scope confirmation"
              title="Need a discipline that is not listed?"
              highlight="not listed"
              lead="Teams are assembled per assignment, drawing local and expatriate specialists as the package requires. If a scope sits close to the list above, it is worth asking."
            />

            <Reveal delay={0.2} className="mt-9 flex flex-wrap gap-3">
              <Button to="/contact" variant="primary" size="lg">
                Discuss a requirement
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
              <Button to="/projects" variant="secondary" size="lg">
                See the project register
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Reveal>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

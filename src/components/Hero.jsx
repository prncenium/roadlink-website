import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, PlayCircle, ShieldCheck } from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import StatCounter from '@/components/ui/StatCounter';
import { heroStats } from '@/data/stats';

// Optimised via `npm run images` from the PNGs in src/assets/source/.
import heroBackground from '@/assets/hero-background.webp';
import heroInspection from '@/assets/hero-inspection.webp';

/**
 * Hero.
 *
 * Light editorial text block over a soft blue radial glow, then a large
 * full-bleed road visual with a stat strip overlapping its lower edge.
 */
export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const rise = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden bg-white">
      {/* Background artwork — purely decorative, so it carries an empty alt
          and is hidden from assistive tech. Constrained to the text block and
          faded to white at the foot so it never fights the hero visual. */}
      <img
        src={heroBackground}
        alt=""
        aria-hidden="true"
        decoding="async"
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] w-full object-cover object-right-top md:h-[760px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-gradient-to-b from-transparent via-transparent to-white md:h-[760px]"
      />
      {/* Readability scrim: the artwork's blue glow sits under the right-hand
          column, so lift the copy off it without washing the art out. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-white/45 md:h-[760px]"
      />

      <div className="container-page relative pb-14 pt-14 md:pb-20 md:pt-20 lg:pt-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          {/* Headline */}
          <div className="lg:col-span-7">
            <motion.div {...rise(0)}>
              <span className="eyebrow">
                <span aria-hidden="true" className="h-px w-5 bg-current opacity-60" />
                Road Safety, Design &amp; Inspection Consultants
              </span>
            </motion.div>

            <motion.h1 {...rise(0.08)} id="hero-heading" className="mt-6 text-ink">
              Every metre of public road, <span className="accent-word">engineered right</span>.
            </motion.h1>
          </div>

          {/* Supporting line + actions */}
          <div className="lg:col-span-5">
            <motion.p {...rise(0.16)} className="measure text-lead text-body">
              We inspect, test and certify road and highway construction on behalf of the public —
              field surveys, accredited material testing and signed compliance reports, traceable
              from subgrade to surface course.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button to="/contact" variant="primary" size="lg">
                Request an inspection
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
              {/* Targets the methodology section — the label promises "how",
                  so it should not land on the service list. */}
              <Button href="#how-we-work" variant="secondary" size="lg">
                <PlayCircle className="h-4 w-4" aria-hidden="true" />
                How we work
              </Button>
            </motion.div>

            <motion.div {...rise(0.32)} className="mt-8 flex flex-wrap items-center gap-2">
              <Badge variant="verified" icon={ShieldCheck}>
                BSI Accredited
              </Badge>
              <Badge>NHAI Empanelled</Badge>
              <Badge>Established 2016</Badge>
              <Badge variant="accent" dot>
                13 Live Packages
              </Badge>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ---- Large hero visual, contained and rounded ---- */}
      <div className="container-page relative">
        <motion.div
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 28 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
              })}
          className="relative overflow-hidden rounded-3xl border border-hairline bg-primary-dark"
        >
          <div className="relative h-[340px] sm:h-[420px] lg:h-[540px]">
            <img
              src={heroInspection}
              alt="Three inspection engineers in orange hi-vis vests and hard hats reviewing survey data on a tablet beside a total station tripod, on a newly built dual carriageway at dusk."
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Keeps the status chip legible wherever the photo is brightest */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
            />

            {/* Live-status chip */}
            <div className="absolute bottom-5 right-5 hidden items-center gap-2.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm sm:flex lg:bottom-28">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-verified opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-verified" />
              </span>
              <span className="text-small text-white/85">NH-48 Pkg 3 · inspection passed</span>
            </div>
          </div>
        </motion.div>

        {/* Stat strip overlapping the visual's lower edge */}
        <motion.div
          {...(prefersReducedMotion
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
              })}
          className="relative z-base mx-auto -mt-10 grid max-w-5xl grid-cols-2 gap-y-8 rounded-2xl border
                     border-hairline bg-white px-6 py-8 shadow-lift sm:px-10 lg:-mt-16 lg:grid-cols-4"
        >
          {heroStats.map((stat, index) => (
            <div
              key={stat.id}
              className={[
                'px-2 sm:px-4',
                index > 0 ? 'lg:border-l lg:border-hairline' : '',
                index % 2 === 1 ? 'border-l border-hairline lg:border-l' : '',
              ].join(' ')}
            >
              <StatCounter
                value={stat.value}
                decimals={stat.decimals ?? 0}
                suffix={stat.suffix ?? ''}
                label={stat.label}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


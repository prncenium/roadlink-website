import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import StatCounter from '@/components/ui/StatCounter';
import Badge from '@/components/ui/Badge';
import { projectStats } from '@/data/projects';
import heroInspection from '@/assets/hero-inspection.webp';

/**
 * Projects hero — full-bleed photo band with a dark scrim, headline and a
 * live figure strip derived from the project register.
 */
export default function ProjectsHero() {
  const prefersReducedMotion = useReducedMotion();

  const rise = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
        };

  const figures = [
    { value: projectStats.total, suffix: '', label: 'Total assignments' },
    { value: projectStats.completed, suffix: '', label: 'Completed' },
    { value: projectStats.ongoing, suffix: '', label: 'Ongoing' },
    { value: projectStats.totalKm, suffix: ' km', label: 'Corridor length' },
  ];

  return (
    <section aria-labelledby="projects-hero-heading" className="on-dark relative">
      <div className="relative overflow-hidden bg-primary-dark">
        {/* Photograph + scrim */}
        <img
          src={heroInspection}
          alt=""
          aria-hidden="true"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-45"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/85 to-primary-dark/45"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-dots-dark opacity-40 mask-fade-b"
        />

        <div className="container-page relative py-14 md:py-20 lg:py-24">
          <motion.nav {...rise(0)} aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-small text-white/65">
              <li className="flex items-center gap-1.5">
                <Link to="/" className="rounded transition-colors duration-200 hover:text-white">
                  Home
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-white/30" aria-hidden="true" />
              </li>
              <li>
                <span aria-current="page" className="text-white/85">
                  Projects
                </span>
              </li>
            </ol>
          </motion.nav>

          <motion.p {...rise(0.06)} className="eyebrow mt-8 text-accent">
            <span aria-hidden="true" className="h-px w-5 bg-current opacity-60" />
            Project register
          </motion.p>

          <motion.h1
            {...rise(0.12)}
            id="projects-hero-heading"
            className="mt-5 max-w-4xl text-white"
          >
            Every corridor we have <span className="text-accent">inspected</span>.
          </motion.h1>

          <motion.p {...rise(0.18)} className="measure mt-6 text-lead text-white/70">
            A public record of safety consulting, design and audit assignments across national and
            state highway packages — filterable by service line, state and delivery mode.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap items-center gap-2">
            <Badge variant="onDark" dot>
              {projectStats.states} states
            </Badge>
            <Badge variant="onDark">NHAI · NHIDCL · State PWD</Badge>
            <Badge variant="onDark">EPC · HAM · BOT · DBFOT</Badge>
          </motion.div>
        </div>
      </div>

      {/* Figure strip */}
      <div className="border-b border-hairline bg-white">
        <div className="container-page">
          <div className="grid grid-cols-2 gap-y-8 py-10 lg:grid-cols-4">
            {figures.map((f, index) => (
              <div
                key={f.label}
                className={[
                  'px-2 sm:px-6',
                  index > 0 ? 'lg:border-l lg:border-hairline' : '',
                  index % 2 === 1 ? 'border-l border-hairline lg:border-l' : '',
                ].join(' ')}
              >
                <StatCounter value={f.value} suffix={f.suffix} label={f.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

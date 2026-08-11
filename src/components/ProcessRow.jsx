import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import processDiagram from '@/assets/process-diagram.webp';
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { processSteps } from '@/data/process';

/**
 * "How inspection works" — four stages linked by an animated dashed road line.
 */
export default function ProcessRow() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section id="process" tone="white" hairline labelledBy="process-heading">
      <SectionHeading
        id="process-heading"
        eyebrow="How inspection works"
        title="From request to certification in four stages"
        highlight="four stages"
        lead="Every case follows the same statutory sequence, whatever the package size. Each stage produces a record retained for the life of the asset."
        align="center"
      />

      <div className="relative mt-16">
        {/* Animated dashed road line behind the step markers (desktop) */}
        <svg
          className="pointer-events-none absolute inset-x-0 top-[22px] hidden h-2 w-full lg:block"
          viewBox="0 0 1200 8"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <line x1="0" y1="4" x2="1200" y2="4" stroke="#EAEDF1" strokeWidth="2" />
          <motion.line
            x1="0"
            y1="4"
            x2="1200"
            y2="4"
            stroke="#FF6B35"
            strokeWidth="2"
            strokeDasharray="14 18"
            strokeLinecap="round"
            {...(prefersReducedMotion
              ? {}
              : {
                  animate: { strokeDashoffset: [0, -64] },
                  transition: { duration: 2.4, ease: 'linear', repeat: Infinity },
                })}
          />
        </svg>

        <RevealGroup as="ol" className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {processSteps.map((step) => {
            const Icon = step.icon;

            return (
              <RevealItem as="li" key={step.id} className="group flex flex-col">
                <div className="flex items-center gap-4">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-hairline
                               bg-white font-mono text-small text-primary transition-colors duration-300
                               group-hover:border-accent/30 group-hover:bg-accent group-hover:text-white"
                  >
                    {step.step}
                  </span>
                  <Icon
                    className="h-5 w-5 shrink-0 text-muted transition-colors duration-300 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-6 text-h3 text-ink">{step.title}</h3>
                <p className="mt-3 text-small leading-relaxed text-body">{step.description}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>

      {/* Turnaround panel */}
      <div className="mt-20 grid items-center gap-10 rounded-3xl border border-hairline bg-surface p-6 md:p-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-5">
          {/* Flat illustration on a white ground — object-contain, not cover,
              so the figure is never cropped. */}
          <img
            src={processDiagram}
            alt="Illustration of a survey engineer in a hi-vis vest recording readings on a tablet beside a total station on a tripod."
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-2xl border border-hairline bg-white object-contain p-4"
          />
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <span className="eyebrow">
            <span aria-hidden="true" className="h-px w-5 bg-current opacity-60" />
            Turnaround commitment
          </span>

          <h3 className="mt-5 text-h2 text-ink">
            Signed reports within <span className="accent-word">72 hours</span> of the field visit
          </h3>

          <p className="measure mt-5 text-body">
            Field data is uploaded from the site on the day of inspection. Laboratory results are
            appended as they are released, and the certifying officer signs the consolidated
            dossier digitally. Executing agencies track case status against the reference number
            issued at registration.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              'Reference number issued at registration',
              'Digital signature on every report',
              'Non-conformances tracked to closure',
              'Records retained for the asset lifetime',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-small text-body">
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <Button to="/contact" variant="primary" size="md">
              Start an inspection request
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

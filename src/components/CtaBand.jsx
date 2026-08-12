import { ArrowRight, Phone } from 'lucide-react';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';
import { site } from '@/data/site';

/**
 * Closing call to action — dark, spacious, one confident action.
 */
export default function CtaBand() {
  return (
    <section aria-labelledby="cta-heading" className="on-dark bg-white pb-20 md:pb-28">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-3xl bg-primary-dark px-6 py-14 md:px-14 md:py-20">
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-dark-glow" />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-dots-dark opacity-50 mask-fade-r"
          />

          <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="eyebrow">
                <span aria-hidden="true" className="h-px w-5 bg-current opacity-60" />
                Public &amp; agency services
              </span>

              <h2 id="cta-heading" className="mt-5 text-white">
                Need a road work inspected or a defect reported?
              </h2>

              <p className="mt-5 text-lead text-white/60">
                Executing agencies, contractors and members of the public can all raise a case.
                Every submission is registered and acknowledged with a reference number.
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <Button to="/contact" variant="primary" size="lg">
                Contact us
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Button>
              <Button href={site.contact.phoneHref} variant="onDark" size="lg">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.contact.phone}
              </Button>
              <Button href={site.contact.phoneAltHref} variant="onDark" size="lg">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {site.contact.phoneAlt}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { useEffect } from 'react';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import MapEmbed from '@/components/ui/MapEmbed';
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { site } from '@/data/site';
import { MapPin, Phone, Mail, Clock, Building2, Briefcase, Navigation } from 'lucide-react';

const channels = [
  {
    id: 'general',
    title: 'General enquiries',
    detail: 'Project enquiries, tender queries and all correspondence.',
    contact: site.contact.emailAlt,
    href: site.contact.emailAltHref,
    icon: Building2,
  },
  {
    id: 'hr',
    title: 'HR & careers',
    detail: 'Applications, CVs and recruitment enquiries.',
    contact: site.contact.email,
    href: site.contact.emailHref,
    contactAlt: site.contact.hrEmail,
    hrefAlt: site.contact.hrEmailHref,
    icon: Briefcase,
  },
  {
    id: 'phone',
    title: 'Call the office',
    detail: 'Monday to Friday, 09:00 – 6:00.',
    contact: site.contact.phone,
    href: site.contact.phoneHref,
    contactAlt: site.contact.phoneAlt,
    hrefAlt: site.contact.phoneAltHref,
    icon: Phone,
  },
];

export default function Contact() {
  useEffect(() => {
    document.title = `Contact Us — ${site.shortName}`;
  }, []);

  const { address, hours } = site.contact;

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Raise a case, book a test or report a defect"
        highlight="report a defect"
        lead="Every submission is registered and acknowledged with a reference number. Cases received on a working day are routed to the relevant circle office within one business day."
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Contact Us' }]}
        tone="dark"
      />

      {/* Channels */}
      <Section tone="white" labelledBy="channels-heading">
        <h2 id="channels-heading" className="sr-only">
          Contact channels
        </h2>

        <RevealGroup as="ul" className="grid gap-5 md:grid-cols-3">
          {channels.map((channel) => {
            const Icon = channel.icon;
            return (
              <RevealItem as="li" key={channel.id} className="group flex">
                <Card interactive accentLine className="w-full p-8">
                  <div className="flex items-start gap-5">
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-hairline
                                 bg-surface text-primary transition-colors duration-300
                                 group-hover:border-accent/25 group-hover:bg-accent-soft group-hover:text-accent"
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-h3 text-ink">{channel.title}</h3>
                      <p className="mt-2 text-small text-body">{channel.detail}</p>
                      <a
                        href={channel.href}
                        className="mt-4 inline-block break-all rounded text-small font-medium text-ink
                                   underline-offset-4 transition-colors duration-200 hover:text-accent-ink hover:underline
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                      >
                        {channel.contact}
                      </a>
                      {channel.contactAlt && (
                        <a
                          href={channel.hrefAlt}
                          className="mt-1.5 block break-all rounded text-small font-medium text-ink
                                     underline-offset-4 transition-colors duration-200 hover:text-accent-ink hover:underline
                                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                        >
                          {channel.contactAlt}
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Section>

      {/* Form + office */}
      <Section tone="surface" labelledBy="enquiry-heading">
        <h2 id="enquiry-heading" className="sr-only">
          Enquiry form and office information
        </h2>

        <div className="grid gap-6 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="rounded-3xl border border-hairline bg-white p-7 md:p-10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="flex flex-col gap-5">
              <div className="rounded-3xl border border-hairline bg-white p-7 md:p-8">
                <span className="eyebrow">
                  <span aria-hidden="true" className="h-px w-5 bg-current opacity-60" />
                  Head office
                </span>

                <h3 className="mt-5 text-h2 text-ink">{site.shortName} Directorate</h3>

                <address className="mt-7 flex flex-col gap-5 not-italic">
                  <span className="flex gap-3.5">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-small leading-relaxed text-body">
                      {address.line1}
                      <br />
                      {address.line2}
                      <br />
                      {address.city} — {address.postcode}, {address.country}
                    </span>
                  </span>

                  <a
                    href={site.contact.phoneHref}
                    className="flex gap-3.5 rounded text-body transition-colors duration-200 hover:text-ink"
                  >
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-small">
                      {site.contact.phone}
                      <br />
                      <span className="text-muted">{site.contact.helpline}</span>
                    </span>
                  </a>

                  <a
                    href={site.contact.phoneAltHref}
                    className="flex gap-3.5 rounded text-body transition-colors duration-200 hover:text-ink"
                  >
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-small">
                      {site.contact.phoneAlt}
                      <br />
                      <span className="text-muted">Alternate line</span>
                    </span>
                  </a>

                  <a
                    href={site.contact.emailHref}
                    className="flex gap-3.5 break-all rounded text-body transition-colors duration-200 hover:text-ink"
                  >
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-small">
                      {site.contact.emailAlt}
                      <br />
                      <span className="text-muted">General enquiries</span>
                    </span>
                  </a>

                  <a
                    href={site.contact.hrEmailHref}
                    className="flex gap-3.5 break-all rounded text-body transition-colors duration-200 hover:text-ink"
                  >
                    <Briefcase className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    <span className="text-small">
                      {site.contact.hrEmail}
                      <br />
                      <span className="text-muted">Recruitment</span>
                    </span>
                  </a>
                </address>

                <div className="mt-8 border-t border-hairline pt-6">
                  <h4 className="flex items-center gap-2 text-small font-medium text-ink">
                    <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                    Public counter hours
                  </h4>

                  <dl className="mt-4 flex flex-col">
                    {hours.map((slot, index) => (
                      <div
                        key={slot.day}
                        className={[
                          'flex items-center justify-between gap-4 py-2.5',
                          index > 0 ? 'border-t border-hairline' : '',
                        ].join(' ')}
                      >
                        <dt className="text-small text-body">{slot.day}</dt>
                        <dd className="font-mono text-small tabular-nums text-ink">{slot.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>

              </div>

            </div>
          </Reveal>
        </div>
      </Section>

      {/* Map */}
      <Section tone="white" labelledBy="map-heading">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="map-heading"
            eyebrow="Find us"
            title="Head office location"
            highlight="location"
            lead="Public Works Bhavan is served by the Sector 21 metro station. Visitor parking is available at Gate 3."
            className="md:max-w-2xl"
          />

          <Reveal delay={0.1}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface px-4 py-2.5 font-mono text-small tabular-nums text-body">
              <Navigation className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              28.5921° N, 77.1734° E
            </span>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-12">
          <MapEmbed
            query={site.mapQuery}
            label="Map showing the Road Link Consultancy Services office at Sector-37, One City, Rohtak"
            ratio="aspect-[21/9]"
          />
        </Reveal>
      </Section>
    </>
  );
}

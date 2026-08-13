import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowRight, Phone, Mail, ChevronDown } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import Button from '@/components/ui/Button';
import { navItems } from '@/data/nav';
import { site } from '@/data/site';

/**
 * Sticky slim navigation.
 *
 * - turns into a frosted translucent bar (backdrop-blur, white/80) on scroll
 * - underline-grow on hover/focus, persistent on the active route
 * - hamburger panel below `lg`; Escape closes it, background scroll locks,
 *   focus moves into the panel and returns to the toggle on close
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const { pathname } = useLocation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) setContactOpen(false);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.querySelector('a')?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      className={[
        'sticky top-0 z-sticky w-full transition-all duration-300 ease-out',
        scrolled
          ? 'border-b border-hairline bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70'
          : 'border-b border-transparent bg-white',
      ].join(' ')}
    >
      <nav aria-label="Primary" className="container-page">
        <div
          className={[
            'flex items-center justify-between gap-6 transition-all duration-300 ease-out',
            scrolled ? 'py-3' : 'py-4',
          ].join(' ')}
        >
          <div className="flex flex-col items-start">
            <Logo compact={scrolled} />
            <p className="text-xs font-semibold text-muted mt-0.5">Road Link consultancy services</p>
          </div>

          {/* Desktop links */}
          <ul className="hidden items-center gap-10 lg:flex">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className="nav-link py-1">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={site.contact.phoneAltHref}
              className="inline-flex items-center gap-2 rounded text-small text-muted transition-colors duration-200 hover:text-ink"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.contact.phoneAlt}
            </a>
            <Button to="/contact" variant="primary" size="sm">
              Request Inspection
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close main menu' : 'Open main menu'}
            className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-hairline
                       text-ink transition-colors duration-200 hover:border-primary/25 hover:text-primary
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 lg:hidden"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={prefersReducedMotion ? {} : { height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-hairline bg-white lg:hidden"
          >
            <div className="container-page py-5">
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      end={item.to === '/'}
                      className={({ isActive }) =>
                        [
                          'flex min-h-[52px] items-center justify-between gap-3 rounded-xl px-4',
                          'text-base font-medium transition-colors duration-200',
                          isActive
                            ? 'bg-surface text-ink'
                            : 'text-body hover:bg-surface hover:text-ink',
                        ].join(' ')
                      }
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4 text-muted" aria-hidden="true" />
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Contact disclosure — keeps the panel short while still
                  exposing every number and address on a phone. */}
              <div className="mt-5 border-t border-hairline pt-4">
                <button
                  type="button"
                  onClick={() => setContactOpen((v) => !v)}
                  aria-expanded={contactOpen}
                  aria-controls="mobile-contact"
                  className="flex min-h-[48px] w-full cursor-pointer items-center gap-3 rounded-xl px-4
                             text-base font-medium text-ink transition-colors duration-200 hover:bg-surface
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  <Phone className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                  <span className="flex-1 text-left">Call or email us</span>
                  <ChevronDown
                    className={[
                      'h-4 w-4 shrink-0 text-muted transition-transform duration-300 ease-out',
                      contactOpen ? 'rotate-180' : '',
                    ].join(' ')}
                    aria-hidden="true"
                  />
                </button>

                <AnimatePresence initial={false}>
                  {contactOpen && (
                    <motion.ul
                      id="mobile-contact"
                      initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                      animate={prefersReducedMotion ? {} : { height: 'auto', opacity: 1 }}
                      exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      {[
                        { id: 'p1', icon: Phone, label: site.contact.phone, href: site.contact.phoneHref },
                        { id: 'p2', icon: Phone, label: site.contact.phoneAlt, href: site.contact.phoneAltHref },
                        { id: 'e1', icon: Mail, label: site.contact.email, href: site.contact.emailHref },
                        { id: 'e2', icon: Mail, label: site.contact.emailAlt, href: site.contact.emailAltHref },
                      ].map(({ id, icon: Icon, label, href }) => (
                        <li key={id}>
                          <a
                            href={href}
                            className="flex min-h-[48px] items-center gap-3 break-all rounded-xl px-4 text-small
                                       text-body transition-colors duration-200 hover:bg-surface hover:text-ink
                                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                          >
                            <Icon className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                            {label}
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-4">
                <Button to="/contact" variant="primary" size="md" fullWidth>
                  Start an enquiry
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

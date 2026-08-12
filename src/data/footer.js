import { Linkedin, Twitter, Youtube, Facebook } from 'lucide-react';

/** Multi-column footer link groups. */
export const footerColumns = [
  {
    id: 'quick-links',
    title: 'Quick Links',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Sectors', to: '/sectors' },
      { label: 'Projects', to: '/projects' },
      { label: 'About Us', to: '/about' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
  {
    id: 'sectors',
    title: 'Sectors',
    links: [
      { label: 'Highway Design & Pavement', to: '/sectors' },
      { label: 'Structures & Bridges', to: '/sectors' },
      { label: 'Road Safety & Traffic', to: '/sectors' },
      { label: 'Geotechnical & Materials', to: '/sectors' },
      { label: 'Project & Contract Admin', to: '/sectors' },
    ],
  },
];

/** Social channels — icon-only links, each needs an aria-label. */
export const socials = [
  { id: 'linkedin', label: 'LinkedIn', href: '#linkedin', icon: Linkedin },
  { id: 'twitter', label: 'X (formerly Twitter)', href: '#twitter', icon: Twitter },
  { id: 'youtube', label: 'YouTube', href: '#youtube', icon: Youtube },
  { id: 'facebook', label: 'Facebook', href: '#facebook', icon: Facebook },
];

/** Bottom legal bar. */
export const legalLinks = [
  { label: 'Terms of Use', href: '#terms' },
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Copyright Policy', href: '#copyright' },
  { label: 'Sitemap', href: '#sitemap' },
];

/** Subject options offered on the Contact form. */
export const enquirySubjects = [
  'Request a site inspection',
  'Quality audit enquiry',
  'Material testing booking',
  'Report a road defect',
  'Tender / procurement query',
  'Right to Information (RTI)',
  'Other',
];

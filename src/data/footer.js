import { Linkedin, Twitter, Youtube, Facebook } from 'lucide-react';

/** Multi-column footer link groups. */
export const footerColumns = [
  {
    id: 'quick-links',
    title: 'Quick Links',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About Us', to: '/about' },
      { label: 'Sectors', to: '/sectors' },
      { label: 'Projects', to: '/projects' },
      { label: 'Contact Us', to: '/contact' },
      { label: 'Tenders & Notices', href: '#tenders' },
      { label: 'Circulars', href: '#circulars' },
      { label: 'Careers', href: '#careers' },
    ],
  },
  {
    id: 'services',
    title: 'Services',
    links: [
      { label: 'Site Inspection', href: '#site-inspection' },
      { label: 'Quality Audit', href: '#quality-audit' },
      { label: 'Material Testing', href: '#material-testing' },
      { label: 'Progress Reports', href: '#progress-reports' },
      { label: 'Work-Zone Safety Review', href: '#safety-review' },
    ],
  },
  {
    id: 'transparency',
    title: 'Transparency',
    links: [
      { label: 'Right to Information', href: '#rti' },
      { label: 'Public Grievance Redressal', href: '#grievance' },
      { label: 'Annual Reports', href: '#annual-reports' },
      { label: 'Inspection Standards', href: '#standards' },
      { label: 'Accessibility Statement', href: '#accessibility' },
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

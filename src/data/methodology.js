import { Users, ClipboardList, ShieldCheck, Cpu } from 'lucide-react';

/**
 * "How the company works" — the four operating pillars shown on the homepage.
 * Source: company profile document, methodology section.
 */
export const methodology = [
  {
    id: 'team-assembly',
    step: '01',
    title: 'Multi-disciplinary team assembly',
    summary:
      'Every commission is staffed with a purpose-built team of local and expatriate consultants, led by a dedicated Project Manager who is an experienced Highway Engineer.',
    points: [
      'A named Project Manager owns day-to-day administration and execution',
      'Core team supplemented by Transportation Planning, Bridges and Geotechnical specialists',
      'Composition set by the demands of the individual package, not a fixed roster',
    ],
    icon: Users,
  },
  {
    id: 'supervision',
    step: '02',
    title: 'End-to-end construction supervision',
    summary:
      'Site supervision is treated as decisive to project outcome, governed by specialised project-management techniques and a written Guideline Manual.',
    points: [
      'Strict progress monitoring and cost control throughout the contract',
      'Rapid response to construction difficulties raised on site',
      'Chartered engineers monitor contractor compliance with specifications daily',
    ],
    icon: ClipboardList,
  },
  {
    id: 'quality',
    step: '03',
    title: 'Quality control & assurance',
    summary:
      'Formalised Quality Procedures and Manuals eliminate deficiencies and hold working methods uniform across every project and office.',
    points: [
      'Third-party accredited with BSI Quality Assurance',
      'Dedicated site laboratory under a Laboratory Manager on major highway schemes',
      'On-site testing of materials and workmanship before issues reach the client',
    ],
    icon: ShieldCheck,
    badge: 'BSI accredited',
  },
  {
    id: 'technology',
    step: '04',
    title: 'Technology & data integration',
    summary:
      'Computer-aided design and drafting drives rapid iteration and side-by-side comparison of design alternatives before anything reaches site.',
    points: [
      'Highway alignment generation and automated quantity computation',
      'Analysis of traffic counts and ground survey data',
      'Financial control models built from the same design dataset',
    ],
    icon: Cpu,
  },
];

export default methodology;

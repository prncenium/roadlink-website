import {
  Users,
  Cpu,
  ShieldCheck,
  Route,
  TrainFront,
  Plane,
  Ship,
  Leaf,
  Layers,
  Building2,
} from 'lucide-react';

/**
 * ABOUT PAGE CONTENT
 * Source: company profile document.
 */

/** Formation timeline — only the two dates the profile actually states. */
export const formation = [
  {
    id: 'established',
    year: '2016',
    title: 'Firm established',
    detail:
      'Road Link Consultancy Services begins practice, offering local planning, engineering design, project management and special advisory services.',
  },
  {
    id: 'incorporated',
    year: 'March 2016',
    title: 'Incorporated as a Partnership',
    detail:
      'The firm is formally incorporated as a Partnership, with Mr. Ankit Goyal as Managing Partner and Mr. Ashish Jain as Partner.',
  },
];

/** The two partners. */
export const partners = [
  {
    id: 'ankit-goyal',
    name: 'Mr. Ankit Goyal',
    role: 'Managing Director & Managing Partner',
    initials: 'AG',
    bio: 'Leads the firm and holds overall responsibility for practice direction, client relationships and delivery across the consultancy portfolio.',
  },
  {
    id: 'ashish-jain',
    name: 'Mr. Ashish Jain',
    role: 'Partner',
    initials: 'AJ',
    bio: 'Partner in the firm, sharing responsibility for the practice and its technical and commercial oversight.',
  },
];

/** Sectors the practice operates in. */
export const sectors = [
  { id: 'highways', label: 'Highways', icon: Route },
  { id: 'transportation', label: 'Transportation', icon: Building2 },
  { id: 'airports', label: 'Airports', icon: Plane },
  { id: 'marine', label: 'Marine works', icon: Ship },
  { id: 'rail', label: 'Rail', icon: TrainFront },
  { id: 'environmental', label: 'Environmental', icon: Leaf },
  { id: 'geotechnical', label: 'Geotechnical', icon: Layers },
  { id: 'structural', label: 'Structural engineering', icon: ShieldCheck },
];

/** Disciplines represented in the 50+ strong technical team. */
export const disciplines = [
  'Highway Engineers',
  'Pavement Experts',
  'Bridge / Structural Engineers',
  'Geotechnical Engineers',
  'Civil Engineers',
  'Environmental Engineers',
  'Transport Planners',
  'Hydrologists',
];

/** Methodology — three pillars, as set out in the profile. */
export const methodology = [
  {
    id: 'project-management',
    step: '01',
    title: 'Strategic project management',
    summary:
      'Tailored teams of local and expatriate consultants, combining the exact expertise and resources each assignment demands.',
    points: [
      {
        label: 'Multi-disciplinary assembly',
        text: 'Teams built per assignment rather than drawn from a fixed roster.',
      },
      {
        label: 'Dedicated leadership',
        text: 'Every highway project runs under a dedicated Project Manager who is an experienced Highway Engineer.',
      },
      {
        label: 'Cross-departmental support',
        text: 'Core teams supplemented by Transportation Planning, Bridges and Geotechnical specialists.',
      },
      {
        label: 'Client-centric alignment',
        text: 'Heavy emphasis on early stages to interpret objectives into a detailed brief, keeping time, cost and requirements aligned.',
      },
    ],
    icon: Users,
  },
  {
    id: 'technology',
    step: '02',
    title: 'Advanced technology integration',
    summary:
      'Substantial investment in computer technology and sophisticated engineering programs for planning, design and project management.',
    points: [
      {
        label: 'Software proficiency',
        text: 'INROADS Professional, Mx Road, Civil 3D, Auto CADD and STAAD III for structural design.',
      },
      {
        label: 'Custom solutions',
        text: 'The INROAD modelling system is combined with an in-house CAD system to generate alignments, compute quantities and produce accurate drawings.',
      },
    ],
    icon: Cpu,
  },
  {
    id: 'quality',
    step: '03',
    title: 'Quality assurance & control',
    summary:
      'Systematic, formalised procedures set out in Quality Manuals and implemented by all personnel to eliminate deficiencies.',
    points: [
      {
        label: 'Accreditation',
        text: 'The quality management system is third-party accredited with BSI Quality Assurance.',
      },
      {
        label: 'On-site testing',
        text: 'Major highway schemes get a dedicated site laboratory staffed by materials testing consultants under a Laboratory Manager.',
      },
    ],
    icon: ShieldCheck,
    badge: 'BSI accredited',
  },
];

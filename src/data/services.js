import { ClipboardCheck, ShieldCheck, FlaskConical, LineChart } from 'lucide-react';

// Optimised via `npm run images` from the PNGs in src/assets/source/.
import siteInspectionImg from '@/assets/service-site-inspection.webp';
import progressReportsImg from '@/assets/service-progress-reports.webp';

/**
 * Core inspection services shown on the Home services strip
 * and in the footer "Services" column.
 */
export const services = [
  {
    id: 'site-inspection',
    code: 'SVC-01',
    title: 'Site Inspection',
    summary:
      'Scheduled and surprise field inspections of active road works, verifying execution against approved drawings and specifications.',
    points: ['Geometry & alignment checks', 'Layer thickness verification', 'Signed field reports'],
    icon: ClipboardCheck,
    href: '#site-inspection',
    image: siteInspectionImg,
    imageAlt:
      'An inspection engineer in a hi-vis vest kneeling on freshly laid asphalt, measuring surface texture depth with a gauge.',
  },
  {
    id: 'quality-audit',
    code: 'SVC-02',
    title: 'Quality Audit',
    summary:
      'Independent third-party audits of contractor quality systems, method statements and on-site conformance records.',
    points: ['Process & system audit', 'Non-conformance tracking', 'Corrective action closure'],
    icon: ShieldCheck,
    href: '#quality-audit',
  },
  {
    id: 'material-testing',
    code: 'SVC-03',
    title: 'Material Testing',
    summary:
      'NABL-accredited laboratory and on-site testing of aggregates, bitumen, concrete and subgrade soil samples.',
    points: ['Bitumen & mix design', 'Cube & core strength', 'Compaction & CBR testing'],
    icon: FlaskConical,
    href: '#material-testing',
  },
  {
    id: 'progress-reports',
    code: 'SVC-04',
    title: 'Progress Reports',
    summary:
      'Milestone-linked progress certification with measured quantities, photographic evidence and payment recommendations.',
    points: ['Monthly progress dossier', 'Measurement book review', 'Milestone certification'],
    icon: LineChart,
    href: '#progress-reports',
    image: progressReportsImg,
    imageAlt:
      'A rugged site tablet showing a progress chart, resting on a rolled highway drawing beside a hard hat and pen.',
  },
];

export default services;

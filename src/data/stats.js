/**
 * HOMEPAGE FIGURES
 *
 * Source: company profile document (portfolio breakdown, team strength,
 * turnover, technical inventory).
 *
 * ── Known conflicts with other data in this repo ──────────────────────────
 * 1. The profile states "over 6 years and 7 months" of experience while also
 *    giving 2016 as the year established. Those disagree — 2016 is ten years
 *    ago. `yearsInPractice()` derives from ESTABLISHED_YEAR so the figure can
 *    never go stale; the 6y7m number is not used anywhere.
 * 2. The profile puts Safety Consulting at 15 completed + 13 ongoing (28).
 *    The itemised register in src/data/projects.js holds 20 completed +
 *    18 ongoing (38). The figures below follow the profile as supplied.
 *    To make the homepage derive from the register instead, import
 *    `projectStats` from './projects' and swap the two values in
 *    `portfolioBreakdown`.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const ESTABLISHED_YEAR = 2016;

/** Completed years since founding — recomputed on every render. */
export const yearsInPractice = () => new Date().getFullYear() - ESTABLISHED_YEAR;

/** Portfolio by service line. `total` is what the counter animates to. */
export const portfolioBreakdown = [
  {
    id: 'pre-bid',
    label: 'Pre-Bid Services',
    total: 23,
    completed: 23,
    ongoing: 0,
    detail: 'Tender documentation, bid evaluation and contract strategy',
  },
  {
    id: 'safety-consulting',
    label: 'Safety Consulting & Inspections',
    total: 28,
    completed: 15,
    ongoing: 13,
    detail: 'Empanelled with NHAI and State PWDs',
  },
  {
    id: 'traffic-surveys',
    label: 'Traffic Engineering & Surveys',
    total: 9,
    completed: 9,
    ongoing: 0,
    detail: 'Volume counts, classification and origin–destination studies',
  },
  {
    id: 'detail-design',
    label: 'Detail Design Services',
    total: 7,
    completed: 7,
    ongoing: 0,
    detail: 'Highway geometry, pavement and structural design',
  },
  {
    id: 'proof-consulting',
    label: 'Proof Consulting Services',
    total: 2,
    completed: 2,
    ongoing: 0,
    detail: 'Independent proof checking of design submissions',
  },
];

const portfolioTotal = portfolioBreakdown.reduce((sum, p) => sum + p.total, 0);
const ongoingTotal = portfolioBreakdown.reduce((sum, p) => sum + p.ongoing, 0);

/** The four count-up figures in the hero strip. */
export const heroStats = [
  {
    id: 'projects',
    value: portfolioTotal,
    suffix: '+',
    label: 'Projects delivered',
    detail: 'Across five service lines',
  },
  {
    id: 'team',
    value: 50,
    suffix: '+',
    label: 'Specialist engineers',
    detail: 'Highway, pavement, bridge & geotechnical',
  },
  {
    id: 'years',
    value: yearsInPractice(),
    suffix: '',
    label: 'Years in practice',
    detail: `Established ${ESTABLISHED_YEAR}`,
  },
  {
    id: 'ongoing',
    value: ongoingTotal,
    suffix: '',
    label: 'Ongoing packages',
    detail: 'Live with NHAI and State PWDs',
  },
];

/** Short factual lines used beneath the portfolio band. */
export const companyFacts = [
  { id: 'established', label: 'Established', value: String(ESTABLISHED_YEAR) },
  { id: 'turnover', label: 'Annual average turnover', value: '₹2 Cr+' },
  { id: 'accreditation', label: 'Quality accreditation', value: 'BSI Quality Assurance' },
  { id: 'team', label: 'Team strength', value: '50+ professionals' },
];

/** Technical inventory, shown in the methodology section. */
export const capabilities = [
  {
    id: 'design-environment',
    title: 'Design environment',
    items: ['20+ high-configuration workstations', 'A0 / A1 plotters', 'Dedicated CADD suite'],
  },
  {
    id: 'software',
    title: 'Software suite',
    items: ['INROADS Professional', 'MX Road', 'Civil 3D', 'AutoCAD', 'STAAD III'],
  },
  {
    id: 'field-instrumentation',
    title: 'Field instrumentation',
    items: [
      '12 videography instruments',
      '3 automatic traffic counter & classifiers (ATCC)',
      '2 Benkelman beams',
      '1 bump integrator',
    ],
  },
];

/** Back-compat alias — Hero and StatsBand previously imported `stats`. */
export const stats = heroStats;

export default heroStats;

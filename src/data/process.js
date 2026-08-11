import { FileText, MapPinned, FlaskConical, BadgeCheck } from 'lucide-react';

/**
 * "How inspection works" — the 4-step public process row on Home.
 */
export const processSteps = [
  {
    id: 'request',
    step: '01',
    title: 'Request & Registration',
    description:
      'The executing agency files an inspection request. The case is registered, assigned a reference number and routed to the regional circle office.',
    icon: FileText,
  },
  {
    id: 'survey',
    step: '02',
    title: 'Field Survey',
    description:
      'A certified inspection officer conducts an on-site survey — chainage marking, geometry checks and photographic evidence capture.',
    icon: MapPinned,
  },
  {
    id: 'testing',
    step: '03',
    title: 'Sampling & Testing',
    description:
      'Representative samples are drawn under witness and tested in an accredited laboratory against the applicable IRC and MoRTH specifications.',
    icon: FlaskConical,
  },
  {
    id: 'certification',
    step: '04',
    title: 'Report & Certification',
    description:
      'Findings are compiled into a signed inspection report with a pass, conditional or non-conformance verdict and published to the project record.',
    icon: BadgeCheck,
  },
];

export default processSteps;

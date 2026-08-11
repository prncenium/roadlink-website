import {
  Route,
  Building2,
  ShieldCheck,
  Scale,
  Layers,
  ClipboardList,
  Cpu,
  Leaf,
  Ship,
  Plane,
  TrainFront,
  Users,
} from 'lucide-react';

/**
 * SECTORS & DISCIPLINES
 *
 * Source: company profile. Each sector carries its sub-disciplines verbatim,
 * grouped as they appear in the profile. Edit here and the /sectors page,
 * its jump navigation and all counts follow.
 */
export const sectors = [
  {
    id: 'highway-pavement',
    step: '01',
    title: 'Highway Design & Pavement Engineering',
    summary:
      'Design of national and state highway corridors and expressways, with pavement engineering from geometric planning through to evaluation.',
    icon: Route,
    groups: [
      {
        label: 'Highway design',
        items: [
          '4-lane National Highways',
          '6-lane National Highways',
          'State Highways',
          'Expressways',
        ],
      },
      {
        label: 'Road networks',
        items: ['Trunk roads', 'Feeder roads', 'Urban road planning', 'Rural road planning'],
      },
      {
        label: 'Pavement expertise',
        items: ['Pavement engineering', 'Pavement design', 'Pavement evaluation'],
      },
      {
        label: 'Geometric design',
        items: ['Geometric planning', 'Alignment generation'],
      },
    ],
  },
  {
    id: 'structures-bridges',
    step: '02',
    title: 'Structures & Bridge Engineering',
    summary:
      'Design, inspection and rehabilitation of bridges and grade separation, alongside building and specialised structural works.',
    icon: Building2,
    groups: [
      {
        label: 'Bridge infrastructure',
        items: [
          'Major bridges',
          'Minor bridges',
          'Cable-stayed bridges',
          'Hanging bridges',
          'Bridge inspection & rehabilitation',
        ],
      },
      {
        label: 'Grade separation',
        items: ['Flyovers', 'Interchanges', 'Railway Over Bridges (ROBs)'],
      },
      {
        label: 'Building structures',
        items: [
          'Multi-storey buildings',
          'Steel & concrete structures',
          'Commercial & industrial buildings',
          'Recreational, health & educational facilities',
        ],
      },
      {
        label: 'Specialised works',
        items: ['Elevated structures', 'Tunnels', 'Car parks'],
      },
    ],
  },
  {
    id: 'road-safety-traffic',
    step: '03',
    title: 'Road Safety & Traffic Management',
    summary:
      'Independent safety auditing and traffic study work, from accident analysis to bypass and inter-urban planning enquiries.',
    icon: ShieldCheck,
    groups: [
      {
        label: 'Safety services',
        items: ['Road safety auditing', 'Safety management', 'Traffic accident studies'],
      },
      {
        label: 'Traffic studies',
        items: [
          'Traffic surveys',
          'Traffic management',
          'Inter-urban & bypass studies',
          'Traffic advice & planning enquiries',
        ],
      },
    ],
  },
  {
    id: 'transport-planning',
    step: '04',
    title: 'Transportation Planning & Economics',
    summary:
      'Regional transport strategy backed by economic appraisal, investment due diligence and public transit planning.',
    icon: Scale,
    groups: [
      {
        label: 'Regional planning',
        items: ['National transport studies', 'Regional transport studies'],
      },
      {
        label: 'Economic analysis',
        items: ['Economic studies', 'Economic appraisals', 'Toll & investment due diligence'],
      },
      {
        label: 'Public transit',
        items: ['Public transport operations', 'Public transport planning'],
      },
    ],
  },
  {
    id: 'geotechnical',
    step: '05',
    title: 'Geotechnical & Material Science',
    summary:
      'Earth sciences, foundation and ground engineering, supported by site investigation and accredited material testing.',
    icon: Layers,
    groups: [
      {
        label: 'Earth sciences',
        items: ['Engineering geology', 'Soil mechanics', 'Rock mechanics'],
      },
      {
        label: 'Foundation & ground engineering',
        items: ['Foundation design', 'Ground improvement', 'Land remediation'],
      },
      {
        label: 'Testing & investigation',
        items: ['Site investigations', 'Soil testing', 'Material testing'],
      },
    ],
  },
  {
    id: 'project-contract',
    step: '06',
    title: 'Project Preparation & Contract Administration',
    summary:
      'End-to-end delivery support — from pre-bid and feasibility through supervision, contract administration and proof checking.',
    icon: ClipboardList,
    groups: [
      {
        label: 'Pre-construction',
        items: ['Pre-bid services', 'Tender analysis', 'Feasibility studies'],
      },
      {
        label: 'Execution oversight',
        items: ['Project management', 'Construction supervision', 'Contract administration'],
      },
      {
        label: 'Quality & design',
        items: [
          'Quality & quantity assurance',
          'Proof checking',
          'Drawing design',
          'Detailed design',
        ],
      },
    ],
  },
  {
    id: 'urban-gis',
    step: '07',
    title: 'Urban Development & Information Systems',
    summary:
      'Master planning and development monitoring, underpinned by GIS, remote sensing and bespoke software.',
    icon: Cpu,
    groups: [
      {
        label: 'Urban planning',
        items: [
          'Development plan negotiations & monitoring',
          'Development feasibility',
          'Master planning',
        ],
      },
      {
        label: 'Technology & GIS',
        items: [
          'Systems analysis',
          'Geographic Information Systems (GIS)',
          'Map digitisation',
          'Remote sensing',
          'Custom applications & software development',
        ],
      },
      {
        label: 'Data management',
        items: ['Maintenance management databases'],
      },
    ],
  },
  {
    id: 'environmental',
    step: '08',
    title: 'Environmental & Social Engineering',
    summary:
      'Environmental impact assessment and auditing, with landscape, ecology and nuisance-control consulting.',
    icon: Leaf,
    groups: [
      {
        label: 'Environmental oversight',
        items: [
          'Environmental policy advice',
          'Environmental Impact Assessment (EIA)',
          'Environmental auditing',
        ],
      },
      {
        label: 'Ecology & landscape',
        items: [
          'Landscape design & management',
          'Ecology studies',
          'Forestry',
          'Solid waste management',
        ],
      },
      {
        label: 'Nuisance control',
        items: ['Noise consulting', 'Vibration consulting'],
      },
    ],
  },
  {
    id: 'hydrology-maritime',
    step: '09',
    title: 'Hydrology & Maritime Infrastructure',
    summary:
      'Hydrological and irrigation studies alongside coastal, port and inland waterway infrastructure planning.',
    icon: Ship,
    groups: [
      {
        label: 'Hydraulics',
        items: ['Hydrological studies', 'Irrigation planning'],
      },
      {
        label: 'Coastal engineering',
        items: [
          'Master planning for ports & harbours',
          'Marinas',
          'Fisheries facilities',
          'Naval & coastguard facilities',
        ],
      },
      {
        label: 'Waterways',
        items: ['Navigation & dredging', 'Canal maintenance facilities'],
      },
    ],
  },
  {
    id: 'airports',
    step: '10',
    title: 'Airports & Aviation',
    summary:
      'Master planning for civil and military aviation, covering airfield pavement and terminal infrastructure.',
    icon: Plane,
    groups: [
      {
        label: 'Aviation planning',
        items: ['Civilian airport master planning', 'Military airbase master planning'],
      },
      {
        label: 'Airfield infrastructure',
        items: ['Runway design & evaluation', 'Taxiway design', 'Airfield pavement'],
      },
      {
        label: 'Facilities',
        items: ['Terminal buildings', 'Cargo facilities', 'Maintenance infrastructure'],
      },
    ],
  },
  {
    id: 'rail-telecom',
    step: '11',
    title: 'Railways & Telecommunications',
    summary: 'Rail operations and planning, with telecommunications and electrification design.',
    icon: TrainFront,
    groups: [
      {
        label: 'Rail',
        items: ['Railway operations', 'Railway planning'],
      },
      {
        label: 'Utilities',
        items: ['Telecommunications design', 'Electrification design'],
      },
    ],
  },
  {
    id: 'hrd-training',
    step: '12',
    title: 'Human Resource Development & Training',
    summary:
      'Institutional strengthening and capacity building, with operational support and project-related training.',
    icon: Users,
    groups: [
      {
        label: 'Capacity building',
        items: ['Institutional strengthening', 'Institutional analysis'],
      },
      {
        label: 'Operations',
        items: [
          'Labour-based management',
          'Technical assistance',
          'Operational support',
          'Project-related training',
        ],
      },
    ],
  },
];

/** Totals used in the page intro. */
export const sectorTotals = {
  sectors: sectors.length,
  groups: sectors.reduce((n, s) => n + s.groups.length, 0),
  disciplines: sectors.reduce((n, s) => n + s.groups.reduce((m, g) => m + g.items.length, 0), 0),
};

export default sectors;

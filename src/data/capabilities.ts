// Capability groups shown on the home page and /solutions. Deliverables are
// taken from the solution pages and the project scopes in data/projects.ts —
// keep them in sync when either changes.

export interface CapabilityGroup {
  id: string;
  title: string;
  summary: string;
  deliverables: string[];
  // Solution pages that belong to this group (by href)
  pages: string[];
  // Solution pages that cover part of this group's work but belong elsewhere
  relatedPages?: string[];
}

export const capabilityGroups: CapabilityGroup[] = [
  {
    id: 'systems-integration',
    title: 'Systems Engineering & Integration',
    summary:
      'Design and integration of communications networks and the systems that run on them: PSLAN, CCTV, access control, and PA/intercom.',
    deliverables: [
      'Network design and PSLAN engineering',
      'Integration of new devices into existing network, CCTV, and PSLAN systems',
      'VMS testing and validation',
      'Lenel OnGuard access control integration',
      'IP-based PA and intercom systems',
    ],
    pages: [
      '/solutions/networking',
      '/solutions/cctv',
      '/solutions/access-control',
      '/solutions/public-address',
    ],
  },
  {
    id: 'cabinet-fabrication',
    title: 'Communication Cabinet Fabrication & Staging',
    summary:
      'Communication, data, and access control cabinets built to each location’s requirements, then assembled and factory-tested before delivery to site.',
    deliverables: [
      'Data cabinets fabricated per location',
      'Network and access control enclosure fabrication',
      'NEMA-rated enclosures with thermal management',
      'Power distribution planning and equipment layout',
      'Factory acceptance testing (FAT)',
    ],
    pages: ['/solutions/communication-cabinets'],
  },
  {
    id: 'testing-commissioning',
    title: 'Field Testing & Commissioning',
    summary:
      'Field surveys and testing that confirm new equipment works with the existing network before and after cutover, documented in written procedures and reports.',
    deliverables: [
      'Field and camera field-of-view surveys',
      'Pre-cutover and post-cutover network testing',
      'Fiber optic splicing, fiber/copper testing, and CAT6 certification',
      'FAT/SAT/SIT procedures and reports',
      'Speech intelligibility testing (STI) for PA systems',
      'Field testing support and communication drawing sign-off',
    ],
    pages: [],
    relatedPages: ['/solutions/networking', '/solutions/cctv', '/solutions/public-address'],
  },
  {
    id: 'drawings-closeout',
    title: 'Technical Drawings & Project Closeout',
    summary:
      'AutoCAD drawings and closeout documentation for the communications scope, from installation plans and submittals through as-builts and manuals.',
    deliverables: [
      'Logical communication riser, wiring, and layout diagrams',
      'Installation plans and drawings from field surveys',
      'Submittal packages and coordination',
      'As-built documentation and cable certification records',
      'Operations and maintenance and OEM manuals for network systems',
    ],
    pages: ['/solutions/cadd'],
  },
];

export const commercialGroup = {
  id: 'commercial',
  title: 'Commercial IT & VoIP',
  summary: 'Business phone systems and managed IT for offices and commercial facilities.',
  pages: ['/solutions/voip', '/solutions/office-it'],
};

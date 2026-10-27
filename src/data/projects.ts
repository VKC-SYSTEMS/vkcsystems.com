// Project experience shown on /projects and the home page. `services` is
// VKC's scope on each project; the project name and contract number describe
// the overall project. `agency` is the project owner.

export interface FeaturedProject {
  id: string;
  agency: string;
  name: string;
  image: string;
  imageAlt: string;
  // Shown on the image when it is not a photo of the project itself
  imageLabel?: string;
  services: string[];
  // Subset of `services` for the home page; omit to keep off the home page
  highlights?: string[];
}

/** In-page anchor for a project on /projects. */
export const projectAnchor = (id: string) => `project-${id.toLowerCase()}`;

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'AW-73',
    agency: 'TBTA',
    name: 'Design-Build Replacement of Facility Monitoring and Safety Systems at the Hugh L. Carey Tunnel (HLCT) and Queens Midtown Tunnel (QMT)',
    image: '/projects/aw-73-cabinet.jpg',
    imageAlt: 'Communication cabinet with Cisco industrial network switches, Comnet power supplies, fiber media converters, and labeled terminal blocks, digitally enhanced to show wire-duct covers',
    imageLabel: 'Digitally enhanced to illustrate wire-duct covers.',
    services: [
      'Network and CCTV integration throughout 10 buildings, tolling areas, tunnel plazas, and inside QMT and HLCT',
      'Facility monitoring system design and integration',
      'Network infrastructure for monitoring systems',
      'Network and access control enclosure fabrication',
      'Communication risers (logical), wiring and layout diagrams',
      'Field and camera field-of-view surveys for installation plans and drawings',
      'FAT/SAT procedures and reports',
      'Operations and maintenance manuals for network systems',
    ],
    highlights: [
      'Network and CCTV integration throughout 10 buildings, tolling areas, tunnel plazas, and inside QMT and HLCT',
      'Network and access control enclosure fabrication',
      'FAT/SAT procedures and reports',
      'Operations and maintenance manuals for network systems',
    ],
  },
  {
    id: 'P-36719',
    agency: 'NYCT',
    name: '82nd Road Substation Renewal, 13th Street Substation Renewal, and High-Tension Switchgear Replacement',
    image: '/projects/p-36719.jpg',
    imageAlt: 'Communication cabinet with network switches, power supplies, and terminal blocks',
    services: [
      'Custom data cabinet fabrication per location',
      'Communication risers (logical), wiring diagrams and cable certifications',
      'Technical expertise for field testing and communication drawing sign-off',
      'Field surveys for installation plans and drawings',
      'Integration of new devices into existing network systems',
      'Fiber/copper testing procedures and reports',
      'FAT/SAT procedures and reports',
      'OEM manual for network systems',
    ],
    highlights: [
      'Custom data cabinet fabrication per location',
      'Integration of new devices into existing network systems',
      'Fiber/copper testing procedures and reports',
      'Technical expertise for field testing and communication drawing sign-off',
    ],
  },
  {
    id: 'E-30647',
    agency: 'NYCT',
    name: 'Design-Build Replacement of 21 Escalators at 6 Stations Systemwide',
    image: '/projects/e-30647.jpg',
    imageAlt: 'Subway station escalator and stairway',
    imageLabel: 'Representative image',
    services: [
      'Network, VoIP, and UPS power plant integration throughout 6 stations',
      'Network infrastructure for monitoring systems',
      'Communication risers (logical), wiring and layout diagrams',
      'Field surveys for installation plans and drawings',
      'Fiber optic splicing and certification',
      'CAT6 certification',
      'FAT/SAT/SIT procedures and reports',
      'Operations and maintenance manuals for network systems',
    ],
    highlights: [
      'Network, VoIP, and UPS power plant integration throughout 6 stations',
      'Fiber optic splicing and certification',
      'CAT6 certification',
      'FAT/SAT/SIT procedures and reports',
    ],
  },
  {
    id: 'P-36727',
    agency: 'NYCT',
    name: 'Rehabilitation of Concourse Yard Substation',
    image: '/projects/p-36727.jpg',
    imageAlt: 'Subway cars parked in a rail yard',
    imageLabel: 'Representative image',
    services: [
      'Pre-cutover and post-cutover network testing',
      'Communication risers (logical), wiring diagrams and cable certifications',
      'Technical expertise for field testing and communication drawing sign-off',
      'Field surveys for installation plans and drawings',
      'Integration of new devices into existing network systems',
      'Fiber/copper testing procedures and reports',
      'FAT/SAT procedures and reports',
      'OEM manual for network systems',
    ],
  },
  {
    id: 'NJT',
    agency: 'NJ Transit',
    name: 'Raritan River Bridge Replacement',
    image: '/projects/njt-raritan.jpg',
    imageAlt: 'Rendering of a lift bridge over a river with a train crossing',
    imageLabel: 'Project rendering',
    services: [
      'Communication system design and integration',
      'Network infrastructure installation',
      'Communication risers (logical), wiring diagrams and cable certifications',
      'Field surveys and coordination with general contractor',
      'Fiber/copper testing procedures and reports',
      'FAT/SAT procedures and reports',
    ],
  },
];

export const otherCurrentProjects = [
  { agency: 'DOC', id: 'BBJ', name: 'BBJ Queens Phase 1' },
  { agency: 'NYCT', id: 'C-43058', name: 'Communication Room Upgrade' },
  { agency: 'NYCT', id: 'C-52169', name: 'PIDS Bushwick Ave & Atlantic Ave' },
  { agency: 'NYCT', id: 'C-52180', name: 'PIDS St. Lawrence' },
  { agency: 'NYCT', id: 'C-52181', name: 'PIDS Longwood, E143 Street, Cypress Avenue' },
  { agency: 'NYCT', id: 'E-30641', name: 'Replacement of 17 Escalators at 6 Stations Systemwide' },
  { agency: 'NYCT', id: 'E-30645', name: 'Design-Build Services For Replacement of 6 Escalators at 2 Stations' },
  { agency: 'TBTA', id: 'HC-48', name: 'Rehabilitation of HLCT Manhattan Plaza' },
  { agency: 'Port Authority', id: 'JFK', name: 'JFK GTC Garage PS' },
  { agency: 'LIRR', id: 'MS-21001', name: 'Grand Central Madison' },
  { agency: 'NYCT', id: 'P-36317', name: 'Construction of New West 28th Street Substation' },
  { agency: 'NYCT', id: 'P-36708', name: 'Construction of New Canal Street Substation on the 8th Avenue Line' },
  { agency: 'NYC DEP', id: 'PS-236A', name: 'Throgs Neck Pumping Station' },
  { agency: 'NYC DEP', id: 'PS-276', name: 'Hannah St CCTV' },
  { agency: 'NYC DEP', id: 'PS-317', name: 'Victory Blvd Pump Station Rehab' },
  { agency: 'NYCT', id: 'R-50769', name: 'Installation of 2 Elevators at 57th Street' },
  { agency: 'NYCT', id: 'S-48010', name: 'QBL East CBTC' },
];

export const previousProjectsLeft = [
  { agency: 'LIRR', name: 'LIRR 6240 3rd Track - 5 Stations' },
  { agency: 'NYCT', name: 'A-37150D - Livonia' },
  { agency: 'NYCT', name: 'E-34025R - Elevators GCT' },
  { agency: 'NYCT', name: 'C-43751 - Power and HVAC Upgrade at PCC RCC' },
  { agency: 'NYCT', name: 'P-36444 - Rutgers Tube Rehabilitation' },
  { agency: 'TBTA', name: 'QM-81 - Rehabilitation of Tunnel Controls and Communications at QMT and HCT' },
  { agency: 'TBTA', name: 'QM-36 - Relocation of QMT Refueling Station and QSB Switchgear' },
];

export const previousProjectsRight = [
  { agency: 'LIRR', name: 'CS-179 - East Side Access' },
  { agency: 'NYCT', name: 'S-33932 - Life Cycle Replacement Code System Phase I' },
  { agency: 'NYCT', name: 'E-30512 - Replace Escalators' },
  { agency: 'LIRR', name: 'LIRR - 3rd Track Temporary WiFi' },
  { agency: 'NYCT', name: 'P-80692 - Tottenville Substation' },
  { agency: 'Metro-North', name: 'MNR 58050 - CSI Package' },
];

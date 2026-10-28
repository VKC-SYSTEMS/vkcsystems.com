// Solution pages: title, description, and sub-services as shown on /solutions.
// Grouped into capability groups by data/capabilities.ts.
import networkingIcon from '../assets/networking-fiber-distribution-panel-icon.png';
import cctvIcon from '../assets/cctv-dome-camera-icon.png';
import publicAddressIcon from '../assets/public-address-icon.png';
import accessControlIcon from '../assets/access-control-icon.png';
import commCabinetsIcon from '../assets/comm-cabinets-icon.png';
import caddIcon from '../assets/cadd-icon.png';
import voipIcon from '../assets/voip-icon.png';
import officeItIcon from '../assets/office-it-server-rack-icon.png';


export interface Solution {
  title: string;
  href: string;
  description: string;
  subServices: string[];
}

export const serviceIcons: Record<string, ImageMetadata> = {
  Networking: networkingIcon,
  CCTV: cctvIcon,
  'Public Address Systems': publicAddressIcon,
  'Access Control': accessControlIcon,
  'Communication Cabinets': commCabinetsIcon,
  'CADD Services': caddIcon,
  VoIP: voipIcon,
  'Office IT': officeItIcon,
};

export const services: Solution[] = [
  {
    title: 'Networking',
    href: '/solutions/networking',
    description:
      'Enterprise-grade network infrastructure integrating data, VoIP, CCTV, and public address systems into custom enclosures designed for mission-critical environments.',
    subServices: [
      'Fiber Optic Termination',
      'Factory Acceptance Quality Controls',
      'High Speed Public Wi-Fi',
      'Network Design & Engineering',
      'Site Acceptance Quality Controls',
      'Network Equipment Housing',
      'PSLAN Engineering',
      'Fiber Distribution Panels',
      'Maintenance & Repair',
    ],
  },
  {
    title: 'CCTV',
    href: '/solutions/cctv',
    description:
      'End-to-end surveillance system integration with custom cabinet fabrication, VMS testing, and compliance with transit safety standards.',
    subServices: [
      'Camera Placement Engineering',
      'VMS Testing & Validation',
      'Custom CCTV Cabinet Fabrication',
      'IP-Based Surveillance Design',
      'Factory Acceptance Testing (FAT)',
      'Site Acceptance Testing (SAT)',
    ],
  },
  {
    title: 'Public Address Systems',
    href: '/solutions/public-address',
    description:
      'PA and intercom systems engineered for real-time communication across transit stations and commercial facilities.',
    subServices: [
      'Audio Coverage & Intelligibility Planning',
      'Custom PA Cabinet Fabrication',
      'Train Dispatch Communication',
      'IP-Based Communication Systems',
      'Speech Intelligibility Testing (STI)',
      'Station-Wide Announcement Systems',
    ],
  },
  {
    title: 'Access Control',
    href: '/solutions/access-control',
    description:
      'Secure, scalable access control systems integrated with Lenel OnGuard, CCTV, intrusion detection, and building management platforms.',
    subServices: [
      'Lenel OnGuard Integration',
      'Credential & Identity System Design',
      'CCTV & Intrusion System Integration',
      'IP-Based Access Control Architecture',
      'Factory Acceptance Testing (FAT)',
      'Database & Event Validation',
    ],
  },
  {
    title: 'Communication Cabinets',
    href: '/solutions/communication-cabinets',
    description:
      'Custom-engineered communication cabinets with NEMA-rated enclosures, thermal management, and full system integration.',
    subServices: [
      'Custom Cabinet Fabrication & Assembly',
      'NEMA-Rated Enclosure Design',
      'Thermal Management & Ventilation',
      'Power Distribution Planning',
      'Equipment Mounting & Layout',
      'Factory Acceptance Testing (FAT)',
    ],
  },
  {
    title: 'CADD Services',
    href: '/solutions/cadd',
    description:
      'Engineering-driven CADD services supporting design, coordination, and documentation for complex infrastructure projects.',
    subServices: [
      'AutoCAD Drafting & Engineering Drawings',
      'Communication Riser Diagrams',
      'As-Built Documentation',
      'Submittal Packages & Coordination',
      'Wiring & Interconnection Drawings',
      'Cable Certification Documentation',
    ],
  },
  {
    title: 'VoIP',
    href: '/solutions/voip',
    description:
      'Enterprise-grade VoIP solutions engineered for reliability, QoS optimization, and seamless network integration.',
    subServices: [
      'VoIP System Architecture & Design',
      'SIP & PBX System Engineering',
      'Quality of Service (QoS) Configuration',
      'VLAN & Traffic Segmentation',
      'Unified Communications Setup',
      'System Monitoring & Support',
    ],
  },
  {
    title: 'Office IT',
    href: '/solutions/office-it',
    description:
      'Engineering-driven IT services supporting network infrastructure, cloud platforms, endpoint management, and system security.',
    subServices: [
      'Network Design & Support',
      'Microsoft 365 Administration',
      'Server Infrastructure Management',
      'Mobile Device Management (MDM)',
      'Backup & Data Protection',
      'Hybrid Infrastructure Support',
    ],
  },
];

export const solutionByHref = Object.fromEntries(services.map((s) => [s.href, s])) as Record<string, Solution>;

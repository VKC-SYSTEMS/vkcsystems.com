// Company qualifications and team credentials. These are kept apart on
// purpose: company certifications and program qualifications belong to VKC
// Systems, while team credentials are held by individual team members — not
// every employee holds each one. Keep public/llms.txt and the JSON-LD in
// BaseLayout.astro in sync when these change.

export const companyCertifications = [
  'Minority Business Enterprise (MBE)',
  'Disadvantaged Business Enterprise (DBE)',
];

export const euci = {
  label: 'MTA EUCI Qualified',
  summary:
    'VKC Systems qualifies for MTA’s Enhanced Utilization Credit Initiative (EUCI) Pilot Program. Eligible subcontracting with VKC may provide prime contractors with 1.5× MWBE utilization credit, subject to MTA program requirements and project eligibility.',
  linkLabel: 'Learn about MTA EUCI',
  url: 'https://www.mta.info/doing-business-with-us/opportunities-for-hubs/euci',
};

export interface TeamCredential {
  name: string;
  // Spelled-out title, where the short name needs one
  title?: string;
}

export const teamCredentials: TeamCredential[] = [
  { name: 'BICSI RCDD', title: 'Registered Communications Distribution Designer' },
  { name: 'AVIXA CTS-I', title: 'Certified Technology Specialist – Installation' },
  { name: 'Cisco CCNA' },
  { name: 'Cisco CCNP' },
  { name: 'CompTIA Network+' },
  { name: 'CSPM' },
  { name: 'OSHA 30' },
  { name: 'Track Safety Training' },
];

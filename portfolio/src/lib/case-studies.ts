export type CaseStudy = {
  slug: string;
  title: string;
  tags: string[];
  /** Paper design link — card component or detail page frame */
  paperUrl?: string;
  thumbnail: string;
};

const CASE_STUDY_CARD_PAPER_URL =
  'https://app.paper.design/file/01KX06ZJMVPQD5CJT0KHB0SE0E/01K4GP58P8JRM8PGBP0586VKYV/13FO-0';

export const caseStudies: CaseStudy[] = [
  {
    slug: 'insurance',
    title: 'Insurance',
    tags: ['RESPONSIVE', 'BFSI'],
    thumbnail: '/assets/case-studies/insurance.png',
    paperUrl: CASE_STUDY_CARD_PAPER_URL,
  },
  {
    slug: 'maternity',
    title: 'Maternity',
    tags: [],
    thumbnail: '/assets/case-studies/maternity.png',
    paperUrl: CASE_STUDY_CARD_PAPER_URL,
  },
  {
    slug: 'smart-home',
    title: 'Smart Home',
    tags: ['IOT'],
    thumbnail: '/assets/case-studies/smart-home.png',
    paperUrl: CASE_STUDY_CARD_PAPER_URL,
  },
  {
    slug: 'erp',
    title: 'ERP',
    tags: [],
    thumbnail: '/assets/case-studies/erp.png',
    paperUrl: CASE_STUDY_CARD_PAPER_URL,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

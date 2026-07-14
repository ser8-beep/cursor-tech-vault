export type CaseStudySlug = 'insurance' | 'maternity' | 'smart-home' | 'erp';

export type CaseStudyImages = {
  default: string;
  hover: string;
  /** Maternity hover halftone texture — Figma organism hover maternity */
  hoverTexture?: string;
};

export type CaseStudy = {
  slug: CaseStudySlug;
  title: string;
  tags: [string, string];
  images: CaseStudyImages;
  /** Paper design link — card component or detail page frame */
  paperUrl?: string;
};

const CASE_STUDY_CARD_PAPER_URL =
  'https://app.paper.design/file/01KX06ZJMVPQD5CJT0KHB0SE0E/01K4GP58P8JRM8PGBP0586VKYV/13FO-0';

const ASSETS = '/assets/case-studies';

/** Case study cards — Figma `organism-case-study-card-*` (97:2198–97:2026) */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'insurance',
    title: 'Insurance',
    tags: ['RESPONSIVE', 'BFSI'],
    images: {
      default: `${ASSETS}/insurance-default.png`,
      hover: `${ASSETS}/insurance-hover.png`,
    },
    paperUrl: CASE_STUDY_CARD_PAPER_URL,
  },
  {
    slug: 'maternity',
    title: 'Maternity',
    tags: ['MOBILE', 'WELLNESS'],
    images: {
      default: `${ASSETS}/maternity-default.png`,
      hover: `${ASSETS}/maternity-hover.png`,
      hoverTexture: `${ASSETS}/maternity-hover-texture.png`,
    },
    paperUrl: CASE_STUDY_CARD_PAPER_URL,
  },
  {
    slug: 'smart-home',
    title: 'Smart Home',
    tags: ['MOBILE', 'IOT'],
    images: {
      default: `${ASSETS}/smart-home-default.png`,
      hover: `${ASSETS}/smart-home-hover.png`,
    },
    paperUrl: CASE_STUDY_CARD_PAPER_URL,
  },
  {
    slug: 'erp',
    title: 'ERP',
    tags: ['SAAS', 'ADMIN'],
    images: {
      default: `${ASSETS}/erp-default.png`,
      hover: `${ASSETS}/erp-hover.png`,
    },
    paperUrl: CASE_STUDY_CARD_PAPER_URL,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

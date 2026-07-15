import Link from 'next/link';
import { footerCaseStudyLinks } from '@/lib/case-studies';

const COPYRIGHT = '©2026 Shivani Kher';

function CaseStudiesLabel() {
  return (
    <div
      data-name="Label"
      className="inline-flex shrink-0 items-center rounded-full border border-zinc-950 px-[9px] py-0.5"
    >
      <h2 className="font-display text-sm uppercase leading-[1.4] tracking-[0.7px] text-zinc-950">
        CASE STUDIES
      </h2>
    </div>
  );
}

function FooterCaseStudyLink({ slug, label }: { slug: string; label: string }) {
  return (
    <Link
      href={`/case-studies/${slug}`}
      className="font-body text-xl font-medium leading-normal text-zinc-950 underline decoration-from-font underline-offset-auto"
    >
      {label}
    </Link>
  );
}

/** Site footer — Figma `Footer` component set (197:3056) */
export function Footer() {
  return (
    <footer
      data-name="Footer"
      className="mx-auto flex w-full max-w-[1920px] flex-col gap-20 px-5 pb-5 pt-10 desktop:gap-[70px] desktop:pt-[60px]"
    >
      <div data-name="Links column" className="flex flex-col gap-3">
        <CaseStudiesLabel />

        <nav
          aria-label="Case studies"
          className="flex flex-col gap-5 desktop:hidden"
          data-name="Link list"
        >
          {footerCaseStudyLinks.map(({ slug, label }) => (
            <FooterCaseStudyLink key={slug} slug={slug} label={label} />
          ))}
        </nav>

        <nav
          aria-label="Case studies"
          className="hidden max-w-[572px] grid-cols-2 gap-x-3 gap-y-3 desktop:grid"
          data-name="Link list"
        >
          {footerCaseStudyLinks.map(({ slug, label }) => (
            <FooterCaseStudyLink key={slug} slug={slug} label={label} />
          ))}
        </nav>
      </div>

      <div className="flex flex-col gap-4 text-zinc-950 desktop:flex-row desktop:items-end desktop:justify-between desktop:gap-0">
        <h2 className="font-display-expanded text-[49px] leading-[0.95] tracking-[-0.98px] desktop:text-[116px] desktop:leading-[0.85] desktop:tracking-[-2.32px]">
          Shivani K.
        </h2>
        <p className="font-body text-base leading-[1.4] tracking-[-0.32px] desktop:text-right">
          {COPYRIGHT}
        </p>
      </div>
    </footer>
  );
}

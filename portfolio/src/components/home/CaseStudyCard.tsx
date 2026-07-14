import Image from 'next/image';
import Link from 'next/link';
import type { CaseStudy } from '@/lib/case-studies';

type CaseStudyCardProps = {
  study: CaseStudy;
};

export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="cs-card group relative flex h-[120px] items-end justify-between overflow-hidden border-2 border-[rgba(135,135,135,0.4)] pt-3 transition-[border-color,background-color,box-shadow] duration-300 ease-out tablet:h-[152px] laptop:h-[180px] desktop:h-[220px] wide:h-[240px] laptop:hover:border-[1.5px] laptop:hover:border-hero-accent laptop:hover:bg-zinc-50 laptop:hover:shadow-[8px_11px_22px_0px_rgba(0,0,0,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-accent"
      aria-label={`${study.title} case study`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-stone-100 mix-blend-color-burn backdrop-blur-[4px] transition-opacity duration-300 laptop:group-hover:opacity-0"
      />

      {study.thumbnail && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[82%] overflow-hidden"
        >
          <Image
            src={study.thumbnail}
            alt=""
            fill
            sizes="(min-width: 1920px) 375px, (min-width: 1366px) 316px, 50vw"
            className="object-cover object-bottom transition-transform duration-300 laptop:group-hover:scale-[1.02]"
          />
        </span>
      )}

      <span className="relative z-10 flex h-full w-full max-w-[97%] flex-col justify-end gap-1 pb-5 pl-3 pr-7 pt-2 transition-[padding,color] duration-300 laptop:group-hover:pt-2 laptop:group-hover:text-zinc-950">
        <span className="font-display-expanded text-lg uppercase leading-none text-zinc-700 transition-colors duration-300 laptop:text-[28px] laptop:group-hover:text-zinc-950">
          {study.title}
        </span>
        {study.tags.length > 0 && (
          <span className="flex gap-3 font-display text-[10px] uppercase tracking-[1.12px] text-zinc-600 transition-colors duration-300 tablet:text-xs laptop:text-lg laptop:tracking-[1.44px] laptop:group-hover:text-zinc-600">
            {study.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </span>
        )}
      </span>
    </Link>
  );
}

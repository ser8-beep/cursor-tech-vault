'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { CaseStudy } from '@/lib/case-studies';

type CaseStudyCardProps = {
  study: CaseStudy;
};

function CaseStudyArtwork({ study }: { study: CaseStudy }) {
  const isMaternity = study.slug === 'maternity';

  return (
    <span
      aria-hidden
      data-name="atom-case-study-card-image"
      className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[82%] overflow-hidden"
    >
      <Image
        src={study.images.default}
        alt=""
        fill
        sizes="(min-width: 1920px) 375px, (min-width: 1366px) 316px, 50vw"
        className="object-cover object-bottom transition-opacity duration-300 laptop:group-hover:opacity-0"
      />
      <Image
        src={study.images.hover}
        alt=""
        fill
        sizes="(min-width: 1920px) 375px, (min-width: 1366px) 316px, 50vw"
        className="object-cover object-bottom opacity-0 transition-opacity duration-300 laptop:group-hover:opacity-100"
      />
      {isMaternity && study.images.hoverTexture ? (
        <Image
          src={study.images.hoverTexture}
          alt=""
          fill
          sizes="300px"
          className="object-cover opacity-0 transition-opacity duration-300 laptop:group-hover:opacity-20"
        />
      ) : null}
    </span>
  );
}

/**
 * Case study redirection card — Figma `organism-case-study-card-*`
 * (360 / 768 / 1366 / 1600 / 1920) with default + hover variants.
 */
export function CaseStudyCard({ study }: CaseStudyCardProps) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="cs-card group relative flex h-[120px] items-end justify-between overflow-hidden border-2 border-card-border bg-card pt-3 backdrop-blur-[44px] transition-[border-color,background-color,box-shadow] duration-300 ease-out tablet:h-[152px] laptop:h-[180px] laptop:backdrop-blur-none laptop:hover:bg-card-hover desktop:h-[220px] wide:h-[240px] laptop:hover:border-[1.5px] laptop:hover:border-hero-accent laptop:hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hero-accent"
      aria-label={`${study.title} case study`}
      data-cs={study.slug}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-card mix-blend-color-burn backdrop-blur-[4px] transition-opacity duration-300 laptop:group-hover:opacity-0"
      />

      <CaseStudyArtwork study={study} />

      <span className="relative z-10 flex h-full w-full max-w-[97%] flex-col items-start justify-end gap-1 pb-7 pl-3 pr-7 pt-0.5 transition-[padding,color] duration-300 laptop:group-hover:pt-2 laptop:group-hover:pl-3 laptop:group-hover:text-zinc-950">
        <span className="font-display-expanded text-lg uppercase leading-none text-zinc-700 transition-colors duration-300 laptop:text-xl laptop:group-hover:text-zinc-950 wide:text-[28px]">
          {study.title}
        </span>
        <span className="flex gap-3 font-display text-xs uppercase tracking-[0.6px] text-zinc-600 transition-colors duration-300 laptop:gap-3 laptop:text-xs laptop:tracking-[0.6px] laptop:group-hover:text-zinc-950 desktop:text-base desktop:tracking-[1.28px] wide:text-lg wide:tracking-[1.44px]">
          {study.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </span>
      </span>
    </Link>
  );
}

'use client';

import { motion } from 'framer-motion';
import { caseStudies } from '@/lib/case-studies';
import { ENTRANCE, EASE_PROTOTYPE } from '@/lib/splash-phase';
import { CaseStudyCard } from './CaseStudyCard';

type HeroCaseStudyCarouselProps = {
  entranceActive: boolean;
  reducedMotion: boolean;
};

export function HeroCaseStudyCarousel({
  entranceActive,
  reducedMotion,
}: HeroCaseStudyCarouselProps) {
  const motionEnabled = !reducedMotion;

  return (
    <motion.section
      id="case-studies"
      aria-label="Case studies"
      data-name="cs-carousel-enter"
      className="relative z-[1] w-full pt-4 desktop:absolute desktop:bottom-0 desktop:left-0 desktop:pt-0"
      initial={motionEnabled ? { opacity: 0, y: 32 } : false}
      animate={
        motionEnabled
          ? entranceActive
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 32 }
          : undefined
      }
      transition={{
        delay: ENTRANCE.carousel.delay,
        duration: ENTRANCE.carousel.duration,
        ease: EASE_PROTOTYPE.standard,
      }}
    >
      <p className="mb-3 hidden font-display text-sm leading-normal tracking-[1.12px] text-hero-hover laptop:block">
        <span className="text-zinc-950">PRODUCT_DESIGN</span>
        <span>{' //  01_SYSTEMS_FOR_USERS'}</span>
        <br />
        <span>{'                               02_SYSTEMS FOR_TEAMS'}</span>
      </p>

      <p className="mb-3 font-display text-[10px] uppercase tracking-[0.8px] text-zinc-600 laptop:hidden">
        PRODUCT_DESIGN // CASE STUDIES
      </p>
      <motion.ul
        className="grid w-full list-none grid-cols-1 gap-3 tablet:grid-cols-2 tablet:gap-[10px] laptop:grid-cols-4 laptop:gap-5"
        initial={motionEnabled ? 'hidden' : false}
        animate={motionEnabled ? (entranceActive ? 'visible' : 'hidden') : undefined}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: ENTRANCE.carouselStagger,
              delayChildren: ENTRANCE.carousel.delay + 0.1,
            },
          },
        }}
      >
        {caseStudies.map((study) => (
          <motion.li
            key={study.slug}
            className="h-full"
            variants={
              motionEnabled
                ? {
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.4,
                        ease: EASE_PROTOTYPE.standard,
                      },
                    },
                  }
                : undefined
            }
          >
            <CaseStudyCard study={study} />
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}

'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

const HeroSculpture = dynamic(
  () =>
    import('./HeroSculpture').then((mod) => ({ default: mod.HeroSculpture })),
  { ssr: false },
);
import {
  HeroTextPhase,
  HeroValuePropCycle,
} from './HeroValuePropCycle';
import { HeroCaseStudyCarousel } from './HeroCaseStudyCarousel';
import {
  EASE_PROTOTYPE,
  PROTOTYPE_PHASE_MS,
  type SplashPhase,
} from '@/lib/splash-phase';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { ContactStrip } from '@/components/layout/ContactStrip';

function HeroSplash({
  sculptureBlurPx,
  onTextPhaseChange,
  entranceActive,
  reducedMotion,
}: {
  sculptureBlurPx: number;
  onTextPhaseChange: (phase: HeroTextPhase) => void;
  entranceActive: boolean;
  reducedMotion: boolean;
}) {
  return (
    <div className="relative isolate flex w-full flex-col desktop:min-h-[768px] desktop:max-h-[768px] desktop:pb-[340px]">
      <div className="pointer-events-none relative z-[2] flex w-full justify-center desktop:absolute desktop:left-0 desktop:top-0 desktop:mb-[-434px] desktop:h-[782px] desktop:max-h-[782px] desktop:min-h-[619px] desktop:w-[686px] desktop:items-center desktop:pl-[319px]">
        <motion.div
          className="relative h-[460px] w-[273px] shrink-0 desktop:h-[782px] desktop:min-h-[619px] desktop:w-[366px]"
          animate={{ filter: `blur(${sculptureBlurPx}px)` }}
          transition={{
            duration: PROTOTYPE_PHASE_MS.headerToCarouselDuration / 1000,
            ease: EASE_PROTOTYPE.header,
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {reducedMotion ? (
              <Image
                src="/assets/hero/marble-sculpture.png"
                alt=""
                width={832}
                height={1114}
                priority
                className="absolute h-[113%] w-[181%] max-w-none -left-[70%] -top-[13%]"
              />
            ) : (
              <HeroSculpture />
            )}
          </div>
        </motion.div>
      </div>

      <HeroValuePropCycle onPhaseChange={onTextPhaseChange} />
      <HeroCaseStudyCarousel
        entranceActive={entranceActive}
        reducedMotion={reducedMotion}
      />
    </div>
  );
}

export function Hero() {
  const reducedMotion = usePrefersReducedMotion();
  const [splashPhase, setSplashPhase] = useState<SplashPhase>(
    reducedMotion ? 'header' : 'splash',
  );
  const [textPhase, setTextPhase] = useState<HeroTextPhase>(
    reducedMotion ? 'settled' : 'loader',
  );

  const handleTextPhase = useCallback((phase: HeroTextPhase) => {
    setTextPhase(phase);
  }, []);

  /** Footer-enter (71:16874): contact strip + carousel */
  const entranceActive =
    reducedMotion || textPhase === 'settling' || textPhase === 'settled';

  /** Header-enter (71:16879): full nav chrome after footer→header delay */
  const headerEnterActive = reducedMotion || splashPhase === 'header';

  useEffect(() => {
    if (reducedMotion) return;

    if (textPhase === 'settling') {
      setSplashPhase('footer');
      return;
    }

    if (textPhase === 'settled' && splashPhase === 'footer') {
      const id = window.setTimeout(
        () => setSplashPhase('header'),
        PROTOTYPE_PHASE_MS.footerToHeaderDelay,
      );
      return () => window.clearTimeout(id);
    }
  }, [textPhase, splashPhase, reducedMotion]);

  const sculptureBlurPx =
    splashPhase === 'header' || reducedMotion ? 27 : splashPhase === 'footer' ? 8 : 2;

  return (
    <section
      className="hero-dot-grid flex min-h-screen w-full flex-col px-2 pb-2 pt-2 desktop:min-h-[850px] desktop:px-5 desktop:pt-5"
      aria-label="Home hero"
      data-phase={splashPhase}
    >
      <SiteHeader
        entranceActive={headerEnterActive}
        reducedMotion={reducedMotion}
      />
      <HeroSplash
        sculptureBlurPx={sculptureBlurPx}
        onTextPhaseChange={handleTextPhase}
        entranceActive={entranceActive}
        reducedMotion={reducedMotion}
      />
      <ContactStrip
        entranceActive={entranceActive}
        reducedMotion={reducedMotion}
      />
    </section>
  );
}

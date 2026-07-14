'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  HERO_SUBTEXT_MOBILE,
  LOADER_LEFT,
  LOADER_RIGHT_CYCLES,
  SETTLED_DESKTOP,
  SETTLED_MOBILE,
  TIMING,
} from '@/lib/hero-value-props';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export type HeroTextPhase = 'loader' | 'settling' | 'settled';

type LoaderRightPhase = 'prefix' | 'typing' | 'hold';
type LoaderLeftPhase = 'prefix' | 'typing' | 'done';
type SettleStep = 'pause' | 'left' | 'gap' | 'right' | 'done';

type HeroValuePropCycleProps = {
  onPhaseChange?: (phase: HeroTextPhase) => void;
};

function useTypewriter(text: string, active: boolean, charMs: number) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    if (!active) {
      setDisplayed('');
      return;
    }

    setDisplayed('');
    let index = 0;
    const id = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) {
        window.clearInterval(id);
      }
    }, charMs);

    return () => window.clearInterval(id);
  }, [text, active, charMs]);

  return displayed;
}

function useLoaderRightLoop(active: boolean) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<LoaderRightPhase>('prefix');
  const [hasCompletedFullLoop, setHasCompletedFullLoop] = useState(false);
  const phrase = LOADER_RIGHT_CYCLES[index];

  const typed = useTypewriter(
    phrase.right,
    active && phase === 'typing',
    TIMING.loader.charMs,
  );
  const typingDone = typed.length >= phrase.right.length;

  useEffect(() => {
    if (!active) return;

    if (phase === 'prefix') {
      const id = window.setTimeout(() => setPhase('typing'), TIMING.loader.rightPrefixMs);
      return () => window.clearTimeout(id);
    }

    if (phase === 'typing' && typingDone) {
      const id = window.setTimeout(() => setPhase('hold'), 80);
      return () => window.clearTimeout(id);
    }

    if (phase === 'hold') {
      const id = window.setTimeout(() => {
        const isLastPhrase = index === LOADER_RIGHT_CYCLES.length - 1;
        setIndex((i) => (i + 1) % LOADER_RIGHT_CYCLES.length);
        if (isLastPhrase) setHasCompletedFullLoop(true);
        setPhase('prefix');
      }, TIMING.loader.holdMs);
      return () => window.clearTimeout(id);
    }
  }, [active, phase, typingDone, index]);

  useEffect(() => {
    if (active) {
      setIndex(0);
      setPhase('prefix');
      setHasCompletedFullLoop(false);
    }
  }, [active]);

  return { phrase, index, phase, typed, hasCompletedFullLoop };
}

function useLoaderLeft(active: boolean) {
  const [phase, setPhase] = useState<LoaderLeftPhase>('prefix');
  const typed = useTypewriter(
    LOADER_LEFT.text,
    active && phase === 'typing',
    TIMING.loader.leftCharMs,
  );
  const subtextTyped = useTypewriter(
    HERO_SUBTEXT_MOBILE,
    active && phase === 'typing',
    TIMING.loader.subtextCharMs,
  );
  const typingDone = typed.length >= LOADER_LEFT.text.length;

  useEffect(() => {
    if (!active) return;

    if (phase === 'prefix') {
      const id = window.setTimeout(() => setPhase('typing'), TIMING.loader.leftPrefixMs);
      return () => window.clearTimeout(id);
    }

    if (phase === 'typing' && typingDone) {
      const id = window.setTimeout(() => setPhase('done'), 80);
      return () => window.clearTimeout(id);
    }
  }, [active, phase, typingDone]);

  useEffect(() => {
    if (active) setPhase('prefix');
  }, [active]);

  return { phase, typed, subtextTyped };
}

function usePageLoadSignal(onReady: () => void) {
  useEffect(() => {
    const started = Date.now();
    let fired = false;

    const fire = () => {
      if (fired) return;
      fired = true;
      const elapsed = Date.now() - started;
      const wait = Math.max(0, TIMING.loader.minDurationMs - elapsed);
      window.setTimeout(onReady, wait);
    };

    if (document.readyState === 'complete') {
      fire();
      return;
    }

    window.addEventListener('load', fire, { once: true });
    return () => window.removeEventListener('load', fire);
  }, [onReady]);
}

function LoaderRightLine({
  phrase,
  phase,
  typed,
}: {
  phrase: (typeof LOADER_RIGHT_CYCLES)[number];
  phase: LoaderRightPhase;
  typed: string;
}) {
  const showPrefix = phase === 'prefix';
  const text = showPrefix ? phrase.rightPrefix : typed;

  return (
    <motion.p
      key={`loader-right-${phrase.right}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: TIMING.loader.fadeMs / 1000 }}
      className="font-display-expanded uppercase text-hero-brand desktop:text-hero-accent desktop:text-right text-xl leading-7 desktop:text-4xl desktop:leading-[48px]"
    >
      {text}
      {phase === 'typing' && typed.length < phrase.right.length && (
        <span className="hero-typewriter-cursor" aria-hidden="true">
          |
        </span>
      )}
    </motion.p>
  );
}

function LoaderLeftBlock({
  phase,
  typed,
}: {
  phase: LoaderLeftPhase;
  typed: string;
}) {
  const showPrefix = phase === 'prefix';
  const text = showPrefix ? LOADER_LEFT.prefix : typed;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: TIMING.loader.fadeMs / 1000 }}
      className="font-display-expanded text-xl uppercase leading-7 tracking-normal text-zinc-950 desktop:text-4xl desktop:leading-[48px]"
    >
      {text}
      {phase === 'typing' && typed.length < LOADER_LEFT.text.length && (
        <span className="hero-typewriter-cursor" aria-hidden="true">
          |
        </span>
      )}
    </motion.div>
  );
}

function LoaderSubtext({
  phase,
  subtextTyped,
}: {
  phase: LoaderLeftPhase;
  subtextTyped: string;
}) {
  const text =
    phase === 'prefix'
      ? LOADER_LEFT.subtextPrefix
      : phase === 'typing'
        ? subtextTyped || LOADER_LEFT.subtextPrefix
        : HERO_SUBTEXT_MOBILE;

  return (
    <p className="font-display text-xs tracking-[0.8px] text-zinc-500 desktop:text-base">
      {text}
      {phase === 'typing' && subtextTyped.length < HERO_SUBTEXT_MOBILE.length && (
        <span className="hero-typewriter-cursor" aria-hidden="true">
          |
        </span>
      )}
    </p>
  );
}

function SettledMobile() {
  return (
    <div className="flex h-fit w-full flex-col gap-0">
      <p className="mb-0 pb-2 font-display-expanded uppercase text-hero-brand text-xl leading-7">
        {SETTLED_MOBILE.dynamic}{' '}
        <span className="text-hero-brand">{SETTLED_MOBILE.dynamicAccent}</span>
      </p>
      <p className="mt-0 font-display-expanded text-xl uppercase leading-7 tracking-normal text-zinc-950">
        {SETTLED_MOBILE.anchor}
      </p>
    </div>
  );
}

function SettlingAnimation({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState<SettleStep>('pause');

  const leftFull = `${SETTLED_DESKTOP.left} ${SETTLED_DESKTOP.leftAccent}`;
  const mobileDynamicFull = `${SETTLED_MOBILE.dynamic} ${SETTLED_MOBILE.dynamicAccent}`;
  const leftTyped = useTypewriter(leftFull, step === 'left', TIMING.settle.leftCharMs);
  const mobileDynamicTyped = useTypewriter(
    mobileDynamicFull,
    step === 'left',
    TIMING.settle.leftCharMs,
  );
  const rightTyped = useTypewriter(
    SETTLED_DESKTOP.right,
    step === 'right',
    TIMING.settle.rightCharMs,
  );

  const leftDone = leftTyped.length >= leftFull.length;
  const mobileDynamicDone = mobileDynamicTyped.length >= mobileDynamicFull.length;
  const rightDone = rightTyped.length >= SETTLED_DESKTOP.right.length;

  useEffect(() => {
    if (step === 'pause') {
      const id = window.setTimeout(() => setStep('left'), TIMING.settle.pauseMs);
      return () => window.clearTimeout(id);
    }
    if (step === 'left' && leftDone && mobileDynamicDone) {
      const id = window.setTimeout(() => setStep('gap'), 80);
      return () => window.clearTimeout(id);
    }
    if (step === 'gap') {
      const id = window.setTimeout(() => setStep('right'), TIMING.settle.gapBeforeRightMs);
      return () => window.clearTimeout(id);
    }
    if (step === 'right' && rightDone) {
      const id = window.setTimeout(() => setStep('done'), 80);
      return () => window.clearTimeout(id);
    }
    if (step === 'done') onDone();
  }, [step, leftDone, mobileDynamicDone, rightDone, onDone]);

  const renderDesktopLeft = () => {
    if (step === 'left') {
      const systemsStart = SETTLED_DESKTOP.left.length + 1;
      if (leftTyped.length <= SETTLED_DESKTOP.left.length) {
        return leftTyped;
      }
      return (
        <>
          {SETTLED_DESKTOP.left}{' '}
          <span className="text-hero-brand desktop:text-hero-accent">
            {leftTyped.slice(systemsStart)}
          </span>
        </>
      );
    }
    if (step === 'gap' || step === 'right' || step === 'done') {
      return (
        <>
          {SETTLED_DESKTOP.left}{' '}
          <span className="text-hero-brand desktop:text-hero-accent">
            {SETTLED_DESKTOP.leftAccent}
          </span>
        </>
      );
    }
    return LOADER_LEFT.text;
  };

  const renderMobileDynamic = () => {
    if (step === 'left') {
      const accentStart = SETTLED_MOBILE.dynamic.length + 1;
      if (mobileDynamicTyped.length <= SETTLED_MOBILE.dynamic.length) {
        return <span className="text-hero-brand">{mobileDynamicTyped}</span>;
      }
      return (
        <>
          <span className="text-hero-brand">{SETTLED_MOBILE.dynamic} </span>
          <span className="text-hero-brand">{mobileDynamicTyped.slice(accentStart)}</span>
        </>
      );
    }
    if (step === 'gap' || step === 'right' || step === 'done') {
      return (
        <>
          <span className="text-hero-brand">{SETTLED_MOBILE.dynamic} </span>
          <span className="text-hero-brand">{SETTLED_MOBILE.dynamicAccent}</span>
        </>
      );
    }
    return (
      <span className="text-hero-brand">
        {LOADER_RIGHT_CYCLES[LOADER_RIGHT_CYCLES.length - 1].right}
      </span>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0.92 }}
      animate={{ opacity: 1 }}
      transition={{ duration: TIMING.settle.durationMs / 1000, ease: [0.4, 0, 0.2, 1] }}
      className="relative z-[1] flex w-full flex-col gap-2 pt-5 desktop:absolute desktop:bottom-[340px] desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-0 desktop:pt-0"
      data-name="text-animation-molecule"
    >
      <div className="desktop:order-2 desktop:flex desktop:w-[600px] desktop:justify-end">
        <div className="h-7 desktop:h-12">
          <p className="font-display-expanded uppercase text-hero-brand text-xl leading-7 desktop:hidden">
            {renderMobileDynamic()}
            {step === 'left' && !mobileDynamicDone && (
              <span className="hero-typewriter-cursor" aria-hidden="true">
                |
              </span>
            )}
          </p>
          {step === 'right' || step === 'done' ? (
            <p className="hidden font-display-expanded text-xl uppercase leading-7 tracking-normal text-zinc-950 desktop:block desktop:text-right desktop:text-4xl desktop:leading-[48px]">
              {rightTyped}
              {step === 'right' && !rightDone && (
                <span className="hero-typewriter-cursor" aria-hidden="true">
                  |
                </span>
              )}
            </p>
          ) : (
            <div className="hidden desktop:block">
              <LoaderRightLine
                phrase={LOADER_RIGHT_CYCLES[LOADER_RIGHT_CYCLES.length - 1]}
                phase="hold"
                typed={LOADER_RIGHT_CYCLES[LOADER_RIGHT_CYCLES.length - 1].right}
              />
            </div>
          )}
        </div>
      </div>

      <div className="desktop:order-1 desktop:w-[476px]">
        <div className="flex flex-col gap-1 desktop:gap-3">
          <div className="min-h-7 desktop:min-h-12">
            <p className="font-display-expanded text-xl uppercase leading-7 tracking-normal text-zinc-950 desktop:hidden">
              {step === 'right' || step === 'done' ? (
                <>
                  {rightTyped}
                  {step === 'right' && !rightDone && (
                    <span className="hero-typewriter-cursor" aria-hidden="true">
                      |
                    </span>
                  )}
                </>
              ) : (
                LOADER_LEFT.text
              )}
            </p>
            <div className="hidden font-display-expanded text-4xl uppercase leading-[48px] tracking-normal text-zinc-950 desktop:block">
              {renderDesktopLeft()}
              {step === 'left' && !leftDone && (
                <span className="hero-typewriter-cursor" aria-hidden="true">
                  |
                </span>
              )}
            </div>
          </div>
          <p className="font-display text-xs tracking-[0.8px] text-zinc-500 desktop:text-base">
            {HERO_SUBTEXT_MOBILE}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function HeroValuePropCycle({ onPhaseChange }: HeroValuePropCycleProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<HeroTextPhase>(reducedMotion ? 'settled' : 'loader');
  const [loadReady, setLoadReady] = useState(reducedMotion);

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [phase, onPhaseChange]);

  const markLoadReady = useCallback(() => setLoadReady(true), []);
  usePageLoadSignal(markLoadReady);

  const loaderActive = phase === 'loader';
  const left = useLoaderLeft(loaderActive);
  const right = useLoaderRightLoop(loaderActive && left.phase === 'done');

  useEffect(() => {
    if (reducedMotion || phase !== 'loader' || !loadReady) return;
    if (left.phase !== 'done' || !right.hasCompletedFullLoop) return;
    setPhase('settling');
  }, [reducedMotion, phase, loadReady, left.phase, right.hasCompletedFullLoop]);

  if (phase === 'settled' || reducedMotion) {
    return (
      <div
        className="relative z-[1] flex w-full flex-col gap-2 pt-5 desktop:absolute desktop:bottom-[340px] desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-0 desktop:pt-0"
        data-name="text-animation-molecule"
        aria-live="polite"
      >
        <div className="desktop:order-2 desktop:flex desktop:w-[600px] desktop:justify-end">
          <div className="desktop:hidden">
            <SettledMobile />
          </div>
          <p className="hidden font-display-expanded text-xl uppercase leading-7 tracking-normal text-zinc-950 desktop:block desktop:text-4xl desktop:leading-[48px]">
            {SETTLED_DESKTOP.right}
          </p>
        </div>
        <div className="desktop:order-1 desktop:w-[476px]">
          <div className="hidden desktop:block">
            <h1 className="font-display-expanded text-4xl uppercase leading-[48px] tracking-normal text-zinc-950">
              {SETTLED_DESKTOP.left}{' '}
              <span className="text-hero-accent">{SETTLED_DESKTOP.leftAccent}</span>
            </h1>
          </div>
          <p className="mt-1 font-display text-xs tracking-[0.8px] text-zinc-500 desktop:mt-3 desktop:text-base">
            {HERO_SUBTEXT_MOBILE}
          </p>
        </div>
        <span className="sr-only">
          {SETTLED_DESKTOP.left} {SETTLED_DESKTOP.leftAccent}. {SETTLED_DESKTOP.right}.{' '}
          {HERO_SUBTEXT_MOBILE}
        </span>
      </div>
    );
  }

  if (phase === 'settling') {
    return <SettlingAnimation onDone={() => setPhase('settled')} />;
  }

  return (
    <div
      className="relative z-[1] flex w-full flex-col gap-2 pt-5 desktop:absolute desktop:bottom-[340px] desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-0 desktop:pt-0"
      data-name="text-animation-molecule"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="desktop:order-2 desktop:flex desktop:w-[600px] desktop:justify-end">
        <div className="h-7 desktop:h-12">
          <AnimatePresence mode="wait">
            {left.phase === 'done' ? (
              <LoaderRightLine
                key={`loader-right-${right.index}`}
                phrase={right.phrase}
                phase={right.phase}
                typed={right.typed}
              />
            ) : (
              <motion.p
                key="loader-right-wait"
                className="font-display-expanded uppercase text-hero-brand desktop:text-hero-accent desktop:text-right text-xl leading-7 desktop:text-4xl desktop:leading-[48px]"
              >
                {LOADER_RIGHT_CYCLES[0].rightPrefix}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="desktop:order-1 desktop:w-[476px]">
        <div className="flex flex-col gap-1 desktop:gap-3">
          <div className="min-h-7 desktop:min-h-12">
            <AnimatePresence mode="wait">
              <LoaderLeftBlock phase={left.phase} typed={left.typed} />
            </AnimatePresence>
          </div>
          <LoaderSubtext phase={left.phase} subtextTyped={left.subtextTyped} />
        </div>
      </div>

      <span className="sr-only">
        {LOADER_LEFT.text}. {right.phrase.right}. {HERO_SUBTEXT_MOBILE}
      </span>
    </div>
  );
}

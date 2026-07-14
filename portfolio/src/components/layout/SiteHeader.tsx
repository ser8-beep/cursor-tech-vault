'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ENTRANCE, EASE_PROTOTYPE } from '@/lib/splash-phase';

/** Figma header-enter 13:32068 / header-1440 — nav link row copy */
const NAV_ITEMS = [
  { label: 'CASE STUDIES_PRO 04', href: '#case-studies' },
  { label: 'WORK_EXPERIENCE 04 YRS', href: undefined },
] as const;

type SiteHeaderProps = {
  /** True at header-enter (71:16879) — reveals nav links, nav-gif, resume card */
  entranceActive: boolean;
  reducedMotion?: boolean;
};

function BrandLockup() {
  return (
    <Link
      href="/"
      className="flex flex-col uppercase leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      aria-label="Shivani K. — home"
    >
      <span className="font-display-expanded-bold text-base tracking-normal text-zinc-950">
        SHIVANI K.
      </span>
      <span className="font-display text-[6px] tracking-[1px] text-zinc-700">
        v2026.vault
      </span>
    </Link>
  );
}

function NavGifPlaceholder({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <motion.div
      data-name="nav-gif"
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: ENTRANCE.headerNav.delay,
        duration: ENTRANCE.headerNav.duration,
        ease: EASE_PROTOTYPE.standard,
      }}
      className="relative hidden h-[52px] w-[120px] shrink-0 overflow-hidden rounded-[3px] mix-blend-luminosity laptop:block wide:h-[52px] wide:w-[140px]"
    />
  );
}

function WorkExGifPlaceholder() {
  return (
    <span
      data-name="work-ex-gif"
      aria-hidden
      className="relative h-full min-h-[48px] w-[72px] shrink-0 overflow-hidden rounded-[3px] mix-blend-luminosity tablet:min-h-[56px] tablet:w-[88px] laptop:h-[56px] laptop:w-[96px]"
    />
  );
}

function ResumeCard({
  visible,
  motionEnabled,
}: {
  visible: boolean;
  motionEnabled: boolean;
}) {
  if (!visible) return null;

  const motionProps = motionEnabled
    ? {
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        transition: {
          delay: ENTRANCE.headerNav.delay + 0.04,
          duration: ENTRANCE.headerNav.duration,
          ease: EASE_PROTOTYPE.standard,
        },
      }
    : {};

  return (
    <motion.div
      data-name="resume"
      className="hidden shrink-0 tablet:flex tablet:w-[200px] tablet:flex-col tablet:gap-1 laptop:inline-flex laptop:h-fit laptop:w-auto laptop:flex-row laptop:items-center laptop:gap-3 laptop:self-start"
      {...motionProps}
    >
      <Link
        href="/resume"
        className="group flex flex-1 flex-col gap-1 overflow-hidden rounded-[3px] border border-zinc-400 bg-nav-bg p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand laptop:flex-row laptop:items-center laptop:gap-3 laptop:py-2 laptop:pl-2.5 laptop:pr-1.5"
        aria-label="Product experience 4 years — view my resume"
      >
        <span className="flex min-w-0 flex-col gap-0.5 uppercase font-display text-[8px] tracking-[0.4px] laptop:flex-col-reverse laptop:gap-1">
          <span className="text-zinc-950">PRODUCT EX: 4 YRS+</span>
          <span className="text-brand underline decoration-from-font group-hover:text-brand-deep">
            MY RESUME
          </span>
        </span>
        <WorkExGifPlaceholder />
      </Link>
    </motion.div>
  );
}

/**
 * Responsive header — Figma header-enter 13:32068 / prototype 71:16879.
 * Splash (71:16870): brand only. Header-enter: nav row, nav-gif, resume card.
 */
export function SiteHeader({ entranceActive, reducedMotion = false }: SiteHeaderProps) {
  const motionEnabled = !reducedMotion;
  const brandOnly = !entranceActive;
  const showChrome = entranceActive;

  const navLinksMotion = motionEnabled
    ? {
        initial: { opacity: 0, height: 0 },
        animate: showChrome ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 },
        transition: {
          delay: ENTRANCE.headerNav.delay,
          duration: ENTRANCE.headerNav.duration,
          ease: EASE_PROTOTYPE.standard,
        },
      }
    : {};

  return (
    <header
      data-name="header-1440"
      className="flex w-full min-w-0 items-start justify-between gap-2 tablet:gap-3 laptop:gap-5"
    >
      <nav
        aria-label="Primary"
        data-name="nav"
        className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[3px] border border-zinc-400 bg-nav-bg"
      >
        <div
          className={`flex min-h-[44px] items-stretch justify-between gap-2 py-1.5 pl-2.5 pr-1.5 tablet:min-h-[48px] laptop:min-h-[52px] ${
            brandOnly ? '' : 'border-b border-zinc-400'
          }`}
        >
          <BrandLockup />
          <NavGifPlaceholder visible={showChrome} />
          {showChrome ? (
            <Link
              href="/resume"
              className="flex items-center gap-1.5 tablet:hidden"
              aria-label="Product experience 4 years — view my resume"
            >
              <span className="inline-flex flex-col items-end uppercase font-display text-[8px] tracking-[0.4px] text-zinc-950">
                <span>PRODUCT EX: 4 YRS+</span>
                <span className="text-brand underline">MY RESUME</span>
              </span>
              <WorkExGifPlaceholder />
            </Link>
          ) : null}
        </div>

        {!brandOnly ? (
          <motion.ul
            className="flex list-none flex-nowrap items-center gap-5 overflow-x-auto px-2.5 py-2 font-display text-[8px] uppercase tracking-[0.4px] text-zinc-950 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-hidden={!showChrome}
            {...navLinksMotion}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="shrink-0">
                {item.href ? (
                  <a
                    href={item.href}
                    className="whitespace-nowrap transition-colors hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
              </li>
            ))}
          </motion.ul>
        ) : null}
      </nav>

      <ResumeCard visible={showChrome} motionEnabled={motionEnabled} />
    </header>
  );
}

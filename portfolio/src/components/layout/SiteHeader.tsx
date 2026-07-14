'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ENTRANCE, EASE_PROTOTYPE } from '@/lib/splash-phase';

const NAV_ITEMS = [
  { label: 'CASE STUDIES', count: '04', href: '#case-studies' },
  { label: 'DATA Stories', count: '03', href: '#data-stories' },
  { label: 'About_ME', href: undefined },
] as const;

const HEADER_ASSETS = {
  overlay: '/assets/header/work-ex-overlay.png',
  photo: '/assets/header/work-ex-photo.png',
  icon: '/assets/header/work-ex-icon.svg',
  iconWide: '/assets/header/work-ex-icon-wide.svg',
} as const;

type SiteHeaderProps = {
  /** True at header-enter — reveals nav links, work-ex imagery, resume card */
  entranceActive: boolean;
  reducedMotion?: boolean;
};

function BrandLockup() {
  return (
    <Link
      href="/"
      className="flex shrink-0 flex-col gap-1 uppercase leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand tablet:gap-1 laptop:gap-1"
      aria-label="Shivani K. — home"
    >
      <span className="font-display-expanded text-[13px] text-zinc-950 tablet:text-lg laptop:text-base wide:text-xl">
        SHIVANI K.
      </span>
      <span className="font-display text-[6px] tracking-[1px] text-zinc-700 tablet:text-xs tablet:tracking-normal laptop:text-[11px]">
        v2026.vault
      </span>
    </Link>
  );
}

function WorkExGif({
  className = '',
  photoOffset = 'resume',
}: {
  className?: string;
  photoOffset?: 'mobile' | 'tablet' | 'nav' | 'resume';
}) {
  const photoPosition = {
    mobile: 'left-0 top-[-1px] h-[231px] w-[93px]',
    tablet: 'left-px top-0 h-[451px] w-[181px]',
    nav: 'left-px top-[-30px] h-[668px] w-[269px]',
    resume: 'left-px top-0 h-[451px] w-[181px]',
  }[photoOffset];

  return (
    <div
      aria-hidden
      data-name="work-ex-gif"
      className={`relative shrink-0 overflow-hidden rounded-[1px] mix-blend-luminosity ${className}`}
    >
      <Image
        src={HEADER_ASSETS.overlay}
        alt=""
        fill
        className="object-cover opacity-20"
        sizes="300px"
      />
      <div className={`absolute ${photoPosition}`}>
        <Image
          src={HEADER_ASSETS.photo}
          alt=""
          width={270}
          height={672}
          className="h-full w-full max-w-none object-cover object-top"
        />
      </div>
    </div>
  );
}

function NavCount({ children }: { children: string }) {
  return (
    <span className="font-body text-[11px] leading-[8px] text-hero-hover tablet:text-inherit">
      {children}
    </span>
  );
}

function NavLinksRow({
  showChrome,
  motionEnabled,
}: {
  showChrome: boolean;
  motionEnabled: boolean;
}) {
  const motionProps = motionEnabled
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
    <motion.ul
      className="flex list-none flex-nowrap items-center gap-4 overflow-x-auto bg-white px-1 py-1 font-display text-[11px] uppercase tracking-[0.55px] text-zinc-950 [scrollbar-width:none] tablet:gap-5 tablet:px-2 tablet:py-3 tablet:text-sm tablet:tracking-[0.7px] laptop:gap-5 laptop:px-3 laptop:py-2 laptop:text-[11px] laptop:tracking-[0.55px] wide:gap-5 wide:px-3 wide:py-4 wide:text-sm wide:tracking-[0.7px] [&::-webkit-scrollbar]:hidden"
      aria-hidden={!showChrome}
      {...motionProps}
    >
      {NAV_ITEMS.map((item) => (
        <li key={item.label} className="flex shrink-0 items-center gap-1">
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
          {'count' in item && item.count ? <NavCount>{item.count}</NavCount> : null}
        </li>
      ))}
    </motion.ul>
  );
}

function ResumeCopy({ className = '' }: { className?: string }) {
  return (
    <span
      className={`flex flex-col gap-0.5 uppercase font-display leading-none ${className}`}
    >
      <span className="text-zinc-950">WORK EX: 4 YRS+</span>
      <span className="text-brand underline decoration-from-font">MY RESUME</span>
    </span>
  );
}

function MobileResumeLink({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <Link
      href="/resume"
      className="flex h-full items-center gap-1 tablet:hidden"
      aria-label="Work experience 4 years — view my resume"
    >
      <span className="flex flex-col items-end gap-1 uppercase font-display text-[8px] tracking-[0.4px] text-zinc-950">
        <span>WORK EX: 4 YRS+</span>
        <span className="text-right text-brand underline">MY RESUME</span>
      </span>
      <WorkExGif className="h-full w-[82px]" photoOffset="mobile" />
    </Link>
  );
}

function TabletResumeSection({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <Link
      href="/resume"
      className="hidden w-[306px] shrink-0 items-end justify-center gap-1 bg-nav-bg tablet:flex laptop:hidden"
      aria-label="Work experience 4 years — view my resume"
    >
      <span className="flex flex-col items-end gap-2 uppercase font-display text-sm tracking-[0.7px] text-zinc-950">
        <span>WORK EX: 4 YRS+</span>
        <span className="text-[11px] tracking-[0.55px] text-brand underline">
          MY RESUME
        </span>
      </span>
      <WorkExGif className="h-10 min-w-0 flex-1" photoOffset="tablet" />
    </Link>
  );
}

function DesktopNavGif({ visible, motionEnabled }: { visible: boolean; motionEnabled: boolean }) {
  if (!visible) return null;

  const motionProps = motionEnabled
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: {
          delay: ENTRANCE.headerNav.delay,
          duration: ENTRANCE.headerNav.duration,
          ease: EASE_PROTOTYPE.standard,
        },
      }
    : {};

  return (
    <motion.div
      data-name="nav-gif"
      className="hidden h-full items-center laptop:flex"
      {...motionProps}
    >
      <WorkExGif className="h-full w-[271px]" photoOffset="nav" />
    </motion.div>
  );
}

function DesktopResumeCard({
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
      className="hidden shrink-0 laptop:flex"
      {...motionProps}
    >
      <Link
        href="/resume"
        className="group flex items-start gap-2 rounded-[3px] border border-zinc-400 bg-nav-bg py-2 pl-3 pr-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand wide:py-1 wide:pl-2 wide:pr-1"
        aria-label="Work experience 4 years — view my resume"
      >
        <span className="flex items-center gap-2">
          <span className="relative block size-8 shrink-0 overflow-clip">
            <Image
              src={HEADER_ASSETS.icon}
              alt=""
              fill
              className="object-contain wide:hidden"
            />
            <Image
              src={HEADER_ASSETS.iconWide}
              alt=""
              fill
              className="hidden object-contain wide:block"
            />
          </span>
          <ResumeCopy className="text-[11px] tracking-[0.55px] wide:text-xs wide:tracking-[0.6px]" />
        </span>
        <WorkExGif className="h-12 w-[183px] wide:h-14" photoOffset="resume" />
      </Link>
    </motion.div>
  );
}

/**
 * Responsive header — Figma `header_default_states_responsive` (182:1626).
 * Splash: brand only. Header-enter: nav row, work-ex gif, resume card.
 */
export function SiteHeader({ entranceActive, reducedMotion = false }: SiteHeaderProps) {
  const motionEnabled = !reducedMotion;
  const brandOnly = !entranceActive;
  const showChrome = entranceActive;

  return (
    <header
      data-name="header-responsive"
      className="flex w-full min-w-0 items-start justify-between gap-1 p-1 tablet:justify-center tablet:gap-0 tablet:p-2 laptop:justify-between"
    >
      <nav
        aria-label="Primary"
        data-name="nav"
        className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-[3px] border border-zinc-400 bg-nav-bg"
      >
        <div
          className={`flex min-h-[44px] items-stretch justify-between gap-1 bg-white px-1 py-1 tablet:min-h-[48px] tablet:gap-0 tablet:p-2 laptop:min-h-[52px] laptop:gap-20 laptop:px-3 laptop:py-2 wide:min-h-[56px] ${
            brandOnly ? 'rounded-[3px]' : 'rounded-t-[3px] border-b border-zinc-400'
          }`}
        >
          <BrandLockup />
          <DesktopNavGif visible={showChrome} motionEnabled={motionEnabled} />
          <MobileResumeLink visible={showChrome} />
          <TabletResumeSection visible={showChrome} />
        </div>

        {!brandOnly ? (
          <NavLinksRow showChrome={showChrome} motionEnabled={motionEnabled} />
        ) : null}
      </nav>

      <DesktopResumeCard visible={showChrome} motionEnabled={motionEnabled} />
    </header>
  );
}

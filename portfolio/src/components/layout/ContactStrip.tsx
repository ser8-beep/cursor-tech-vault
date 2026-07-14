'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ENTRANCE, EASE_PROTOTYPE } from '@/lib/splash-phase';

const CONTACT_ASSETS = {
  locationMobile: '/assets/footer/location-icon-mobile.svg',
  locationTablet: '/assets/footer/location-icon-tablet.svg',
  locationDesktop: '/assets/footer/location-icon.svg',
} as const;

const CONTACT_LINKS = {
  phone: { label: '+91 7977071976', href: 'tel:+917977071976' },
  email: { label: 'shivanimkher@gmail.com', href: 'mailto:shivanimkher@gmail.com' },
  linkedin: {
    label: 'linkedin @shivani kher',
    href: 'https://linkedin.com/in/shivanikher',
    external: true,
  },
} as const;

type ContactStripProps = {
  /** True at footer-enter — reveals contact bar and location block */
  entranceActive: boolean;
  reducedMotion?: boolean;
};

function ContactLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {})}
      className="hero-contact-link whitespace-nowrap font-display text-[11px] uppercase tracking-[0.55px] text-footer-text"
    >
      {label}
    </a>
  );
}

function LocationBlock({ className = '' }: { className?: string }) {
  return (
    <div
      data-name="location-time"
      className={`flex w-full items-center gap-0.5 tablet:w-auto tablet:shrink-0 ${className}`}
    >
      <div className="flex items-center gap-0.5 tablet:contents">
        <span className="relative block size-6 shrink-0 overflow-clip tablet:order-2 tablet:size-8">
          <Image
            src={CONTACT_ASSETS.locationMobile}
            alt=""
            fill
            className="object-contain tablet:hidden"
          />
          <Image
            src={CONTACT_ASSETS.locationTablet}
            alt=""
            fill
            className="hidden object-contain tablet:block laptop:hidden"
          />
          <Image
            src={CONTACT_ASSETS.locationDesktop}
            alt=""
            fill
            className="hidden object-contain laptop:block"
          />
        </span>
        <div className="font-display text-[8px] uppercase tracking-[0.4px] text-footer-text tablet:order-1 tablet:text-right">
          <p className="leading-normal">LOC: MUMBAI, IN</p>
          <p className="leading-normal">UTC+5:30</p>
        </div>
      </div>
    </div>
  );
}

function GetInTouchBar({ className = '' }: { className?: string }) {
  return (
    <div
      data-name="get-in-touch"
      className={`flex h-10 w-full shrink-0 items-center overflow-hidden rounded-[3px] border border-zinc-400 bg-footer-bg p-2 tablet:h-auto tablet:w-auto tablet:gap-8 tablet:px-4 tablet:py-3 ${className}`}
    >
      <div className="flex h-full items-center gap-4">
        <div className="flex items-center gap-4 tablet:hidden">
          <ContactLink href={CONTACT_LINKS.email.href} label={CONTACT_LINKS.email.label} />
          <ContactLink href={CONTACT_LINKS.phone.href} label={CONTACT_LINKS.phone.label} />
        </div>
        <div className="hidden items-center gap-4 tablet:flex">
          <ContactLink href={CONTACT_LINKS.phone.href} label={CONTACT_LINKS.phone.label} />
          <ContactLink href={CONTACT_LINKS.email.href} label={CONTACT_LINKS.email.label} />
          <ContactLink
            href={CONTACT_LINKS.linkedin.href}
            label={CONTACT_LINKS.linkedin.label}
            external
          />
        </div>
      </div>
      <span className="hidden whitespace-nowrap font-body text-[11px] uppercase tracking-[0.55px] text-footer-muted tablet:inline">
        LET&apos;S CONNECT
      </span>
    </div>
  );
}

/**
 * Responsive contact strip — Figma `contact-strip-sticky` (182:1627).
 * Mobile: location row + compact contact bar. Tablet+: contact bar left, location right.
 */
export function ContactStrip({
  entranceActive,
  reducedMotion = false,
}: ContactStripProps) {
  const motionEnabled = !reducedMotion;

  return (
    <motion.footer
      data-name="psuedo-footer"
      initial={motionEnabled ? { opacity: 0, y: 16 } : false}
      animate={
        motionEnabled
          ? entranceActive
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 16 }
          : undefined
      }
      transition={{
        delay: ENTRANCE.contact.delay,
        duration: ENTRANCE.contact.duration,
        ease: EASE_PROTOTYPE.standard,
      }}
      className="flex w-full flex-col gap-2 pt-6 tablet:flex-row tablet:items-end tablet:justify-between tablet:pb-5 tablet:pt-10"
      aria-hidden={!entranceActive}
    >
      <LocationBlock className="order-1 tablet:order-2" />
      <GetInTouchBar className="order-2 tablet:order-1" />
    </motion.footer>
  );
}

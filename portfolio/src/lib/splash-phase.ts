/**
 * Prototype flow — Figma file VibdutrclLgS5EpFWgbJhH, start 71:16870
 * https://www.figma.com/proto/VibdutrclLgS5EpFWgbJhH/...&starting-point-node-id=71%3A16870
 *
 * splash (71:16870, 2s timeline) → footer-enter (71:16874) → header-enter (71:16879)
 */

export type SplashPhase = 'splash' | 'footer' | 'header';

/** Smart Animate + AFTER_TIMEOUT delays from prototype reactions */
export const PROTOTYPE_PHASE_MS = {
  /** home-template-splash frame timeline */
  splashTimeline: 2000,
  /** footer-enter → header-enter */
  footerToHeaderDelay: 200,
  footerToHeaderDuration: 1000,
  /** header-enter → carousel-enter */
  headerToCarouselDelay: 800,
  headerToCarouselDuration: 2500,
} as const;

/** Staggered entrance on footer-enter (contact, carousel) and header-enter (nav) */
export const ENTRANCE = {
  contact: { delay: 0, duration: 0.4 },
  /** header-enter 71:16879 / 13:32068 — nav links, nav-gif, resume card */
  headerNav: { delay: 0.28, duration: 0.35 },
  carousel: { delay: 0.55, duration: 0.5 },
  carouselStagger: 0.08,
} as const;

export const EASE_PROTOTYPE = {
  standard: [0.4, 0, 0.2, 1] as const,
  header: [0.312576562166214, 1.0383985042572021, 0.8, 1] as const,
};

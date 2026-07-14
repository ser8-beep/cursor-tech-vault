export type LoaderRightPhrase = {
  right: string;
  rightPrefix: string;
};

/** Left anchor types once during loader — atoms 54:1036 */
export const LOADER_LEFT = {
  prefix: '.....|',
  text: 'LEAD UI/UX - L1',
  subtextPrefix: 'PR',
} as const;

/** Right dynamic phrases loop until load — atoms 54:825 */
export const LOADER_RIGHT_CYCLES: LoaderRightPhrase[] = [
  { right: 'AI NATIVE, LEAN UX', rightPrefix: '-|' },
  { right: 'MAINTAINABLE SYSTEMS', rightPrefix: '/|' },
  { right: 'AI NATIVE DOCUMENTATION', rightPrefix: '__|' },
  { right: 'DATA & STORYTELLING', rightPrefix: '...|' },
  { right: 'TEAM-AWARE PROCESSES', rightPrefix: '>|' },
];

/** Settled copy — footer-enter 71:16874 / header-enter 71:16879 */
export const SETTLED_DESKTOP = {
  left: 'BUILDING',
  leftAccent: 'SYSTEMS',
  right: 'THAT MAKE SENSE',
} as const;

export const SETTLED_MOBILE = {
  dynamic: 'DESIGNING',
  dynamicAccent: 'SYSTEMS',
  anchor: 'THAT MAKE SENSE',
} as const;

export const HERO_SUBTEXT_MOBILE =
  'PRODUCT_DESIGNER //AI NATIVE_LEAN UX_SYSTEMS_WORKFLOWS';

export const HERO_SUBTEXT_DESKTOP = 'PR';

/**
 * Calibrated from Figma prototype + text-animation atoms:
 *   71:16870 timeline = 2s prefix (.....| / -|)
 *   54:825 / 54:1036 atom steps ≈ 250ms each
 */
export const TIMING = {
  loader: {
    leftPrefixMs: 2000,
    leftCharMs: 50,
    subtextCharMs: 18,
    rightPrefixMs: 350,
    charMs: 60,
    holdMs: 1200,
    fadeMs: 100,
    minDurationMs: 3200,
  },
  settle: {
    pauseMs: 200,
    leftCharMs: 50,
    rightCharMs: 60,
    gapBeforeRightMs: 600,
    fadeMs: 200,
    durationMs: 1000,
  },
} as const;

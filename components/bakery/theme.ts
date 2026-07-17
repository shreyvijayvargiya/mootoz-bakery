import type { CSSProperties } from 'react'

export type ThemeMode = 'dark' | 'light'

export const THEMES = {
  dark: {
    bg: '#050505',
    surface: '#0C0C0C',
    elevated: '#141414',
    border: '#2A2A2A',
    accent: '#C4A574',
    accentDeep: '#A8844F',
    text: '#F5F0E8',
    muted: '#8A8278',
    charcoal: '#000000',
    navBg: '#000000',
    navText: '#F5F0E8',
    navMuted: '#9A9188',
    navBorder: '#222222',
    heroFrom: '#1A1612',
    heroMid: '#0A0A0A',
    heroTo: '#050505',
    formPaper: '#E8E4DE',
    formInk: '#111111',
    formMuted: '#6B6560',
  },
  light: {
    bg: '#F4F0EA',
    surface: '#FFFFFF',
    elevated: '#FAF7F2',
    border: '#D9CFC3',
    accent: '#8B6914',
    accentDeep: '#6F5410',
    text: '#1A1512',
    muted: '#6B5B55',
    charcoal: '#1A1512',
    navBg: '#FFFFFF',
    navText: '#1A1512',
    navMuted: '#6B5B55',
    navBorder: '#D9CFC3',
    heroFrom: '#EDE6DC',
    heroMid: '#F4F0EA',
    heroTo: '#F4F0EA',
    formPaper: '#FFFFFF',
    formInk: '#111111',
    formMuted: '#6B6560',
  },
} as const

export type ThemeTokens = (typeof THEMES)[ThemeMode]

/** @deprecated use THEMES.dark — kept for gradual migration */
export const THEME = THEMES.dark

export function bakeryThemeStyle(mode: ThemeMode = 'dark'): CSSProperties {
  const t = THEMES[mode]
  return {
    '--mootoz-bg': t.bg,
    '--mootoz-surface': t.surface,
    '--mootoz-elevated': t.elevated,
    '--mootoz-border': t.border,
    '--mootoz-cream': t.bg,
    '--mootoz-maroon': t.accent,
    '--mootoz-charcoal': t.charcoal,
    '--mootoz-text': t.text,
    '--mootoz-muted': t.muted,
    '--mootoz-accent': t.accent,
    '--mootoz-nav-bg': t.navBg,
    '--mootoz-nav-text': t.navText,
    '--mootoz-nav-muted': t.navMuted,
    '--mootoz-nav-border': t.navBorder,
    '--mootoz-hero-from': t.heroFrom,
    '--mootoz-hero-mid': t.heroMid,
    '--mootoz-hero-to': t.heroTo,
    '--mootoz-form-paper': t.formPaper,
    '--mootoz-form-ink': t.formInk,
    '--mootoz-form-muted': t.formMuted,
    '--background': t.bg,
    '--foreground': t.text,
    '--card': t.surface,
    '--card-foreground': t.text,
    '--popover': t.surface,
    '--popover-foreground': t.text,
    '--primary': t.accent,
    '--primary-foreground': t.bg,
    '--secondary': t.elevated,
    '--secondary-foreground': t.text,
    '--muted': t.elevated,
    '--muted-foreground': t.muted,
    '--accent': t.elevated,
    '--accent-foreground': t.text,
    '--border': t.border,
    '--input': t.border,
    '--ring': t.accent,
  } as CSSProperties
}

export const EASE = [0.22, 1, 0.36, 1] as const

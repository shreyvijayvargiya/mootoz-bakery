'use client'

import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import {
  Facebook,
  Instagram,
  Menu,
  Moon,
  Sun,
  X,
  Youtube,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, type ReactNode } from 'react'

import { LogoMark } from '@/components/bakery/LogoMark'
import { ThemeProvider, useBakeryTheme } from '@/components/bakery/ThemeProvider'
import { bakeryThemeStyle, THEMES } from '@/components/bakery/theme'
import { Button } from '@/components/ui/button'
import { BRAND, LINKS, NAV_LINKS } from '@/lib/bakery-data'
import { cn } from '@/lib/utils'

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.227-8.66L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  )
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: ReactNode
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -4, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex size-10 items-center justify-center rounded-full border border-[var(--mootoz-nav-border)] bg-[var(--mootoz-elevated)] text-[var(--mootoz-nav-text)] transition-colors hover:border-[var(--mootoz-accent)]/50 hover:bg-[var(--mootoz-accent)] hover:text-[var(--mootoz-bg)]"
    >
      {children}
    </motion.a>
  )
}

export function BakeryNav({ solid = false }: { solid?: boolean }) {
  const pathname = usePathname()
  const { theme, toggleTheme } = useBakeryTheme()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 20)
  })

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b border-[var(--mootoz-nav-border)] transition-colors duration-300',
        (scrolled || solid) && 'shadow-lg shadow-black/20 backdrop-blur-xl',
      )}
      style={{
        backgroundColor:
          scrolled || solid
            ? 'color-mix(in srgb, var(--mootoz-nav-bg) 95%, transparent)'
            : 'var(--mootoz-nav-bg)',
      }}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <LogoMark className="size-11 shrink-0" />
          <span className="truncate text-sm font-semibold tracking-wide text-[var(--mootoz-nav-text)] sm:text-base">
            {BRAND.name}
            <span className="mt-0.5 hidden text-xs font-normal text-[var(--mootoz-nav-muted)] sm:block">
              {BRAND.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'text-[var(--mootoz-nav-text)]'
                    : 'text-[var(--mootoz-nav-muted)] hover:text-[var(--mootoz-nav-text)]',
                )}
              >
                {active ? (
                  <span className="absolute inset-0 rounded-full bg-[color-mix(in_srgb,var(--mootoz-accent)_15%,transparent)]" />
                ) : null}
                <span className="relative z-10">{link.label}</span>
              </Link>
            )
          })}
          <button
            type="button"
            aria-label={
              theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
            }
            onClick={toggleTheme}
            className="ml-1 rounded-full p-2.5 text-[var(--mootoz-nav-muted)] transition-colors hover:bg-[color-mix(in_srgb,var(--mootoz-accent)_12%,transparent)] hover:text-[var(--mootoz-nav-text)]"
          >
            {theme === 'dark' ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </button>
          <Button
            asChild
            size="sm"
            className="ml-1 h-9 rounded-full bg-[var(--mootoz-accent)] px-4 text-xs font-semibold text-[var(--mootoz-bg)] hover:brightness-110"
          >
            <Link href="/reservation">Reserve</Link>
          </Button>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <button
            type="button"
            aria-label={
              theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
            }
            onClick={toggleTheme}
            className="rounded-full p-2.5 text-[var(--mootoz-nav-text)]"
          >
            {theme === 'dark' ? (
              <Sun className="size-5" />
            ) : (
              <Moon className="size-5" />
            )}
          </button>
          <button
            type="button"
            className="rounded-full p-2.5 text-[var(--mootoz-nav-text)]"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-[var(--mootoz-nav-border)] bg-[var(--mootoz-nav-bg)] lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-[var(--mootoz-nav-text)] hover:bg-[color-mix(in_srgb,var(--mootoz-accent)_12%,transparent)]"
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="mt-2 h-11 rounded-xl bg-[var(--mootoz-accent)] font-semibold text-[var(--mootoz-bg)] hover:brightness-110"
            >
              <Link href="/reservation" onClick={() => setOpen(false)}>
                Reserve a Table
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

export function BakeryFooter() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden border-t border-[var(--mootoz-nav-border)]"
      style={{ backgroundColor: 'var(--mootoz-nav-bg)' }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--mootoz-accent)]/60 to-transparent"
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <LogoMark className="size-20" />
          <p
            className="text-center text-base font-semibold text-[var(--mootoz-nav-text)] sm:text-left"
            style={{ fontFamily: '"Fraunces", Georgia, serif' }}
          >
            {BRAND.name}
          </p>
          <p className="text-center text-xs text-[var(--mootoz-nav-muted)] sm:text-left">
            Bakers &amp; Cafe · 100% Eggless · New York
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 sm:items-start">
          <p className="mb-1 text-xs font-semibold tracking-widest text-[var(--mootoz-accent)] uppercase">
            Explore
          </p>
          <Link
            href="/menu"
            className="text-sm text-[var(--mootoz-nav-muted)] transition-colors hover:text-[var(--mootoz-accent)]"
          >
            Menu
          </Link>
          <Link
            href="/reservation"
            className="text-sm text-[var(--mootoz-nav-muted)] transition-colors hover:text-[var(--mootoz-accent)]"
          >
            Reservation
          </Link>
          <Link
            href="/privacy-policy"
            className="text-sm text-[var(--mootoz-nav-muted)] transition-colors hover:text-[var(--mootoz-accent)]"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-and-conditions"
            className="text-sm text-[var(--mootoz-nav-muted)] transition-colors hover:text-[var(--mootoz-accent)]"
          >
            Terms &amp; Conditions
          </Link>
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-start">
          <p className="mb-1 text-xs font-semibold tracking-widest text-[var(--mootoz-accent)] uppercase">
            Licence
          </p>
          <div className="flex h-16 w-28 flex-col items-center justify-center rounded-xl border-2 border-[#5DADE2] bg-[var(--mootoz-surface)] px-2 shadow-md">
            <span className="text-[0.7rem] font-black tracking-wider text-[#1B4F72]">
              NYC
            </span>
            <span className="mt-0.5 text-[0.5rem] text-[#1B4F72]/80">
              Licensed
            </span>
          </div>
          <p className="text-xs text-[var(--mootoz-nav-muted)]">
            NYC Department of Health
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-start">
          <p className="mb-1 text-xs font-semibold tracking-widest text-[var(--mootoz-accent)] uppercase">
            Follow us
          </p>
          <div className="flex items-center gap-2.5">
            <SocialIcon href={LINKS.facebook} label="Facebook">
              <Facebook className="size-4" />
            </SocialIcon>
            <SocialIcon href={LINKS.instagram} label="Instagram">
              <Instagram className="size-4" />
            </SocialIcon>
            <SocialIcon href={LINKS.youtube} label="YouTube">
              <Youtube className="size-4" />
            </SocialIcon>
            <SocialIcon href={LINKS.x} label="X">
              <XIcon />
            </SocialIcon>
          </div>
          <a
            href={LINKS.phone}
            className="mt-2 text-sm text-[var(--mootoz-nav-muted)] transition-colors hover:text-[var(--mootoz-accent)]"
          >
            {BRAND.phoneDisplay}
          </a>
        </div>
      </div>

      <div
        className="border-t border-[var(--mootoz-nav-border)] py-4 text-center text-xs text-[var(--mootoz-nav-muted)]"
        suppressHydrationWarning
      >
        © 2026 {BRAND.name}. All Rights Reserved. · New York
      </div>
    </footer>
  )
}

function ShellInner({
  children,
  solidNav,
}: {
  children: ReactNode
  solidNav?: boolean
}) {
  const { theme } = useBakeryTheme()
  const themeVars = bakeryThemeStyle(theme)
  const t = THEMES[theme]

  return (
    <div
      className="bakery-page relative min-h-svh antialiased"
      style={{
        ...themeVars,
        scrollBehavior: 'smooth',
        backgroundColor: t.bg,
        color: t.text,
        fontFamily: '"Outfit", system-ui, sans-serif',
      }}
    >
      <BakeryNav solid={solidNav} />
      {children}
      <BakeryFooter />
    </div>
  )
}

export function BakeryShell({
  children,
  solidNav = false,
}: {
  children: ReactNode
  solidNav?: boolean
}) {
  return (
    <ThemeProvider>
      <ShellInner solidNav={solidNav}>{children}</ShellInner>
    </ThemeProvider>
  )
}

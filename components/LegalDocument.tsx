'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useEffect, type CSSProperties, type ReactNode } from 'react'

const THEME = {
  bg: '#12100E',
  surface: '#1A1714',
  elevated: '#221E1A',
  border: '#3A342E',
  accent: '#C4A574',
  text: '#F3EDE5',
  muted: '#9C9388',
  navBg: '#0A0908',
} as const

export type LegalSection = {
  title: string
  paragraphs?: string[]
  bullets?: string[]
  afterBullets?: string[]
}

type LegalDocumentProps = {
  title: string
  subtitle?: string
  meta?: Array<{ label: string; value: ReactNode }>
  intro?: string[]
  sections: LegalSection[]
  closing?: {
    title: string
    paragraphs: string[]
  }
}

export function LegalDocument({
  title,
  subtitle,
  meta,
  intro,
  sections,
  closing,
}: LegalDocumentProps) {
  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    const prevBg = body.style.backgroundColor
    const prevScheme = root.style.colorScheme
    body.style.backgroundColor = THEME.bg
    root.style.colorScheme = 'dark'
    return () => {
      body.style.backgroundColor = prevBg
      root.style.colorScheme = prevScheme
    }
  }, [])

  const themeVars = {
    '--mootoz-bg': THEME.bg,
    '--mootoz-surface': THEME.surface,
    '--mootoz-elevated': THEME.elevated,
    '--mootoz-border': THEME.border,
    '--mootoz-accent': THEME.accent,
    '--mootoz-text': THEME.text,
    '--mootoz-muted': THEME.muted,
    '--mootoz-nav-bg': THEME.navBg,
  } as CSSProperties

  return (
    <div
      className="min-h-svh antialiased"
      style={{
        ...themeVars,
        backgroundColor: THEME.bg,
        color: THEME.text,
        fontFamily: '"Outfit", system-ui, sans-serif',
      }}
    >
      <header className="sticky top-0 z-40 border-b border-[var(--mootoz-border)] bg-[color-mix(in_srgb,var(--mootoz-nav-bg)_92%,transparent)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--mootoz-muted)] transition-colors hover:text-[var(--mootoz-accent)]"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/motooz-logo.png"
              alt="Mooto'z Bakery"
              className="size-9 rounded-full object-cover ring-1 ring-[var(--mootoz-accent)]/40"
            />
            <span
              className="hidden text-sm font-semibold text-[var(--mootoz-text)] sm:inline"
              style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            >
              Mooto&apos;z Bakery
            </span>
          </Link>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,color-mix(in_srgb,var(--mootoz-accent)_18%,transparent),transparent)]"
        />

        <article className="relative mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          <header className="mb-10 border-b border-[var(--mootoz-border)] pb-8">
            <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-[var(--mootoz-accent)] uppercase">
              Legal
            </p>
            <h1
              className="text-3xl font-bold tracking-tight text-[var(--mootoz-accent)] sm:text-4xl"
              style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            >
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-2 text-base font-medium text-[var(--mootoz-text)]">
                {subtitle}
              </p>
            ) : null}
            {meta && meta.length > 0 ? (
              <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--mootoz-muted)]">
                {meta.map((item) => (
                  <div key={item.label} className="flex gap-1.5">
                    <dt className="font-medium text-[var(--mootoz-text)]/70">
                      {item.label}:
                    </dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </header>

          {intro?.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="mb-5 text-[0.975rem] leading-relaxed text-[var(--mootoz-muted)]"
            >
              {paragraph}
            </p>
          ))}

          <div className="space-y-10">
            {sections.map((section, index) => (
              <section
                key={section.title}
                id={`section-${index + 1}`}
                className="scroll-mt-24"
              >
                <h2
                  className="mb-4 flex items-baseline gap-3 text-xl font-bold text-[var(--mootoz-text)]"
                  style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                >
                  <span className="font-mono text-sm font-semibold text-[var(--mootoz-accent)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {section.title}
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="mb-4 text-[0.975rem] leading-relaxed text-[var(--mootoz-muted)]"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets && section.bullets.length > 0 ? (
                  <ul className="mb-4 space-y-2.5 pl-5">
                    {section.bullets.map((item) => (
                      <li
                        key={item}
                        className="relative text-[0.975rem] leading-relaxed text-[var(--mootoz-muted)] before:absolute before:-left-[1.15rem] before:top-[0.65em] before:size-1.5 before:rounded-full before:bg-[var(--mootoz-accent)]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.afterBullets?.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="mb-4 text-[0.975rem] leading-relaxed text-[var(--mootoz-muted)]"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>

          {closing ? (
            <aside className="mt-12 rounded-2xl border border-[var(--mootoz-border)] bg-[var(--mootoz-surface)] p-6 sm:p-8">
              <h2
                className="mb-3 text-lg font-bold text-[var(--mootoz-accent)]"
                style={{ fontFamily: '"Fraunces", Georgia, serif' }}
              >
                {closing.title}
              </h2>
              {closing.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  className="text-[0.975rem] leading-relaxed text-[var(--mootoz-muted)]"
                >
                  {paragraph}
                </p>
              ))}
            </aside>
          ) : null}

          <footer className="mt-14 flex flex-col items-start gap-4 border-t border-[var(--mootoz-border)] pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[var(--mootoz-muted)]" suppressHydrationWarning>
              © 2026 Mootoz Bakery · www.mootozbakery.com
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link
                href="/privacy-policy"
                className="text-[var(--mootoz-muted)] transition-colors hover:text-[var(--mootoz-accent)]"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="text-[var(--mootoz-muted)] transition-colors hover:text-[var(--mootoz-accent)]"
              >
                Terms &amp; Conditions
              </Link>
            </div>
          </footer>
        </article>
      </main>
    </div>
  )
}

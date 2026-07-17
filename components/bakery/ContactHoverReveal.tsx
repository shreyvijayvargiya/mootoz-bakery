'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, BadgeCheck, Calendar, Check } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { EASE } from '@/components/bakery/theme'
import { BRAND, LINKS } from '@/lib/bakery-data'
import { cn } from '@/lib/utils'

type ContactHoverRevealProps = {
  className?: string
  /** Optional lead-in / trail text around the pill */
  before?: string
  after?: string
}

export function ContactHoverReveal({
  className,
  before = 'Not just a simple',
  after = 'button.',
}: ContactHoverRevealProps) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={cn('relative mx-auto w-full max-w-xl text-center', className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocusCapture={() => setOpen(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setOpen(false)
        }
      }}
    >
      <p
        className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-2xl font-medium tracking-tight text-[var(--mootoz-text)] sm:text-3xl md:text-4xl"
        style={{ fontFamily: '"Outfit", system-ui, sans-serif' }}
      >
        <span>{before}</span>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="hearth-contact-card"
          className={cn(
            'inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-colors duration-200 sm:text-base',
            open
              ? 'bg-[var(--mootoz-text)] text-[var(--mootoz-bg)]'
              : 'bg-[color-mix(in_srgb,var(--mootoz-elevated)_85%,transparent)] text-[var(--mootoz-text)] ring-1 ring-[var(--mootoz-border)] backdrop-blur-md hover:bg-[color-mix(in_srgb,var(--mootoz-accent)_20%,var(--mootoz-elevated))]',
          )}
        >
          <ArrowUpRight className="size-4" />
          Contact
        </button>
        <span>{after}</span>
      </p>

      <div className="relative mx-auto mt-3 min-h-[8px] w-full max-w-md">
        <AnimatePresence>
          {open ? (
            <motion.div
              id="hearth-contact-card"
              role="dialog"
              aria-label="Contact Hearth Bakery"
              initial={{ opacity: 0, y: -8, scale: 0.96, height: 0 }}
              animate={{ opacity: 1, y: 0, scale: 1, height: 'auto' }}
              exit={{ opacity: 0, y: -6, scale: 0.98, height: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
              className="origin-top overflow-hidden"
            >
              <div
                className="rounded-2xl border border-white/15 p-4 text-left shadow-2xl backdrop-blur-xl sm:p-5"
                style={{
                  background:
                    'linear-gradient(145deg, color-mix(in srgb, var(--mootoz-elevated) 78%, transparent), color-mix(in srgb, var(--mootoz-surface) 70%, transparent))',
                  boxShadow:
                    '0 24px 48px -20px color-mix(in srgb, var(--mootoz-charcoal) 55%, transparent), inset 0 1px 0 color-mix(in srgb, white 14%, transparent)',
                }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="relative shrink-0">
                    <img
                      src="/icon.svg"
                      alt=""
                      className="size-14 rounded-xl bg-[var(--mootoz-accent)] object-cover p-2 sm:size-16"
                    />
                    <span className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full bg-[#3B82F6] text-white ring-2 ring-[var(--mootoz-surface)]">
                      <Check className="size-3 stroke-[3]" />
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className="size-2 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                            aria-label="Online"
                          />
                          <p className="truncate font-semibold text-[var(--mootoz-text)]">
                            {BRAND.name}
                          </p>
                          <BadgeCheck className="size-4 shrink-0 text-[var(--mootoz-accent)]" />
                        </div>
                        <p className="mt-0.5 text-xs text-[var(--mootoz-muted)] sm:text-sm">
                          Bakers &amp; Cafe · New York
                        </p>
                      </div>
                      <Link
                        href="/reservation"
                        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--mootoz-bg)] px-3 py-1.5 text-[0.7rem] font-semibold text-[var(--mootoz-text)] ring-1 ring-[var(--mootoz-border)] transition hover:bg-[var(--mootoz-accent)] hover:text-[var(--mootoz-bg)]"
                      >
                        <Calendar className="size-3.5" />
                        Book a Table
                      </Link>
                    </div>
                  </div>
                </div>

                <a
                  href={LINKS.email}
                  className="mt-4 block truncate border-t border-white/10 pt-3 text-base font-medium text-[var(--mootoz-text)] transition hover:text-[var(--mootoz-accent)] sm:text-lg"
                >
                  {BRAND.email}
                </a>
                <a
                  href={LINKS.phone}
                  className="mt-1 block text-sm text-[var(--mootoz-muted)] hover:text-[var(--mootoz-accent)]"
                >
                  {BRAND.phoneDisplay}
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}

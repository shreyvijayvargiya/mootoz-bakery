'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'

import { BakeryShell } from '@/components/bakery/BakeryShell'
import { EASE } from '@/components/bakery/theme'
import { Button } from '@/components/ui/button'
import { MENU_CATEGORIES } from '@/lib/bakery-data'
import { cn } from '@/lib/utils'

export default function MenuPageView() {
  const [activeId, setActiveId] = useState<(typeof MENU_CATEGORIES)[number]['id']>(
    MENU_CATEGORIES[0].id,
  )
  const active =
    MENU_CATEGORIES.find((c) => c.id === activeId) ?? MENU_CATEGORIES[0]

  return (
    <BakeryShell solidNav>
      <main className="pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10 max-w-2xl">
            <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-[var(--mootoz-accent)] uppercase">
              Full menu
            </p>
            <h1
              className="text-4xl font-bold tracking-tight text-[var(--mootoz-accent)] sm:text-5xl"
              style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            >
              Our Menu
            </h1>
            <p className="mt-3 text-base text-[var(--mootoz-muted)]">
              All 100% eggless — cakes, pastries, breads, cookies, and custom
              orders baked fresh in New York.
            </p>
          </header>

          <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
            {/* Left tabs */}
            <aside className="lg:w-56 lg:shrink-0">
              <nav
                className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-28 lg:flex-col lg:overflow-visible lg:pb-0"
                aria-label="Menu categories"
              >
                {MENU_CATEGORIES.map((cat) => {
                  const isActive = cat.id === activeId
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveId(cat.id)}
                      className={cn(
                        'shrink-0 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all',
                        isActive
                          ? 'bg-[var(--mootoz-accent)] text-[var(--mootoz-bg)] shadow-md shadow-[var(--mootoz-accent)]/20'
                          : 'bg-[var(--mootoz-elevated)] text-[var(--mootoz-muted)] hover:text-[var(--mootoz-text)] lg:bg-transparent',
                      )}
                    >
                      {cat.label}
                    </button>
                  )
                })}
              </nav>

              <Button
                asChild
                className="mt-6 hidden h-11 w-full rounded-full bg-[var(--mootoz-accent)] font-semibold text-[var(--mootoz-bg)] hover:brightness-110 lg:inline-flex"
              >
                <Link href="/reservation">Reserve a Table</Link>
              </Button>
            </aside>

            {/* Right dishes — wider */}
            <div className="min-w-0 flex-1">
              <div className="mb-6 flex items-end justify-between gap-4 border-b border-[var(--mootoz-border)] pb-4">
                <h2
                  className="text-2xl font-bold text-[var(--mootoz-text)]"
                  style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                >
                  {active.label}
                </h2>
                <p className="text-xs text-[var(--mootoz-muted)]">
                  {active.items.length} items
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {active.items.map((item, i) => (
                  <motion.article
                    key={item.name}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4, ease: EASE }}
                    className="group overflow-hidden rounded-2xl border border-[var(--mootoz-border)] bg-[var(--mootoz-surface)]"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold text-[var(--mootoz-text)]">
                          {item.name}
                        </h3>
                        <span className="shrink-0 font-semibold text-[var(--mootoz-accent)]">
                          {item.price}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-[var(--mootoz-muted)]">
                        {item.description}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </div>

              <div className="mt-10 flex justify-center lg:hidden">
                <Button
                  asChild
                  className="h-11 rounded-full bg-[var(--mootoz-accent)] px-8 font-semibold text-[var(--mootoz-bg)] hover:brightness-110"
                >
                  <Link href="/reservation">Reserve a Table</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </BakeryShell>
  )
}

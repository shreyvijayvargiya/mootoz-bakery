'use client'

import { MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

import { BakeryShell } from '@/components/bakery/BakeryShell'
import { ContactHoverReveal } from '@/components/bakery/ContactHoverReveal'
import { KitchenBackdrop } from '@/components/bakery/KitchenBackdrop'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BRAND, LINKS } from '@/lib/bakery-data'

export default function ContactPageView() {
  return (
    <BakeryShell solidNav>
      <main
        className="relative min-h-[calc(100svh-4.25rem)] overflow-hidden pt-28 pb-20"
        style={{ backgroundColor: 'var(--mootoz-surface)' }}
      >
        <KitchenBackdrop />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.18em] text-[var(--mootoz-accent)] uppercase">
              Get in touch
            </p>
            <h1
              className="text-4xl font-bold tracking-tight text-[var(--mootoz-accent)] sm:text-5xl"
              style={{ fontFamily: '"Fraunces", Georgia, serif' }}
            >
              Contact {BRAND.shortName}
            </h1>
            <p className="mt-3 text-base text-[var(--mootoz-muted)]">
              Hover the contact pill to open our card — book a table, email, or
              call the bakery.
            </p>
          </div>

          <div
            className="mb-16 rounded-[2rem] border border-[var(--mootoz-border)] px-4 py-16 sm:px-8"
            style={{
              background:
                'radial-gradient(ellipse 80% 70% at 30% 100%, color-mix(in srgb, var(--mootoz-accent) 28%, transparent), transparent 55%), var(--mootoz-bg)',
            }}
          >
            <ContactHoverReveal
              before="Not just a simple"
              after="button."
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Card className="border-[var(--mootoz-border)] bg-[var(--mootoz-elevated)]">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-2xl bg-[var(--mootoz-accent)] text-[var(--mootoz-bg)]">
                    <Phone className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs tracking-wide text-[var(--mootoz-muted)] uppercase">
                      Phone
                    </p>
                    <a
                      href={LINKS.phone}
                      className="font-semibold text-[var(--mootoz-text)] hover:text-[var(--mootoz-accent)]"
                    >
                      {BRAND.phoneDisplay}
                    </a>
                  </div>
                </div>
                <Button
                  asChild
                  className="rounded-full bg-[var(--mootoz-accent)] font-semibold text-[var(--mootoz-bg)]"
                >
                  <Link href="/reservation">Reserve a Table</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-[var(--mootoz-border)] bg-[var(--mootoz-elevated)]">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--mootoz-accent)] text-[var(--mootoz-bg)]">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs tracking-wide text-[var(--mootoz-muted)] uppercase">
                      Visit
                    </p>
                    <p className="text-sm leading-relaxed text-[var(--mootoz-text)]">
                      148 Bedford Street, West Village, New York, NY 10014
                    </p>
                  </div>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-[var(--mootoz-accent)] text-[var(--mootoz-accent)]"
                >
                  <a href={LINKS.maps} target="_blank" rel="noopener noreferrer">
                    Open in Maps
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </BakeryShell>
  )
}

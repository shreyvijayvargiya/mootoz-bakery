'use client'

import { Calendar, ChevronDown, Clock } from 'lucide-react'
import {
  useState,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'
import { toast } from 'sonner'

import { BakeryShell } from '@/components/bakery/BakeryShell'
import { KitchenBackdrop } from '@/components/bakery/KitchenBackdrop'
import { RESERVATION_LOCATIONS } from '@/lib/bakery-data'
import { cn } from '@/lib/utils'

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="mb-2 block text-[0.65rem] font-semibold tracking-[0.16em] text-[var(--mootoz-form-ink)] uppercase">
      {children}
    </label>
  )
}

function UnderlineField({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { className?: string }) {
  return (
    <input
      className={cn(
        'w-full border-0 border-b border-dashed border-[var(--mootoz-form-ink)]/35 bg-transparent pb-2 text-sm text-[var(--mootoz-form-ink)] outline-none placeholder:text-[var(--mootoz-form-muted)] focus:border-[var(--mootoz-form-ink)]',
        className,
      )}
      {...props}
    />
  )
}

const selectClass =
  'w-full appearance-none border-0 border-b border-dashed border-[var(--mootoz-form-ink)]/35 bg-transparent pb-2 pr-8 text-sm text-[var(--mootoz-form-ink)] outline-none focus:border-[var(--mootoz-form-ink)]'

export default function ReservationPageView() {
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    window.setTimeout(() => {
      setSubmitting(false)
      toast.success('Reservation request received. We will confirm shortly.')
      ;(e.target as HTMLFormElement).reset()
    }, 700)
  }

  return (
    <BakeryShell solidNav>
      <main
        className="relative min-h-[calc(100svh-4.25rem)] overflow-hidden pt-24 pb-20"
        style={{ backgroundColor: 'var(--mootoz-surface)' }}
      >
        <KitchenBackdrop />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <form
            onSubmit={onSubmit}
            className="overflow-hidden rounded-[1.75rem] bg-[var(--mootoz-form-paper)] shadow-2xl shadow-black/40"
          >
            <div className="border-b border-[var(--mootoz-form-ink)]/10 px-6 py-8 text-center sm:px-10">
              <h1
                className="text-4xl font-medium tracking-tight text-[var(--mootoz-form-ink)] sm:text-5xl"
                style={{ fontFamily: '"Fraunces", Georgia, serif' }}
              >
                Reservation
              </h1>
              <p className="mt-2 text-sm text-[var(--mootoz-form-muted)]">
                Book a table at any of our New York bakeries
              </p>
            </div>

            <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-3 lg:gap-10 lg:py-10">
              {/* Column 1 — visit details */}
              <div className="space-y-6">
                <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-[var(--mootoz-form-muted)] uppercase">
                  Visit
                </p>
                <div>
                  <FieldLabel>Location</FieldLabel>
                  <div className="relative">
                    <select
                      required
                      name="location"
                      defaultValue=""
                      className={selectClass}
                    >
                      <option value="" disabled>
                        Select...
                      </option>
                      {RESERVATION_LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-0 bottom-2.5 size-4 text-[var(--mootoz-form-ink)]/60" />
                  </div>
                </div>
                <div>
                  <FieldLabel>Date</FieldLabel>
                  <div className="relative">
                    <UnderlineField
                      required
                      name="date"
                      type="date"
                      className="pr-8 [color-scheme:light]"
                    />
                    <Calendar className="pointer-events-none absolute right-0 bottom-2.5 size-4 text-[var(--mootoz-form-ink)]/60" />
                  </div>
                </div>
                <div>
                  <FieldLabel>Time</FieldLabel>
                  <div className="relative">
                    <UnderlineField
                      required
                      name="time"
                      type="time"
                      className="pr-8 [color-scheme:light]"
                    />
                    <Clock className="pointer-events-none absolute right-0 bottom-2.5 size-4 text-[var(--mootoz-form-ink)]/60" />
                  </div>
                </div>
              </div>

              {/* Column 2 — guest */}
              <div className="space-y-6 lg:border-x lg:border-[var(--mootoz-form-ink)]/10 lg:px-8">
                <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-[var(--mootoz-form-muted)] uppercase">
                  Guest
                </p>
                <div>
                  <FieldLabel>Name</FieldLabel>
                  <UnderlineField
                    required
                    name="name"
                    placeholder="Jane Smith"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <FieldLabel>Phone</FieldLabel>
                  <UnderlineField
                    required
                    name="phone"
                    type="tel"
                    placeholder="+1 234 567 890"
                    autoComplete="tel"
                  />
                </div>
                <div>
                  <FieldLabel>Guest</FieldLabel>
                  <UnderlineField
                    required
                    name="guests"
                    type="number"
                    min={1}
                    max={20}
                    placeholder="Number of guest"
                  />
                </div>
              </div>

              {/* Column 3 — notes + submit */}
              <div className="flex flex-col space-y-6">
                <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-[var(--mootoz-form-muted)] uppercase">
                  Details
                </p>
                <div>
                  <FieldLabel>Email</FieldLabel>
                  <UnderlineField
                    required
                    name="email"
                    type="email"
                    placeholder="sample@gmail.com"
                    autoComplete="email"
                  />
                </div>
                <div className="flex-1">
                  <FieldLabel>Special Request</FieldLabel>
                  <textarea
                    name="request"
                    rows={4}
                    placeholder="Message"
                    className="w-full resize-y border-0 border-b border-dashed border-[var(--mootoz-form-ink)]/35 bg-transparent pb-2 text-sm text-[var(--mootoz-form-ink)] outline-none placeholder:text-[var(--mootoz-form-muted)] focus:border-[var(--mootoz-form-ink)]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-auto w-full rounded-full border border-[var(--mootoz-form-ink)] px-8 py-3.5 text-lg text-[var(--mootoz-form-ink)] transition hover:bg-[var(--mootoz-form-ink)] hover:text-[var(--mootoz-form-paper)] disabled:opacity-60"
                  style={{ fontFamily: '"Fraunces", Georgia, serif' }}
                >
                  {submitting ? 'Booking…' : 'Book a Table'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </BakeryShell>
  )
}

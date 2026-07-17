'use client'

import { cn } from '@/lib/utils'

/** Shared dotted + glow backdrop — readable in dark and light themes */
export function KitchenBackdrop({ className }: { className?: string }) {
  return (
    <>
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-0',
          className,
        )}
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 55% at 50% 0%, color-mix(in srgb, var(--mootoz-accent) 22%, transparent), transparent 65%),
            radial-gradient(circle at 50% 70%, color-mix(in srgb, var(--mootoz-accent) 10%, transparent), transparent 55%)
          `,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(circle, color-mix(in srgb, var(--mootoz-accent) 55%, transparent) 1.15px, transparent 1.15px)',
          backgroundSize: '22px 22px',
        }}
      />
      {/* Extra soft depth wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[color-mix(in_srgb,var(--mootoz-bg)_40%,transparent)]"
      />
    </>
  )
}
